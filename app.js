//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const items = ["Buy Food", "Cood Food", "Eat Food"];
const workItems = [];




app.get("/", function(req, res) {
    const day = date.getDate();
    const dayy = date.getDay();
    res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function(req, res) {
    const item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }

    console.log(item);
});




app.get("/work", function(req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", function(req, res) {
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});




app.get("/about", function(req, res) {
    res.render("about");
});




app.listen(3000, function() {
    console.log("server listening on port 3000");
});