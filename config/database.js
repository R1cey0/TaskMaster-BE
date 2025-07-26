  const { Sequelize } = require('sequelize');
  require('dotenv').config(); // 加载环境变量

  // 初始化Sequelize实例
  const sequelize = new Sequelize(
    process.env.DB_NAME,      // 数据库名
    process.env.DB_USER,      // 用户名
    process.env.DB_PASSWORD,  // 密码
    {
      host: process.env.DB_HOST,  // 主机
      port: process.env.DB_PORT,  // 端口
      dialect: 'mysql',           // 数据库类型（MySQL）
      dialectOptions: {
        // 解决MySQL 8.0+的连接问题（可选，但推荐）
        ssl: {
          rejectUnauthorized: false
        }
      }
    }
  );

  // 测试数据库连接
  const testConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log('数据库连接成功！');
    } catch (error) {
      console.error('数据库连接失败：', error.message);
      process.exit(1); // 连接失败时退出进程
    }
  };

  // 同步模型到数据库（开发时用，生产用 migrations）
  const syncModels = async () => {
    try {
      await sequelize.sync({ alter: true }); // alter: true 会修改表结构（不删除数据）
      console.log('模型同步成功！');
    } catch (error) {
      console.error('模型同步失败：', error.message);
    }
  };

  module.exports = {
    sequelize,
    testConnection,
    syncModels
  };