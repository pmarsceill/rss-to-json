(()=>{"use strict";var e={306:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=a(861);t.default=async(e,t)=>{var a,i;if(!/(^http(s?):\/\/[^\s$.?#].[^\s]*)/i.test(e))return null;const s=await fetch(e,t),n=await s.text(),u=new r.XMLParser({attributeNamePrefix:"",textNodeName:"$text",ignoreAttributes:!1}).parse(n);let o=u.rss&&u.rss.channel?u.rss.channel:u.feed;Array.isArray(o)&&(o=o[0]);const d={title:null!==(a=o.title)&&void 0!==a?a:"",description:null!==(i=o.description)&&void 0!==i?i:"",link:o.link&&o.link.href?o.link.href:o.link,image:o.image?o.image.url:o["itunes:image"]?o["itunes:image"].href:"",category:o.category||[],items:[]};let l=o.item||o.entry||[];l&&!Array.isArray(l)&&(l=[l]);for(let e=0;e<l.length;e++){const t=l[e],a={},r={id:t.guid&&t.guid.$text?t.guid.$text:t.id,title:t.title&&t.title.$text?t.title.$text:t.title,description:t.summary&&t.summary.$text?t.summary.$text:t.description,link:t.link&&t.link.href?t.link.href:t.link,author:t.author&&t.author.name?t.author.name:t["dc:creator"],published:t.created?Date.parse(t.created):t.pubDate?Date.parse(t.pubDate):t.published?Date.parse(t.published):Date.now(),created:t.published?Date.parse(t.published):t.updated?Date.parse(t.updated):t.pubDate?Date.parse(t.pubDate):t.created?Date.parse(t.created):Date.now(),category:t.category||[],content:t.content&&t.content.$text?t.content.$text:t["content:encoded"],enclosures:t.enclosure?Array.isArray(t.enclosure)?t.enclosure:[t.enclosure]:[]};["content:encoded","podcast:transcript","itunes:summary","itunes:author","itunes:explicit","itunes:duration","itunes:season","itunes:episode","itunes:episodeType","itunes:image"].forEach((e=>{t[e]&&(r[e.replace(":","_")]=t[e])})),t["media:thumbnail"]&&(Object.assign(a,{thumbnail:t["media:thumbnail"]}),r.enclosures.push(t["media:thumbnail"])),t["media:content"]&&(Object.assign(a,{thumbnail:t["media:content"]}),r.enclosures.push(t["media:content"])),t["media:group"]&&(t["media:group"]["media:title"]&&(r.title=t["media:group"]["media:title"]),t["media:group"]["media:description"]&&(r.description=t["media:group"]["media:description"]),t["media:group"]["media:thumbnail"]&&r.enclosures.push(t["media:group"]["media:thumbnail"].url)),Object.assign(r,{media:a}),d.items.push(r)}return d}},861:e=>{e.exports=require("fast-xml-parser")}},t={};function a(r){var i=t[r];if(void 0!==i)return i.exports;var s=t[r]={exports:{}};return e[r](s,s.exports,a),s.exports}var r={};(()=>{var e=r;Object.defineProperty(e,"__esModule",{value:!0}),e.Parse=e.parse=void 0;const t=a(306);e.parse=t.default;const i=t.default;e.Parse=i,e.default=t.default})();var i=exports;for(var s in r)i[s]=r[s];r.__esModule&&Object.defineProperty(i,"__esModule",{value:!0})})();