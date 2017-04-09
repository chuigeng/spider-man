'use strcit';

const _ = require('underscore');
const URL = require('url-parse');

// 分类页
exports.work = function* (url, $) {
  let resources = [];
  let troubleMakers = [];

  // 详情页
  $('div[class=main] dl[class="list-left public-box"] dd').each(function(i, elem) {
    let itemUrl = $(this).children('a').attr('href');
    let url = new URL(itemUrl);
    if (/^\/\w+\/\d+\.html$/.test(url.pathname)) {
      resources.push({
        url: itemUrl
      });
    }
  });

  // 下一页
  $('div[class=main] dd[class=page] a').each(function(i, elem) {
    let pageUrl = $(this).attr('href');
    let pageText = $(this).text();
    if (pageText === '下一页') {
      resources.push({
        url: pageUrl
      });
    }
  });

  // TODO 统一把相对路径转换为绝对路径
  return {
    resources: resources,
    troubleMakers: troubleMakers
  };
};