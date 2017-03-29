'use strict';

module.exports = app => {
  class Resource extends app.Service {

    constructor(ctx) {
      super(ctx);
      this.model = this.ctx.service.model.resource;
    }

    * get(resourceId) {
      return yield this.model.get(resourceId);
    }
  }
  return Resource;
};