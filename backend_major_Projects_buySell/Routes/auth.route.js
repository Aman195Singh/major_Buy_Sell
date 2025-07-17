const express =require("express");
const {login ,signup, refreshToken,logout} = require('../Controllers/auth.controller')
const authMiddleware = require("../Middleware/auth.middleware")

const router =express.Router();

router.post('/login',login)
router.post('/signup',signup)
router.post('/refresh-token',refreshToken)
router.post('/logout',authMiddleware,logout)

module.exports = router;