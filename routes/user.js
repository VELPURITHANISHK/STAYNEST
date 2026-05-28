const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Wrapasync=require("../utils/Wrapasync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const UserController=require("../controllers/user.js");

router.route("/signup")
.get(UserController.renderSignup)
.post(Wrapasync(UserController.signup));


router.route("/login")
.get(UserController.renderLogin)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect : "/login", failureFlash : true}),
  UserController.login );

router.get("/logout",UserController.logout);


module.exports=router;

/* router.get("/signup",UserController.renderSignup);

router.post("/signup",Wrapasync(UserController.signup));

router.get("/login",UserController.renderLogin);

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect : "/login", failureFlash : true}),
  UserController.login ); */



