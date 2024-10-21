require('dotenv').config();
const express = require('express');
const path = require('path');

const helmet = require('helmet');
const crypto = require('crypto'); 

const connectDB = require(path.join(__dirname, 'db'));
const User = require('./models/userInfo');

const bcrypt = require('bcryptjs');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectDB();
  
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/register', async (req, res) => {
    const { email, password } = req.body; // 从请求体中解构出 email 和 password

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        // 检查用户是否已经存在
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // 加密密码
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 创建并保存新用户
        user = new User({
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(200).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body; // 从请求体中获取 email 和 password

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        // 查找用户
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid email or password' });
        }

        // 比较密码
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid email or password' });
        }

        // 登录成功，可以在此处创建会话或生成令牌（如 JWT）

        // 暂时直接返回成功消息
        res.status(200).json({ msg: 'Login successful' });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});


  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
