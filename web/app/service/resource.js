'use strict';

const md5 = require('md5');
var URL = require('url-parse');
const uuid = require('uuid/v1');

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
  }
  return Resource;
};