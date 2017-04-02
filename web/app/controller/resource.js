'use strict';

const _ = require('underscore');
const fieldUtil = require('field-checker');

exports.get = function* (ctx) {
  let resourceId = ctx.params.resourceId;
  let resource = yield ctx.service.resource.get(resourceId);
  ctx.body = {
    data: {
      resource: resource
    }
  };
};

exports.create = function* (ctx) {
  let data = fieldUtil.extract(ctx.request.body, [
    { field: 'url', type: 'string', isRequired: true },
    { field: 'tag', type: 'string' },
    { field: 'weight', type: 'number' },
  ]);

  let resource = yield ctx.service.resource.create(data);

  ctx.body = {
    data: {
      resource: resource
    }
  };
};

exports.update = function* (ctx) {
  let data = fieldUtil.extract(_.extend(ctx.params, ctx.request.body), [
    { field: 'resourceId', type: 'string', isRequired: true },
    { field: 'tag', type: 'string' },
    { field: 'weight', type: 'number' },
    { field: 'lastCrawlResult', type: 'string' },
    { field: 'lastCrawlAt', type: 'number' },
  ]);

  let success = yield this.service.resource.update(data);

  ctx.body = {
    data: {
      success: success
    }
  };
};

exports.search = function* (ctx) {
  let data = fieldUtil.extract(ctx.query, [
    {field: 'offset', type: 'number', isRequired: false, defaultValue: 0},
    {field: 'limit', type: 'number', isRequired: false, defaultValue: 20},
    {
      field: 'order',
      type: 'string',
      isRequired: false,
      defaultValue: 'desc',
      checker: [{
        regExp: /^(desc|asc)$/,
        message: '排序方式仅支持 desc 或者 asc'
      }]
    },
    {
      field: 'orderBy',
      type: 'string',
      isRequired: false,
      defaultValue: 'createAt',
      checker: [{
        regExp: /^(createAt|updateAt)$/,
        message: '排序字段仅支持 createAt、updateAt'
      }]
    },
  ]);

  let resources = yield ctx.service.resource.search(data, data.offset, data.limit, 
    data.orderBy, data.order);

  ctx.body = {
    data: {
      resources: resources
    }
  };
};