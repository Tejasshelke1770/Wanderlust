const User = require("../models/user.js");

module.exports.handleSignupUser = async (req, res) => {
    res.render("signup.ejs");
  }

  module.exports.handlePostSignupUser = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registerUser = await User.register(newUser, password);
      console.log(registerUser);
      req.login(registerUser,(err) =>{
        if(err){
          next(err)
        }
        req.flash("success", "Welcome to wanderlust");
      res.redirect("/listing");
      })
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/signup");
    }
  }


module.exports.handleLoginUser = async (req, res) => {
    res.render("login.ejs");
  }

  module.exports.handlePostLoginUser = async (req, res) => {
    req.flash("success" , "Successfully Loged in!")
    let redirectUrl = res.locals.redirectURL || "/listing"
      res.redirect(redirectUrl) 
  }

  module.exports.handleLogoutUser = (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "You are logged out!");
      res.redirect("/listing");
    });
  }