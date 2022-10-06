//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

let items = ["Buy Food", "Cood Food", "Eat Food"];
let workItems = [];

app.get("/", function(req, res) {

    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-US", options);

    res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function(req, res) {

    let item = req.body.newItem;

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
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/about", function(req, res) {
    res.render("about");
});


app.listen(3000, function() {
    console.log("server listening on port 3000");
});