'use strict';

const _ = require('underscore');
const co = require('co');
const fieldUtil = require('field-checker');

const crawler = require('../crawler');

exports.crawl = function* (ctx) {
  let data = fieldUtil.extract(_.extend(this.params, this.request.body), [
    { field: 'resourceId', type: 'string', isRequired: true },
    { field: 'callback', type: 'string', isRequired: true }
  ]);

  // TODO 此处调用 web 服务的接口获取 resource 数据
  let resource = {
    resourceId: data.resourceId,
    url: 'http://www.mm131.com/xinggan/2853_2.html'
  };

  // 异步执行爬取任务
  setTimeout(function() {
    const crawlResource = function* () {
      // 让爬取者爬取资源，包含 trouble-maker 和新的 resource
      let result = yield crawler.work(resource.url);
      // 附带原始资源信息
      result.sourceResource = resource;

      // TODO 将爬取结果提交到 callback 地址
      console.log(result);
    };

    co(crawlResource).catch(function (err) {
      // TODO 打日志
      console.error(err);
    });
  }, 0);

  // 返回给调用方说：我知道要爬取这个东东啦~你先做你的事情，我慢慢爬不用等我，爬到后再给你
  ctx.body = {
    data: {
      success: true
    }
  };
};