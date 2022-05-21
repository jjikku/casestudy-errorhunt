const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://jikku:jikku123@cluster0.ly4pn.mongodb.net/?retryWrites=true&w=majority", {
  //useUnifiedTopology: true,
  useNewUrlParser: true
});
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  title: String,
  image: String,
  about: String,
});

const authordata = mongoose.model("authordata", AuthorSchema);

module.exports = authordata;
