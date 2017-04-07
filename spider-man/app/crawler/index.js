'use strict';

const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const request = require('co-request');
const URL = require('url-parse');

/**
 * [routers url 规则和 crawler 名称映射]
 * pattern - url 正则匹配规则
 * crawler - 爬取者
 */
let routers = [
  { pattern: /^\/?$/, crawler: 'index' },
  { pattern: /^\/\w+\/?$/, crawler: 'category' },
];


// 提取 url 中的内容
// 根据 url 的不同，分配给不同的 crawler
// 先根据 url 的一级域名找到 crawler 的爷爷级目录，然后根据 url 的 host 找到 crawler 的父级目录
// 最后根据 router 进行规则匹配，交给第一个匹配到的处理器
exports.work = function* (url) {

  // 根据 URL 分配给不同的爬取者
  let urlObj = new URL(url);
  let hostName = urlObj.hostname;
  let hostFragments = hostName.split('.');
  let domain = hostFragments[hostFragments.length-2] + '.' + hostFragments[hostFragments.length-1];
  let path = urlObj.pathname;

  let crawler;
  // TODO 后续可以抽出一份默认的 config，并允许子目录的 config 覆盖父目录的 config
  let config;
  for (let router of routers) {
    if (router.pattern.test(path)) {
      crawler = require('./' + domain + '/' + hostName + '/' + router.crawler);
      config = require('./' + domain + '/config');
      break;
    }
  }
  
  if (!crawler) {
    throw new Error('未定义 url[' + url + ']对应的 crawler');
  }

  // 下载页面
  let response = yield request({
    uri: url,
    encoding: null,
    gzip: config.response.gzip,
  });
  let html = iconv.decode(response.body, config.response.html.charset);

  // 解析页面 DOM 元素，类似 JQuery
  let $ = cheerio.load(html);

  return yield crawler.work($);
};