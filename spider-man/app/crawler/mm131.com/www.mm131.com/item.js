'use strcit';

const URL = require('url-parse');

// 详情页
exports.work = function* (url, $) {
  let troubleMaker = {};
  // 解析资源 ID
  let matches = url.match(/\/(\d+)_?\d*\.html/);
  troubleMaker.id = matches[1];
  troubleMaker.title = $('div[class=content] h5').text();
  troubleMaker.keywords = $('meta[name=keywords]').attr('content');
  troubleMaker.description = $('meta[name=description]').attr('content');
  troubleMaker.image = $('div[class=content-pic] img').attr('src');
  troubleMaker.category = $('div[class=place] a').eq(1).text();

  // 抹除信息（保护版权人人有责，这里只是示范大家不要这么做啦~
  let clearUpFields = ['title', 'keywords', 'description'];
  for (clearUpField of clearUpFields) {
    troubleMaker[clearUpField] = troubleMaker[clearUpField] ? 
      troubleMaker[clearUpField].toLowerCase()
    .replace('www.mm131.com', '').replace('mm131.com', '').replace('mm131', '').trim() : '';
  }

  let nextPageUrl;
  $('div[class=content-page] a').each(function(i, elem) {
    let pageUrl = $(this).attr('href');
    let pageText = $(this).text();
    if (pageText === '下一页') {
      nextPageUrl = pageUrl;
    }
  });

  return {
    resourceUrls: nextPageUrl ? [nextPageUrl] : [],
    troubleMakers: [troubleMaker]
  };
};