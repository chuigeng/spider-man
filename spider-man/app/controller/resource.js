'use strict';

const _ = require('underscore');
const fieldUtil = require('field-checker');

const crawler = require('../crawler');

exports.crawl = function* (ctx) {
  let data = fieldUtil.extract(this.params, [
    { field: 'resourceId', type: 'string', isRequired: true },
  ]);

  // TODO 返回给调用方说：我知道要爬取这个东东啦~你先做你的事情，我慢慢爬不用等我，爬到后再给你

  // TODO 此处调用 web 服务的接口获取 resource 数据
  let resource = {
    url: 'http://www'
  };

  // 让爬取者爬取资源，包含 trouble-maker 和新的 resource
  let result = yield crawler.work(resource.url);
  
  // TODO 提交给 police-station
};