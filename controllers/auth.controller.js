const User = require('../models/user.model');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'createdAt'] // 隐藏密码字段
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: '获取用户失败', error: error.message });
    }
};