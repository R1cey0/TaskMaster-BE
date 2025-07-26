const express = require('express');
const router = express.Router();
const userController = require('../controllers/auth.controller');

// 定义用户路由
router.get('/', userController.getAllUsers); // 获取所有用户

module.exports = router;