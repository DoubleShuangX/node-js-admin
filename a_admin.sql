# Host: 127.0.0.1  (Version 5.0.87-community-nt)
# Date: 2019-06-25 18:36:18
# Generator: MySQL-Front 6.1  (Build 1.26)


#
# Structure for table "article"
#

DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL auto_increment,
  `title` varchar(555) default NULL COMMENT '标题',
  `author` varchar(255) default NULL COMMENT '作者',
  `status` varchar(255) default NULL COMMENT '状态:1表示发布，0表示草稿',
  `classType` varchar(255) default NULL COMMENT '类型:0普通文章，1缩略图文章，2广告文章',
  `source` varchar(255) default NULL COMMENT '来源',
  `keywords` varchar(555) default NULL COMMENT '关键字',
  `description` varchar(555) default NULL COMMENT '描述',
  `content` text COMMENT '内容',
  `img_path` varchar(555) default NULL COMMENT '图片相对路径地址',
  `img` varchar(555) default NULL COMMENT '缩略图或banner图',
  `readnum` varchar(555) default NULL COMMENT '阅读数',
  `tag` varchar(255) default NULL COMMENT '标签',
  `time` timestamp NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP COMMENT '发布时间',
  `pid` varchar(255) default NULL COMMENT '记录 当前文章 属于什么栏目下面的',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='文章表格';

#
# Data for table "article"
#

/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,'react技术1','','1','1','','','','<p>react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1react技术1</p>','public\\uploads\\1561363072421-2039168-Chrysanthemum.jpg','uploads/1561363072421-2039168-Chrysanthemum.jpg',NULL,'','2019-06-24 15:57:52','4'),(2,'react技术2','','1','1','','','','<p>react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2react技术2</p>','public\\uploads\\1561363098118-1356475-Koala.jpg','uploads/1561363098118-1356475-Koala.jpg',NULL,'','2019-06-24 15:58:18','4'),(3,'react技术3','','1','1','','','','<p>react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3react技术3</p>','public\\uploads\\1561363125834-2662734-Penguins.jpg','uploads/1561363125834-2662734-Penguins.jpg',NULL,'','2019-06-24 15:58:45','4'),(4,'react技术4','','1','1','','','','<p>react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4react技术4</p>','public\\uploads\\1561363159235-7683801-Tulips.jpg','uploads/1561363159235-7683801-Tulips.jpg',NULL,'','2019-06-24 15:59:19','4'),(5,'react 技术精髓11','','1','1','','','','<p>11111111111111111</p>','public\\uploads\\1561364939678-2709893-Lighthouse.jpg','uploads/1561364939678-2709893-Lighthouse.jpg',NULL,'','2019-06-24 16:28:59','4'),(6,'技术分享文章1','','1','0','','','','<p>技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享<img src=\"http://127.0.0.1:8081/img/1143089321935507456.jpg\" title=\"\" alt=\"1410000.jpg\" width=\"193\" height=\"132\" style=\"width: 193px; height: 132px;\"/>文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章</p>','','',NULL,'','2019-06-24 17:31:55','5'),(7,'技术分享文章2','','1','0','','','','<p>技术分享文章技术<img src=\"http://img.baidu.com/hi/jx2/j_0002.gif\"/>分享<img src=\"http://img.baidu.com/hi/jx2/j_0002.gif\"/>文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享<img src=\"http://127.0.0.1:8081/img/1143089090548338688.jpg\" title=\"\" alt=\"Desert.jpg\" width=\"1\" height=\"1\" style=\"width: 1px; height: 1px;\"/>文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章技术分享文章</p>','','',NULL,'','2019-06-24 17:31:07','5'),(8,'html1','','1','0','','','','<p>11</p>','','',NULL,'','2019-06-24 18:38:39','8'),(9,'csss','','1','0','','','','<p>2324</p>','','',NULL,'','2019-06-24 18:43:53','9'),(10,'js文章1','','1','0','11111','','','<p>jsjsjsjsj</p>','','',NULL,'','2019-06-25 09:28:02','10'),(11,'文章111','','1','2','','','','<p>123123123</p>','public\\uploads\\1561438378692-55615-2095336048.jpg','uploads/1561438378692-55615-2095336048.jpg',NULL,'','2019-06-25 12:52:58','4'),(12,'html5技术','','1','2','','','','<p>12313</p>','public\\uploads\\1561438406005-5547839-1072268829.jpg','uploads/1561438406005-5547839-1072268829.jpg',NULL,'','2019-06-25 12:53:26','8'),(13,'前端技术分享','','1','2','','','','<p>23423</p>','public\\uploads\\1561438443140-9026553-938356729.jpg','uploads/1561438443140-9026553-938356729.jpg',NULL,'','2019-06-25 12:54:03','6');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;

