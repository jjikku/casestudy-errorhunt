// Npm install for node_modules & Nodemon added as dev dependency (Part 1#1)
const express = require("express");
const path = require("path");
const cors = require("cors");
// Misssing external module (Part1#2)
const bodyParser = require("body-parser");

// Moved to Nav.js in /public/js (Part 2#6) 
// const nav = [
//   {
//     link: "/books",
//     title: "Books",
//   },
//   {
//     link: "/authors",
//     title: "Authors",
//   },
//   {
//     link: "/addbook",
//     title: "Add Book",
//   },
//   {
//     link: "/addauthor",
//     title: "Add Author",
//   },
// ];

const loginRouter = require("./src/routes/loginroute");
const signupRouter = require("./src/routes/signuproute");
// homeroute => homerouter (Part 1#3)
const homeRouter = require("./src/routes/homerouter");
const booksRouter = require("./src/routes/booksroute");
const authorsRouter = require("./src/routes/authorsroute");

const app = new express();
// Using cors (Part 2 #7)
app.use(cors());

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/home", homeRouter);
app.use("/books", booksRouter);
app.use("/authors", authorsRouter);

app.get("/", function (req, res) {
  res.render("index", {});
});

// PORT number changed to 5000 (Part1#5)
app.listen(5000, () => {
  console.log("Server Ready on 5000");
});
