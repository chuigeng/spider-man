'use strict';

module.exports = app => {
  app.post('/1/resource/:resource/crawl', 'resource.crawl');
};
