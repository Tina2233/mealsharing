var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image:String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({name: "CA", image:""},function(err, campground){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("NEWLY CREATED CAMPGROUND:");
//         console.log(campground);
//     }
// });


app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req,res){

    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds", {campgrounds:allCampgrounds});
        }
    });
});

app.post("/campgrounds", function(req,res){
  //res.send("You hit the post route");
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  
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

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started");
});
