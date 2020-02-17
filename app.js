const express = require("express"),
  bodyParser = require("body-parser"),
  date = require(__dirname + "/date.js"),
  app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"],
  workItems = [];


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function (req, res) {

  let day = date.getDate();

  res.render("list", {
    listTitle: day,
    newItems: items
  });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;

  if (item.length > 0) {
    if (req.body.list === "Work") {
      workItems.push(item);
      res.redirect("/work");
    } else {
      items.push(item);
      res.redirect("/");
    }
  }
});

app.get("/work", function (req, res) {
  res.render("list", {
    listTitle: "Work List",
    newItems: workItems
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});