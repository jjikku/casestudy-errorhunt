const express = require("express");
const booksRouter = express.Router();
// const books = require('../data/books');
const bookdata = require("../model/BookModel");
const nav = require("../../public/js/nav");
const books = require("../data/books");

//router to render books page
booksRouter.get("/", function (req, res) {
  bookdata.find().then(function (books) {
    res.render("books", {
      books
    });
  });
});

//router to render addbook page
booksRouter.get("/addbook", function (req, res) {
  res.render("addbook", {
  });
});

//router to add book
booksRouter.post("/add", function (req, res) {
  try{ // For Heroku
    var item = {
      title: req.body.title,
      author: req.body.author,
      image: req.body.image,
      about: req.body.about,
    };
  }
  catch(e){
    console.log(e);
  }
  

  console.log(item);
  const book = new bookdata(item);
  book.save();
  res.redirect("/books");
});

//router to add all book
// booksRouter.get("/addall", async function (req, res) {
//   try{ // For Heroku
//     var item;
//     var book;
//     for(i=0;i<books.length;i++)
//     {
//       item = {
//         title: books[i].title,
//         author: books[i].author,
//         image: books[i].image,
//         about: books[i].about
//       };
//       console.log(item);
//      book = new bookdata(item);
//     const book_val = await book.save();
//     console.log(book_val)
//     }
    
//   }
//   catch(e){
//     console.log(e);
//   }
  
//   res.redirect("/books");
// });

//router for singlebook
booksRouter.get("/:id", function (req, res) {
  const id = req.params.id;
  bookdata.findOne({ _id: id }).then(function (book) {
    res.render("book", {
      book
    });
  });
});

//router to delete book
booksRouter.post("/delete", function (req, res) {
  const id = req.body.id;

  bookdata.findOneAndDelete({ _id: id }).then(function () {
    res.redirect("/books");
  });
});

//router to edit book
booksRouter.post("/edit", function (req, res) {
  bookdata.findById(req.body.id, function (err, data) {
    if (err) {
      throw err;
    } else {
      res.render("editbook", {
        data
      });
    }
  });
});

//router to update book
booksRouter.post("/update", function (req, res) {
  bookdata.findByIdAndUpdate(
    req.body.id,
    { $set: req.body },
    function (err, data) {
      if (err) {
        res.json({ status: "Failed" });
      } else if (data.n == 0) {
        res.json({ status: "No match Found" });
      } else {
        res.redirect("/books");
      }
    }
  );
});

module.exports = booksRouter;
