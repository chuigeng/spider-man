SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sm_trouble_maker
-- ----------------------------
DROP TABLE IF EXISTS `sm_trouble_maker`;
CREATE TABLE `sm_trouble_maker` (
  `troubleMakerId` varchar(32) NOT NULL COMMENT '主键 ID',
  `url` varchar(1024) NOT NULL COMMENT '爬取的 URL',
  `tag` varchar(32) NOT NULL COMMENT '标签',
  `data` longtext NOT NULL COMMENT '数据',
  `dealAt` bigint(13) NOT NULL COMMENT '处理数据的时间',
  `createAt` bigint(13) NOT NULL COMMENT '创建时间',
  `updateAt` bigint(13) NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`troubleMakerId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
