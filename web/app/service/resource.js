'use strict';

const md5 = require('md5');
const URL = require('url-parse');
const uuid = require('uuid/v1');

const CRAWL_STATUS = require('../constant').CRAWL_STATUS;

module.exports = app => {
  class Resource extends app.Service {

    constructor(ctx) {
      super(ctx);
      this.model = this.ctx.service.model.resource;
    }

    * get(resourceId) {
      return yield this.model.get(resourceId);
    }

    * create(resource) {
      resource.resourceId = uuid();
      resource.urlMd5 = md5(resource.url);
      let url = new URL(resource.url);
      let host = url.hostname;
      let hostFragments = host.split('.');
      resource.domain = hostFragments[hostFragments.length-2] + '.' + hostFragments[hostFragments.length-1];

      // 判断是否已经存在
      let resources = yield this.service.resource.search({
        urlMd5: resource.urlMd5,
        domain: resource.domain
      });
      if (resources && resources.length > 0) {
        throw new Error('资源已经在库中');
      }
      return yield this.model.create(resource);
    }

    * update(resource) {
      return yield this.model.update(resource);
    }

    * search(filter, offset, limit, orderBy, order) {
      return yield this.model.search(filter, offset, limit, orderBy, order);
    }

    // 获取高优先级的资源，现在暂时按先进先出的方式获取资源，后续可以制定出队策略
    * getPriorityResources(limit) {
      return yield this.model.search({
        crawlStatus: CRAWL_STATUS.WAIT
      }, 0, limit, 'createAt', 'asc');
    }

    * goToCrawl(resources) {
      for (let resource of resources) {
        resource.crawlStatus = CRAWL_STATUS.GOTO;
        resource.crawlAt = Date.now();
        yield this.model.update(resource);
      }
      return true;
    }

    * crawlSuccess(resource) {
      resource.crawlStatus = CRAWL_STATUS.SUCCESS;
      yield this.model.update(resource);
      return yield this.model.get(resource.resourceId);
    }

    * crawlFail(resource) {
      resource.crawlFailCount += 1;
      // 失败次数过多，则移走资源不再爬取
      if (resource.crawlFailCount >= resource.maxCrawlFailCount) {
        resource.crawlStatus = CRAWL_STATUS.MOVED;
      } else {
        resource.crawlStatus = CRAWL_STATUS.FAILED;
      }
      yield this.model.update(resource);
      return yield this.model.get(resource.resourceId);
    }
  }
  return Resource;
};