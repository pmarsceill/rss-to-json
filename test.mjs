// import { encrypt } from './src/index';

import pkg from './dist/index.js';
const { parse } = pkg;

(async () => {
    // var rss = await parse('https://rss.app/feeds/2H9AstQcAnoJ5RnJ.xml');
    var rss = await parse('https://www.geekwire.com/feed');
    // var rss = await parse('https://feeds.washingtonpost.com/rss/business/technology?itid=lk_inline_manual_3');
    // var rss = await parse('https://newsletterss.com/rss/mauricio');
    // var rss = await parse('https://feeds.feedburner.com/ruanyifeng');
    // var rss = await parse('https://medium.com/feed/@extropy-io');
    // var rss = await parse('https://blog.ethereum.org/feed.xml');

    console.log('rss', JSON.stringify(rss, null, 3));
})();

// Parse('https://blog.ethereum.org/feed.xml').then(rss => {
//     console.log(JSON.stringify(rss, null, 3));
// })
