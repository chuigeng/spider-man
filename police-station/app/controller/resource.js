'use strict';

const _ = require('underscore');
const fieldUtil = require('field-checker');

exports.receive = function* (ctx) {
  let data = fieldUtil.extract(ctx.request.body, [
    // 通过哪个资源抓取
    { field: 'resource', type: 'json', isRequired: true },
    // 抓取结果状态码
    { field: 'crawlStatus', type: 'string', isRequired: true },
    // 抓取到的 troubleMaker
    { field: 'troubleMakers', type: 'json', isRequired: false },
    // 抓取到的 resource
    { field: 'resources', type: 'json', isRequired: false },
  ]);

  // TODO 通知 web 服务资源的抓取情况
  

  if (!_.isEmpty(data.troubleMakers)) {
    // TODO 入库
  }

  if (!_.isEmpty(data.resources)) {
    // TODO 入库
  }
};