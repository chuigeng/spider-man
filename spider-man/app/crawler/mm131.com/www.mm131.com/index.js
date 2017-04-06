'use strcit';

const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const request = require('co-request');
const URL = require('url-parse');

// 首页
exports.work = function* (url) {
  // 下载页面
  let response = yield request({
    uri: url,
    encoding: null,
    gzip: true,
  });
  let html = iconv.decode(response.body, 'GB2312');

  // 解析页面元素  
  let $ = cheerio.load(html);

  // 提取需要的信息
  let categoryUrls = [];
  $('div[class=nav] ul li').each(function(i, elem) {
    let categoryUrl = $(this).children('a').attr('href');
    let url = new URL(categoryUrl);
    if (/^\/(\w)+\/$/.test(url.pathname)) {
      categoryUrls.push(categoryUrl);
    }
  });

  return {
    resourceUrls: categoryUrls,
    troubleMakers: []
  };
};