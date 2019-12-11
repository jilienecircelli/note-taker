var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// app.use(express.static(__dirname + '/public'));

// ROUTES
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// app.get("/api/notes", function(req, res) {
//     var noteData = res.sendFile(path.join(__dirname, '../db/',
//         "db.json"));
//     res.json(noteData);
// });

// app.post("/api/notes", function(req, res) {

// });

// LISTENER
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});