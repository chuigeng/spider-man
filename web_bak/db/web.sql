SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for web_url
-- ----------------------------
DROP TABLE IF EXISTS `web_url`;
CREATE TABLE `web_url` (
  `urlId` varchar(32) NOT NULL COMMENT '主键 ID',
  `domain` varchar(32) NOT NULL COMMENT '一级域名',
  `url` varchar(1024) NOT NULL COMMENT '地址',
  `urlMd5` varchar(32) NOT NULL COMMENT '地址 MD5',
  `tag` varchar(32) NOT NULL COMMENT '标签，用于区分 URL 的类型',
  `weight` smallint(4) NOT NULL COMMENT '权重，值最大权重越高',
  `lastCrawlResult` varchar(16) NOT NULL COMMENT '上一次爬取结果，取值：WAIT - 等待爬取，SUCCESS - 爬取成功，FAILED - 爬取失败',
  `lastCrawlAt` bigint(13) NOT NULL COMMENT '上一次爬取时间',
  `createAt` bigint(13) NOT NULL COMMENT '创建时间',
  `updateAt` bigint(13) NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`urlId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
