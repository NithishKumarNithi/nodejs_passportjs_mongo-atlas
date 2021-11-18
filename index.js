const express = require('express'),
      passport = require('passport'),
      session = require('express-session'),
      flash = require('connect-flash'),
      localstrategy = require('./config/strategy');

const app = express();
const PORT = 9999;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// EJS
app.set('view engine','ejs');

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// flash middleware
app.use(flash());

localstrategy.strategy(passport);

// routes
app.use('/',require('./routes'));

app.listen(PORT);