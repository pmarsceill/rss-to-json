import { XMLParser } from 'fast-xml-parser';

type FetchOptions = {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
    mode?: 'cors' | 'no-cors' | 'same-origin';
    cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached';
    redirect?: 'follow' | 'manual' | 'error';
    referrer?: string;
    referrerPolicy?: 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url';
    integrity?: string;
    keepalive?: boolean;
};

export default async (url: RequestInfo | URL, options?: FetchOptions) => {
    if (!/(^http(s?):\/\/[^\s$.?#].[^\s]*)/i.test(url as string)) return null;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 60000);

    const res = await fetch(url, {
        ...options,
        referrer: '',
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Content-Type': 'text/plain',
            'User-Agent': 'Mozilla/5.0 (compatible; FeedrBot/0.1; +http://www.feedr.run)',
        },
        signal: controller.signal,
    });

    clearTimeout(id);

    const data = await res.text();

    const xml = new XMLParser({
        attributeNamePrefix: '',
        textNodeName: '$text',
        ignoreAttributes: false,
    });

    const result = xml.parse(data);

    let channel = result.rss && result.rss.channel ? result.rss.channel : result.feed;
    if (Array.isArray(channel)) channel = channel[0];

    const rss = {
        title: channel.title ?? '',
        description: channel.description ?? '',
        link: channel.link && channel.link.href ? channel.link.href : channel.link,
        image: channel.image ? channel.image.url : channel['itunes:image'] ? channel['itunes:image'].href : '',
        category: channel.category || [],
        items: [],
    };

    let items = channel.item || channel.entry || [];
    if (items && !Array.isArray(items)) items = [items];

    for (let i = 0; i < items.length; i++) {
        const val = items[i];
        const media = {};

        const obj = {
            id: val.guid && val.guid.$text ? val.guid.$text : val.id,
            title: val.title && val.title.$text ? val.title.$text : val.title,
            description: val.summary && val.summary.$text ? val.summary.$text : val.description,
            link: val.link && val.link.href ? val.link.href : val.link,
            author: val.author && val.author.name ? val.author.name : val['dc:creator'],
            published: val.created ? Date.parse(val.created) : val.pubDate ? Date.parse(val.pubDate) : val.published ? Date.parse(val.published) : Date.now(),
            created: val.published ? Date.parse(val.published) : val.updated ? Date.parse(val.updated) : val.pubDate ? Date.parse(val.pubDate) : val.created ? Date.parse(val.created) : Date.now(),
            category: val.category || [],
            content: val.content && val.content.$text ? val.content.$text : val['content:encoded'],
            enclosures: val.enclosure ? (Array.isArray(val.enclosure) ? val.enclosure : [val.enclosure]) : [],
        };

        ['content:encoded', 'podcast:transcript', 'itunes:summary', 'itunes:author', 'itunes:explicit', 'itunes:duration', 'itunes:season', 'itunes:episode', 'itunes:episodeType', 'itunes:image'].forEach((s) => {
            if (val[s]) obj[s.replace(':', '_')] = val[s];
        });

        if (val['media:thumbnail']) {
            Object.assign(media, { thumbnail: val['media:thumbnail'] });
            obj.enclosures.push(val['media:thumbnail']);
        }

        if (val['media:content']) {
            Object.assign(media, { thumbnail: val['media:content'] });
            obj.enclosures.push(val['media:content']);
        }

        if (val['media:group']) {
            if (val['media:group']['media:title']) obj.title = val['media:group']['media:title'];

            if (val['media:group']['media:description']) obj.description = val['media:group']['media:description'];

            if (val['media:group']['media:thumbnail']) obj.enclosures.push(val['media:group']['media:thumbnail'].url);
        }

        Object.assign(obj, { media });

        rss.items.push(obj);
    }

    return rss;
};
