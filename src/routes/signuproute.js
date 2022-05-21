const express = require("express");
const signupRouter = express.Router();
const user = require("../data/user");

signupRouter.get("/", function (req, res) {
  res.render("signup", {});
});

signupRouter.get("/adduser", function (req, res) {
  var newuser = {
    // Part 2#10
    //  uid:req.param("uid"),
    //  pwd:req.param("pwd")
    uid:req.query.uid,
    pwd:req.query.pwd
  };
  console.log(newuser);
  user.push(newuser);
  console.log(user);
  res.redirect("/login");
});

module.exports = signupRouter;
