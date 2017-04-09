'use strcit';

const URL = require('url-parse');

// 首页
exports.work = function* (url, $) {
  let resources = [];
  let troubleMakers = [];

  // 提取需要的信息
  $('div[class=nav] ul li').each(function(i, elem) {
    let categoryUrl = $(this).children('a').attr('href');
    let url = new URL(categoryUrl);
    if (/^\/(\w)+\/$/.test(url.pathname)) {
      resources.push({
        url: categoryUrl
      });
    }
  });

  return {
    resources: resources,
    troubleMakers: troubleMakers
  };
};