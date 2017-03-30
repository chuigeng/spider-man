'use strict';

module.exports = app => {
  app.get('/1/resource/search', 'resource.search');
  app.get('/1/resource/:resourceId', 'resource.get');
  app.post('/1/resource', 'resource.create');
  app.put('/1/resource/:resourceId', 'resource.update');
};
