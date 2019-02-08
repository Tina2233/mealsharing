var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport    = require("passport");
var LocalStrategy = require("passport-local");
// var Restaurant  = require("./models/restaurant");
// var Comment     = require("./models/comment");
var flash       = require("connect-flash");
var methodOverride = require("method-override");
var User        = require("./models/user");
//var seedDB = require("./seeds");

//requring routes
var commentRoutes    = require("./routes/comments"),
    restaurantRoutes = require("./routes/restaurants"),
    indexRoutes      = require("./routes/index")

mongoose.connect("mongodb://localhost/yelp_camp_v6");
//mongoose.connect(process.env.DATABASEURL);
//process.env.DATABASEURL

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); //seed the data base

//passport configuration
app.use(require("express-session")({
    secret: "Ting is the best!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/restaurants/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Meal Sharing Server Has Started");
});
