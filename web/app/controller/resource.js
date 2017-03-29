'use strict';

exports.get = function* (ctx) {
  let resourceId = ctx.params.resourceId;
  let resource = yield ctx.service.resource.get(resourceId);
  console.log(resource);
  ctx.body = {
    data: {
      resource: resource
    }
  };
};