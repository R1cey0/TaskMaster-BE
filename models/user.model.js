const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define("User", {
    id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    createdAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: () => new Date().valueOf() / 1000
    },
    updatedAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: () => new Date().valueOf() / 1000
    }
}, {
  tableName: 'users', // 表名（默认是模型名的复数形式，这里显式指定）
  timestamps: true // 自动添加createdAt和updatedAt字段（默认true）
})

module.exports = User;