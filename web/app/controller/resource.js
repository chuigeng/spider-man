/**
 * 资源相关处理
 * 资源有各种处理状态
 * WAIT_CRAWL - 等待抓取 / GOTO_CRAWL - 准备抓取 / CRAWL_SUCCESS - 完成 / CRAWL_FAILED - 失败 / CRAWL_MOVED - 丢弃
 * 资源的初始状态为 WAIT_CRAWL，当外部服务将某个资源提走准备抓取时，资源状态变成 GOTO_CRAWL
 * 抓取结果会通过 feedback 反馈回来，有 CRAWL_SUCCESS - 成功，CRAWL_FAILED - 失败，失败的任务有机会重新尝试抓取
 * 如果失败多次，则变为 CRAWL_MOVED 的状态，该资源将永不抓取
 *
 * 如果资源长期处于 GOTO_CRAWL 的状态，说明抓取环节某个地方出现问题，将会把资源状态重置为 WAIT_CRAWL，重新抓取
 * CRAWL_FAILED 的资源抓取的优先级低于 WAIT_CRAWL 的资源，CRAWL_FAILED 的资源的重新抓取，是通过将状态变更为 WAIT_CRAWL 来进行的
 * 
 */

const _ = require('underscore');
const fieldUtil = require('field-checker');

const CRAWL_STATUS = require('../constant').CRAWL_STATUS;

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

// 获取等待抓取的资源
exports.takeAway = function* (ctx) {
  let data = fieldUtil.extract(this.query, [
    { field: 'limit', type: 'number', defaultValue: 1 }
  ]);

  // 获取优先级最高的前 n 个资源
  let resources = yield ctx.service.resource.getPriorityResources(data.limit);
  // 将资源的状态改为准备抓取
  let resources = yield ctx.service.resource.goToCrawl(resources);
  // 返回资源
  ctx.body = {
    data: {
      resources: resources
    }
  };
};

// 接收资源的处理情况
exports.feedback = function* (ctx) {
  let data = fieldUtil.extract(_.extract(this.params, this.request.body), [
    { field: 'resourceId', type: 'string', isRequired: true },
    { field: 'crawlStatus', type: 'string', isRequired: true }
  ]);

  if (Object.keys(CRAWL_STATUS).indexOf(data.crawlStatus) === -1) {
    throw new Error('未定义的抓取状态');
  }

  let resource = yield ctx.service.resource.get(data.resourceId);
  if (!resource) {
    throw new Error('资源不存在');
  }

  if (data.crawlStatus === CRAWL_STATUS.SUCCESS) {
    resource = yield ctx.service.resource.crawlSuccess(resource);
  }
  if (data.crawlStatus === CRAWL_STATUS.FAILED) {
    resource = yield ctx.service.resource.crawlFail(resource);
  }

  ctx.body = {
    data: {
      resource: resource
    }
  };
};