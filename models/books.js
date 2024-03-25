/******************************************************************************
 ***
 * ITE5315 – Assignment 4
 * I declare that this assignment is my own work in accordance with Humber Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Gaurav Hariyani Student ID: N01579426 Date: 24-03-2024
 *
 *
 ******************************************************************************
 **/
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
EmpSchema = new Schema({
  title: String,
  author: String,
  price: Number,
  pages: Number,
  avg_reviews: Number,
  n_reviews: Number,
  star: String,
  dimensions: String,
  weight: String,
  language: String,
  publisher: String,
  ISBN_13: String,
  complete_link: String,
});
module.exports = mongoose.model("book", EmpSchema);
