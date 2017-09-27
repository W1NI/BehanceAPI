var express = require('express');
var cors = require('cors');
var path = require('path');
var behanceIDs = require("./behanceUserNames");
var key = require("./key");
var app = express();

app.use(cors());

app.get("/behanceIDs", function (request, response){
	response.json(behanceIDs);
});

app.get("/key", function (request, response){
	response.json(key);
});

app.use(express.static("./public"));
app.use("/module", express.static(path.join(__dirname, "node_modules/")));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));

app.use(function(request, response, next){
	console.log(`${request.method} request for ${request.url}`);
	next();
});

app.listen(3000);

console.log("Server is running on port 3000");
