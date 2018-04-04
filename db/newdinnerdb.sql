/*
 Navicat MySQL Data Transfer

 Source Server         : just a connection
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost:3306
 Source Schema         : newdinnerdb

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : 65001

 Date: 02/04/2018 18:52:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_table
-- ----------------------------
DROP TABLE IF EXISTS `admin_table`;
CREATE TABLE `admin_table`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_table
-- ----------------------------
INSERT INTO `admin_table` VALUES (1, 'admin', '38eed2c9b4de012b1eabb2c343bb5499');

-- ----------------------------
-- Table structure for dish_table
-- ----------------------------
DROP TABLE IF EXISTS `dish_table`;
CREATE TABLE `dish_table`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dish_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `meterial` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `src` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `like_num` int(11) NULL DEFAULT NULL,
  `post_time` timestamp(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `update_time` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dish_table
-- ----------------------------
INSERT INTO `dish_table` VALUES (1, '辣子鸡', '辣椒、鸡块', 'images/1.jpg', 0, '2018-03-08 09:33:43', NULL);
INSERT INTO `dish_table` VALUES (2, '腰果扁豆', '腰果、扁豆', 'images/img.jpg', 0, '2018-03-07 21:02:34', NULL);
INSERT INTO `dish_table` VALUES (3, '酱茄子', '茄子', 'images/user.png', 0, '2018-03-07 21:01:06', NULL);
INSERT INTO `dish_table` VALUES (4, '腊肠炒扁豆', '腊肠、扁豆', 'images/4.jpg', 0, NULL, NULL);

-- ----------------------------
-- Table structure for menu_table
-- ----------------------------
DROP TABLE IF EXISTS `menu_table`;
CREATE TABLE `menu_table`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `menu_text` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `menu_class` int(255) NOT NULL,
  `menu_url` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `father` int(255) NULL DEFAULT NULL,
  `menu_icon` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu_table
-- ----------------------------
INSERT INTO `menu_table` VALUES (1, '主控台', 0, 'index', 0, NULL);
INSERT INTO `menu_table` VALUES (2, '用户管理', 0, 'index', 0, NULL);
INSERT INTO `menu_table` VALUES (3, '组织机构', 0, 'index', 2, NULL);
INSERT INTO `menu_table` VALUES (4, '菜品管理', 1, 'menu', 9, NULL);
INSERT INTO `menu_table` VALUES (5, '周菜单', 1, 'menu', 9, NULL);
INSERT INTO `menu_table` VALUES (6, '计量单位', 1, 'menu', 9, NULL);
INSERT INTO `menu_table` VALUES (7, '预约参数', 1, 'menu', 9, NULL);
INSERT INTO `menu_table` VALUES (8, '订单列表', 2, 'order', 0, NULL);
INSERT INTO `menu_table` VALUES (9, '后厨主控台', 1, 'cook', 0, NULL);
INSERT INTO `menu_table` VALUES (10, '测评及调查', 3, 'test', 0, NULL);
INSERT INTO `menu_table` VALUES (11, '留言', 3, 'msg', 10, NULL);
INSERT INTO `menu_table` VALUES (12, '调查问卷', 3, 'testlist', 10, NULL);
INSERT INTO `menu_table` VALUES (13, '文章推送', 1, 'artical', 0, NULL);
INSERT INTO `menu_table` VALUES (14, '用户信息', 0, 'user', 2, NULL);

-- ----------------------------
-- Table structure for user_table
-- ----------------------------
DROP TABLE IF EXISTS `user_table`;
CREATE TABLE `user_table`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `job_number` int(255) NULL DEFAULT NULL,
  `porject` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `department` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `head-portrait` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `power` int(255) NULL DEFAULT NULL,
  `sex` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_table
-- ----------------------------
INSERT INTO `user_table` VALUES (1, '张大', 2465, '廉江', '施工管理部', 'female.png', 3, 'female');
INSERT INTO `user_table` VALUES (2, '张二', 7438, '廉江', '施工管理部', 'male.png', 3, 'male');
INSERT INTO `user_table` VALUES (3, '张三', 2676, '廉江', '综合管理部', 'male.png', 0, 'male');
INSERT INTO `user_table` VALUES (4, '张二', 320, '三门', 'HSE部', 'male.png', 3, 'male');
INSERT INTO `user_table` VALUES (5, '张三', 3863, '海阳', '商务合同部', 'female.png', 3, 'female');
INSERT INTO `user_table` VALUES (6, '张二', 6331, '陆丰', '施工管理部', 'female.png', 3, 'female');
INSERT INTO `user_table` VALUES (7, '张三', 2689, '白龙', '商务合同部', 'female.png', 3, 'female');
INSERT INTO `user_table` VALUES (8, '张大', 6558, '三门', '信息文档部', 'female.png', 3, 'female');
INSERT INTO `user_table` VALUES (9, '张二', 5363, '示范', '综合管理部', 'female.png', 0, 'female');
INSERT INTO `user_table` VALUES (10, '张三', 9279, '海阳', '商务合同部', 'male.png', 3, 'male');
INSERT INTO `user_table` VALUES (11, '张二', 433, '三门', '现场设计部', 'female.png', 3, 'female');
INSERT INTO `user_table` VALUES (12, '张三', 5068, '三门', '施工管理部', 'female.png', 3, 'female');
INSERT INTO `user_table` VALUES (13, '张二', 164, '廉江', '综合管理部', 'male.png', 0, 'male');
INSERT INTO `user_table` VALUES (14, '张三', 896, '海阳', '现场设计部', 'male.png', 3, 'male');
INSERT INTO `user_table` VALUES (15, '张大', 3798, '廉江', 'QAQC部', 'male.png', 3, 'male');

SET FOREIGN_KEY_CHECKS = 1;