#
# Structure for table "friendly_link"
#

DROP TABLE IF EXISTS `friendly_link`;
CREATE TABLE `friendly_link` (
  `id` int(11) NOT NULL auto_increment,
  `linktitle` varchar(255) default NULL COMMENT '链接标题',
  `linkurl` varchar(255) default NULL COMMENT '链接地址',
  `sort` varchar(11) default '0' COMMENT '展现顺序',
  `status` varchar(255) default '1' COMMENT '状态：1表示使用，0表示禁用',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COMMENT='友情链接';

#
# Data for table "friendly_link"
#


#
# Structure for table "guestbook"
#

DROP TABLE IF EXISTS `guestbook`;
CREATE TABLE `guestbook` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(255) default NULL COMMENT '留言姓名',
  `contact` varchar(255) default NULL COMMENT '联系方式',
  `content` varchar(555) default NULL COMMENT '留言内容',
  `ip` varchar(255) default NULL COMMENT 'ip地址',
  `time` timestamp NULL default CURRENT_TIMESTAMP COMMENT '留言时间',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='留言表';

#
# Data for table "guestbook"
#


#
# Structure for table "nav"
#

DROP TABLE IF EXISTS `nav`;
CREATE TABLE `nav` (
  `id` int(11) NOT NULL auto_increment,
  `navName` varchar(255) default NULL COMMENT '导航名称',
  `navTitle` varchar(555) default NULL COMMENT '导航seo标题',
  `navKeywords` varchar(855) default NULL COMMENT '导航seo关键字',
  `navDescription` varchar(1000) default NULL COMMENT '导航Seo描述',
  `navStatus` varchar(255) NOT NULL default '1' COMMENT '导航状态：1表示显示，0表示隐藏',
  `navSort` varchar(255) NOT NULL default '0' COMMENT '导航排序',
  `pid` varchar(255) default NULL COMMENT '记录父导航的id号',
  `img` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='导航表';

#
# Data for table "nav"
#

/*!40000 ALTER TABLE `nav` DISABLE KEYS */;
INSERT INTO `nav` VALUES (4,'React技术','','','','1','','0',''),(5,'React分享','','','','1','','0',''),(6,'前端技术','','','','1','','0',''),(7,'关于','','','','1','','0',''),(8,'html','','','','1','','6',''),(9,'css','','','','1','','6',''),(10,'js','','','','1','','6','');
/*!40000 ALTER TABLE `nav` ENABLE KEYS */;

#
# Structure for table "users"
#

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `Id` int(11) NOT NULL auto_increment,
  `name` varchar(555) default NULL COMMENT '用户名',
  `pwd` varchar(555) default NULL COMMENT '密码',
  `icon` varchar(555) default NULL COMMENT '用户图像',
  `email` varchar(255) default NULL COMMENT '邮箱',
  `phone` varchar(555) default NULL COMMENT '电话号码',
  `time` timestamp NULL default CURRENT_TIMESTAMP,
  PRIMARY KEY  (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='用户表';

#
# Data for table "users"
#

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'2222','12345',NULL,NULL,NULL,'2019-06-12 10:59:16'),(3,'2222','12345',NULL,NULL,NULL,'2019-06-12 12:07:42'),(4,'6666','6666',NULL,NULL,NULL,'2019-06-12 12:07:46'),(5,'2222','12345',NULL,NULL,NULL,'2019-06-12 12:07:51');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

#
# Structure for table "website"
#

DROP TABLE IF EXISTS `website`;
CREATE TABLE `website` (
  `id` int(11) NOT NULL auto_increment,
  `title` varchar(255) default NULL COMMENT '网站标题',
  `keywords` varchar(555) default NULL COMMENT '网站关键字',
  `description` varchar(255) default NULL COMMENT '网站描述',
  `logo_pc` varchar(255) default NULL COMMENT 'PC中的logo图片',
  `logo_mobile` varchar(255) default NULL COMMENT '移动端logo图片',
  `email` varchar(255) default NULL COMMENT '邮箱',
  `phone` varchar(255) default NULL COMMENT '电话',
  `address` varchar(255) default NULL COMMENT '地址',
  `qq` varchar(255) default NULL COMMENT '客服QQ号',
  `wechat` varchar(255) default NULL COMMENT '微信',
  `icps` varchar(255) default NULL COMMENT '备案号',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='网站基本信息';

#
# Data for table "website"
#

/*!40000 ALTER TABLE `website` DISABLE KEYS */;
INSERT INTO `website` VALUES (2,'我的网站','我的网站','我的网站','public\\logo\\1561440654838-182565-a.svg','public\\logo\\1561440654838-3656216-a.svg','xxxxx@qqq.com','110','上海','110','110','110');
/*!40000 ALTER TABLE `website` ENABLE KEYS */;
