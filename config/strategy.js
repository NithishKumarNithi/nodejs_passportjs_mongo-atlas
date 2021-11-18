const LocalStrategy = require('passport-local'),
      Register = require('../config/model');
const EMAIL = 'test@test.com';
const PSW = '123$';

exports.strategy = function(passport){

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        (_username, _psw, done) => {
            Register.findOne({email:_username}, (err,user) => {
                if ( !user ) return done(null, false, { message : 'Wrong Email .' });     
                if ( _psw != user.password) return done(null, false, { message : 'Wrong Password.' });
                if( err ) return done(null, false, { message : 'Error Occured Please Try Again .' });  
                return done(null, user.email);
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
    
}