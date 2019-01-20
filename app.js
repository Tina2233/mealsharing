var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
//var Comment = require("./models/comment");
var seedDB = require("./seeds");


mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();


app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req,res){

    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index", {campgrounds:allCampgrounds});
        }
    });
});

app.post("/campgrounds", function(req,res){
  //res.send("You hit the post route");
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc};
  
  //Create a new campgound and save to DB
  Campground.create(newCampground, function(err,newlyCreated){
      if(err){
          console.log(err);
      }else{
          //redirected back to campgrounds page
          res.redirect("/campgrounds");
      }
  });
});

app.get("/campgrounds/new", function(req,res){
    res.render("new");
});

app.get("/campgrounds/:id",function(req, res) {
     Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("show", {campgrounds:foundCampgrounds});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started");
});
