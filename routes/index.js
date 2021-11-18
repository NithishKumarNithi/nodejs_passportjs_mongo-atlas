const express = require('express'),
      router = express.Router(),
      passport = require('passport');
      Register = require('../config/model');

router.get('/login', (req,res) =>  { 
    res.render("login", { error: req.flash('error')[0] , logout: req.flash('logout')[0]}) 
});

router.post('/authenticate', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }));

router.get('/',isLogined, (req,res) => {
    req.flash('success','Login Successfull')
    res.render("dashboard", { success: req.flash('success')[0] , user: req.user } );
});

router.get('/logout', (req,res) => {
    req.logOut();
    req.flash('logout', 'Logout Successfull');
    res.redirect('/login');
});

router.get('/register', (req,res) => {
    res.render('register', {regisMsg: req.flash('regismsg')[0], regisErr: req.flash('regiserr')[0] });
});

router.post('/add-user', (req,res,next) => {

    if (req.body.email == '' || req.body.password == ''){
        req.flash('regiserr', 'Fields Required');
        res.redirect('/register');
    }

    if (req.body.email != '' && req.body.password != ''){
        Register.findOne({email:req.body.email})
        .then( (result1) => {
            if (!result1) {
                const user = new Register({email:req.body.email, password:req.body.password});
                user.save()
                    .then((result2) => {
                        req.flash('regismsg', 'Registration Successfull');
                        res.redirect('/register');
                    })
            } else {
                req.flash('regiserr', 'User Already Exist');
                res.redirect('/register');
            }
        });  
    } 
    
});

function isLogined(req,res,next){
    if ( req.isAuthenticated() ) return next();
    res.redirect('/login');
}

module.exports = router;