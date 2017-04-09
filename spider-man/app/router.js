'use strict';

module.exports = app => {
  app.post('/1/resource/:resourceId/crawl', 'resource.crawl');
};
