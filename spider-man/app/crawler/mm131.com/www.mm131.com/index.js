'use strcit';

const URL = require('url-parse');

// 首页
exports.work = function* ($) {
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