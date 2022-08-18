const express = require('express')
const router = express.Router();

const  {register,forgetpassword,login,resetpassword} =require("../controllers/auth");

// router.route("/register").post(register)
router.post("/register",register);

router.post("/login",login);

router.post("/forgetpassword",forgetpassword);

router.put("/resetpassword/:resetToken",resetpassword);

module.exports=router