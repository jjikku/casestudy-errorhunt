const express = require("express");
const authorsRouter = express.Router();
const authors = require('../data/authors');
const authordata = require("../model/AuthorModel");
const nav = require("../../public/js/nav");

//router to render authors page
authorsRouter.get("/", function (req, res) {
  authordata.find().then(function (authors) {
    res.render("authors", {
      authors
    });
  });
});

//router to render add author page
authorsRouter.get("/addauthor", function (req, res) {
  res.render("addauthor", {
  });
});

//router to add author
authorsRouter.post("/add", function (req, res) {
  try{ // For Heroku
    var item = {
      title: req.body.title,
      //images => image (Part 2#8)
      image: req.body.image,
      about: req.body.about,
    };
  }
  catch(e){
    console.log(e);
  }
  
  console.log(item);
  const author = new authordata(item);
  author.save();
  res.redirect("/authors");
});

// authorsRouter.get("/addall", async function (req, res) {
//   try{ // For Heroku
//     var item;
//     for(i=0;i<authors.length;i++)
//     {
//        item = {
//         title: authors[i].title,
//         //images => image (Part 2#8)
//         image: authors[i].image,
//         about: authors[i].about,
//       };
//       console.log(item);
//     const author = new authordata(item);
//     const author_val = await author.save();
//     console.log(author_val);
//     }
    
//   }
//   catch(e){
//     console.log(e);
//   }
  
  
//   res.redirect("/authors");
// });


//router for single author
authorsRouter.get("/:id", function (req, res) {
  const id = req.params.id;
  authordata.findOne({ _id: id }).then(function (author) {
    res.render("author", {
      author
    });
  });
});

//router to delete author
authorsRouter.post("/delete", function (req, res) {
  //(Part 2#9)
  //authorsRouter.delete("/delete", function (req, res) {
  const id = req.body.id;
  console.log(id);
  debugger;
  //authordata.findOneAndDelete({ _id: id }).then(function () {
  authordata.deleteOne({ _id: id }).then(function () {
    res.redirect("/authors");
  });
});

//router to edit author
authorsRouter.post("/edit", function (req, res) {
  authordata.findById(req.body.id, function (err, data) {
    if (err) {
      throw err;
    } else {
      res.render("editauthor", {
        data
      });
    }
  });
});

//router to update author
authorsRouter.post("/update", function (req, res) {
  authordata.findByIdAndUpdate(
    req.body.id,
    { $set: req.body },
    function (err, data) {
      if (err) {
        res.json({ status: "Failed" });
      } else if (data.n == 0) {
        res.json({ status: "No match Found" });
      } else {
        res.redirect("/authors");
      }
    }
  );
});

module.exports = authorsRouter;
