var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req,res){
  var campgrounds = [
      {name: "CA", image:""},
      {name: "NY", image:""},
      {name: "Boston", image:""}
  ]
  res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campground", function(req,res){
   res.send("You hit the post route");
});

app.get("/campgrounds/new", function(req,res){
    res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp Server Has Started");
});
