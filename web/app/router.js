'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/1/resource/:resourceId', 'resource.get');
};
