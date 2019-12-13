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

app.get("/api/notes", function(req, res) {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
        res.json(JSON.parse(data));
    });
});

app.post("/api/notes", function(req, res) {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let temp = JSON.parse(data);
        console.log(temp)
        temp.push(req.body)
        fs.writeFile('./db/db.json', JSON.stringify(temp), (err) => {
            if (err) throw err;
            res.json('The file has been saved!')
        })
    })
});

app.delete("/api/notes/:id", function(req, res) {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let temp = JSON.parse(data);
        temp.splice(req.params.id, 1)
        fs.writeFile('./db/db.json', JSON.stringify(temp), (err) => {
            if (err) throw err;
            res.json('The note has been removed!')
        })
    })
});

app.post("/api/clear", function(req, res) {
    db.length = 0;
})


// LISTENER
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});