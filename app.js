const express = require("express"),
  bodyParser = require("body-parser"),
  app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {
  let today = new Date(),
    options = {
      weekday: "long",
      day: "numeric",
      month: "long"
    };

  let day = today.toLocaleDateString("en-Us", options);

  res.render("list", { kindOfDay: day, newItems: items });
});

app.post("/", function(req, res) {
  let item = req.body.newItem;

  if (item.length > 0) {
    items.push(item);
  }

  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
