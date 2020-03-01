const express = require("express"),
  bodyParser = require("body-parser"),
  // date = require(__dirname + "/date.js"),
  mongoose = require("mongoose"),
  app = express();

// const items = ["Buy Food", "Cook Food", "Eat Food"],
//   workItems = [];

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static("public"));

//connecting to the DB

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const itemSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "Welcome to your to-do list!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<== Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

app.get("/", function(req, res) {
  //showing all the items

  Item.find((err, foundItems) => {
    if (err) {
      console.log(err);
    } else {
      if (foundItems.length == 0) {
        Item.insertMany(defaultItems, err => {
          if (err) {
            console.log(err);
          } else {
            console.log("Successfully added the default items to the DB");
          }
        });
        res.redirect("/");
      } else {
        // let day = date.getDate();
        res.render("list", {
          listTitle: "Today",
          // listTitle: day,
          newItems: foundItems
        });
      }
    }
  });
});

app.post("/", function(req, res) {
  let itemName = req.body.newItem;

  const item = new Item({
    name: itemName
  });

  item.save();

  res.redirect("/");

  // if (item.length > 0) {
  //   if (req.body.list === "Work") {
  //     workItems.push(item);
  //     res.redirect("/work");
  //   } else {
  //     items.push(item);
  //     res.redirect("/");
  //   }
  // }
});

app.post("/delete", (req, res) => {
  const checkedItemId = req.body.checkbox;

  Item.findByIdAndRemove(checkedItemId, err => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully deleted");
      res.redirect("/");
    }
  });
});

// app.get("/work", function(req, res) {
//   res.render("list", {
//     listTitle: "Work List",
//     newItems: workItems
//   });
// });

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
