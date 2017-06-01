var express = require('express');
var app = express();
var request = require('request');
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("search")
});

var query = ""

app.get("/results", function(req, res){
  query = req.query.search;
  var url = "http://www.omdbapi.com/?s="+ query + "&apikey=INSERTAPIKEY";
  request(url, function(error, response, body){
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.render("results", {data: data})
    }
  });
});

app.get("/detailed/:id",function(req, res){
  var id = req.params.id
  var detail = "http://www.omdbapi.com/?i=" + id + "&plot=short&apikey=INSERTAPIKEY"
  request(detail, function(error, response, body){
    if (!error && response.statusCode == 200) {
      var detaileddata = JSON.parse(body);
      var search = query
      res.render("detailed", {detaileddata: detaileddata}, {search, search})
    }
  });
});


app.listen(process.env.PORT, process.env.IP, function(){
  console.log("The server has started!")
});
