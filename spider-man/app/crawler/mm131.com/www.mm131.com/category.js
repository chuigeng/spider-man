'use strcit';

const _ = require('underscore');
const URL = require('url-parse');

// 分类页
exports.work = function* ($) {
  let itemUrls = [];
  $('div[class=main] dl[class="list-left public-box"] dd').each(function(i, elem) {
    let itemUrl = $(this).children('a').attr('href');
    let url = new URL(itemUrl);
    if (/^\/\w+\/\d+\.html$/.test(url.pathname)) {
      itemUrls.push(itemUrl);
    }
  });

  let nextPageUrl;
  $('div[class=main] dd[class=page] a').each(function(i, elem) {
    let pageUrl = $(this).attr('href');
    let pageText = $(this).text();
    if (pageText === '下一页') {
      nextPageUrl = pageUrl;
    }
  });

  // TODO 统一把相对路径转换为绝对路径
  return {
    resourceUrls: _.extend(itemUrls, [nextPageUrl]),
    troubleMakers: []
  };
};