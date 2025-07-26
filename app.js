  const express = require('express');
  const dotenv = require('dotenv');
  const cors = require('cors');
  const bodyParser = require('body-parser');
  const { sequelize, testConnection, syncModels } = require('./config/database');
  const authRoutes = require('./routes/auth.routes');

  // 加载环境变量
  dotenv.config();

  // 初始化Express应用
  const app = express();

  // 配置中间件
  app.use(cors()); // 允许跨域请求
  app.use(bodyParser.json()); // 解析JSON请求体
  app.use(bodyParser.urlencoded({ extended: true })); // 解析表单请求体

  // 配置路由
  app.use('/api/auth', authRoutes); // 用户接口前缀：/api/auth
//   app.use('/api/schools',schoolRoutes);// 学校接口前缀：/api/schooles

  // 404错误处理（未匹配到任何路由）
  app.use((req, res) => {
    res.status(404).json({ message: '接口不存在' });
  });

  // 全局错误处理（捕获所有异常）
  app.use((err, req, res, next) => {
    console.error('全局错误：', err.stack);
    res.status(500).json({ message: '服务器内部错误' });
  });

  // 启动服务器并连接数据库
  const PORT = process.env.PORT || 3000;
  const startServer = async () => {
    try {
      // 测试数据库连接
      await testConnection();
      // 同步模型到数据库（开发时用，生产用migrations）
      await syncModels();
      // 启动服务器
      app.listen(PORT, () => {
        console.log(`服务器运行在：http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('服务器启动失败：', error.message);
      process.exit(1);
    }
  };

  // 执行启动函数
  startServer();