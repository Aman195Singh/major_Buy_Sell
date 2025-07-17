const express= require("express")
const mongoose = require("mongoose")
const{
    addToCart,
    removeFromCart,

    addProfilePic,
    removeProfilePic,

    addAddress,
    chooseAddress,
    removeAddress

} = require('../Controllers/userController')

const userMiddleware = require("../Middleware/user.middleware")

const router = express.Router();

router.post('/addToCart',addToCart)
router.post('/removeProduct',removeFromCart)
router.post('/addProfilePic',addProfilePic)
router.post('/removeProfilePic',removeProfilePic)
router.post('/addAddress', addAddress)
router.post('/chooseAddress', chooseAddress)
router.post('/removeAddress',removeAddress)

module.exports =router;

