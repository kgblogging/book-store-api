const express = require('express');
const { login, register, changePassword, refreshToken, verifyToken } = require('../controllers/auth-controller');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router()

// all the routes related to books only

router.post('/login', login);
router.post('/register', register);
router.post('/change-password',authMiddleware, changePassword);
router.get('/refresh-token', refreshToken);
router.post('/verify-token', verifyToken)

module.exports = router