var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    author: String
});

// var Comment= mongoose.model("Comment", commentSchema);
// Comment.create(
//     {
//     text: "sdfg",
//     author:"dfs"
// }, function(err, comment){
//     if(err) {console.log(err);}
//     else{console.log(comment);}
// });

module.eports = mongoose.model("Comment", commentSchema);