'use strcit';

const iconv = require('iconv-lite');
const request = require('co-request')

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
  
  // 提取需要的信息
  
  // 返回
};