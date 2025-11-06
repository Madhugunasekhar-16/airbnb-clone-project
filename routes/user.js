const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../Utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");



router.get("/signup", (req,res) =>{
    res.render("users/signup.ejs");
});

router.post("/signup", wrapAsync(async (req,res) =>{
    try {
        let {username, email, password} = req.body;
        const newUser = new User ({email, username});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) =>{
            if(err) {
                return next(err);
            }
            req.flash("success", "Log in to check your itinerary.");
            res.redirect("/listings");
        });
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    };
}));

router.get("/login", (req,res) =>{
    res.render("users/login.ejs");
});

router.post("/login",saveRedirectUrl,passport.authenticate("local", 
    { failureRedirect: '/login', 
    failureFlash : true }), 
    async (req,res) =>{
        req.flash("success","Welcome Back!");
        const redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
});


router.get("/logout", (req,res) =>{
    req.logout((err) =>{
        if(err) {
            return next(err);
        }
        req.flash("success", "See you next time! You have been logged out.");
        res.redirect("/listings");
    })
});

module.exports = router;


