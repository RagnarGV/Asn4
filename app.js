var express = require("express");
var mongoose = require("mongoose");
var app = express();
var path = require("path");
var database = require("./config/database");
const exphbs = require("express-handlebars");
app.use(express.static(path.join(__dirname, "public"))); //default public path
var port = process.env.PORT || 8000;
app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    helpers: {
      modifyAvgReviews: function (avg_reviews) {
        if (avg_reviews == "") {
          avg_reviews = "N/A";
        }
        return avg_reviews;
      },
    },
  })
);
//setting template engine
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: "true" })); // parse application/x-www-form-urlencoded
app.use(express.json()); // parse application/json
app.use(express.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json

mongoose.connect(database.url);

// var Employee = require("./models/employees");
var Books = require("./models/books");
//get all employee data from db
// app.get("/api/employees", function (req, res) {
//   // use mongoose to get all todos in the database
//   Employee.find(function (err, employees) {
//     // if there is an error retrieving, send the error otherwise send data
//     if (err) res.send(err);
//     res.json(employees); // return all employees in JSON format
//   });
// });

app.get("/api/books", function (req, res) {
  // use mongoose to get all todos in the database
  Books.find(function (err, books) {
    // if there is an error retrieving, send the error otherwise send data
    if (err) res.send(err);
    res.json(books); // return all employees in JSON format
  });
});

app.get("/api/book-add-form", function (req, res) {
  // use mongoose to get all todos in the database
  res.render("addBook");
});

//using handlebars
app.get("/api/books-info", function (req, res) {
  // use mongoose to get all todos in the database
  Books.find(function (err, books) {
    // if there is an error retrieving, send the error otherwise send data
    if (err) res.send(err);
    res.render("allData", {
      title: "JSON data is loaded and ready!",
      content: books,
    }); // return all employees in JSON format
  }).lean();
});

// get a employee with ID of 1
app.get("/api/books/:book_id", function (req, res) {
  let id = req.params.book_id;
  Books.findById(id, function (err, books) {
    if (err) res.send(err);

    res.json(books);
  });
});

// create employee and send back all employees after creation
// app.post("/api/employees", function (req, res) {
//   // create mongose method to create a new record into collection
//   console.log(req.body);

//   Employee.create(
//     {
//       author: req.body.author,
//       avg_reviews: req.body.author,
//       complete_link: req.body.author,
//       dimensions: req.body.author,
//       ISBN_13: req.body.author,
//       language: req.body.author,
//       n_reviews: req.body.author,
//       pages: req.body.author,
//       price: req.body.author,
//       publisher: req.body.author,
//       star: req.body.author,
//       title: req.body.author,
//       weight: req.body.author,
//     },
//     function (err, books) {
//       if (err) res.send(err);

//       // get and return all the employees after newly created employe record
//       Employee.find(function (err, books) {
//         if (err) res.send(err);
//         res.json(books);
//       });
//     }
//   );
// });

app.post("/api/books", function (req, res) {
  // create mongose method to create a new record into collection
  console.log(req.body);

  Books.create(
    {
      author: req.body.author,
      avg_reviews: req.body.avg_reviews,
      complete_link: req.body.complete_link,
      dimensions: req.body.dimensions,
      ISBN_13: req.body.ISBN_13,
      language: req.body.language,
      n_reviews: req.body.n_reviews,
      pages: req.body.pages,
      price: req.body.price,
      publisher: req.body.publisher,
      star: req.body.star,
      title: req.body.title,
      weight: req.body.weight,
    },
    function (err, books) {
      if (err) res.send(err);

      // get and return all the employees after newly created employe record
      //   Employee.find(function (err, books) {
      //     if (err) res.send(err);
      //     res.json(books);
      //   });
      Employee.find(function (err, books) {
        // if there is an error retrieving, send the error otherwise send data
        if (err) res.send(err);
        res.render("allData", {
          title: "All books",
          content: books,
        }); // return all employees in JSON format
      }).lean();
    }
  );
});
// create employee and send back all employees after creation
// app.put("/api/employees/:employee_id", function (req, res) {
//   // create mongose method to update an existing record into collection
//   console.log(req.body);

//   let id = req.params.employee_id;
//   var data = {
//     name: req.body.name,
//     salary: req.body.salary,
//     age: req.body.age,
//   };

//   // save the user
//   Employee.findByIdAndUpdate(id, data, function (err, employee) {
//     if (err) throw err;

//     res.send("Successfully! Employee updated - " + employee.name);
//   });
// });

app.put("/api/books/:book_id", function (req, res) {
  // create mongose method to update an existing record into collection
  console.log(req.body);

  let id = req.params.book_id;
  var data = {
    author: req.body.author,
    avg_reviews: req.body.avg_reviews,
    complete_link: req.body.complete_link,
    dimensions: req.body.dimensions,
    ISBN_13: req.body.ISBN_13,
    language: req.body.language,
    n_reviews: req.body.n_reviews,
    pages: req.body.pages,
    price: req.body.price,
    publisher: req.body.publisher,
    star: req.body.star,
    title: req.body.title,
    weight: req.body.weight,
  };

  // save the user
  Books.findByIdAndUpdate(id, data, function (err, books) {
    if (err) throw err;

    res.send("Successfully! Book updated - " + books.title);
  });
});

// delete a employee by id
// app.delete("/api/employees/:employee_id", function (req, res) {
//   console.log(req.params.employee_id);
//   let id = req.params.employee_id;
//   Employee.remove(
//     {
//       _id: id,
//     },
//     function (err) {
//       if (err) res.send(err);
//       else res.send("Successfully! Employee has been Deleted.");
//     }
//   );
// });

app.delete("/api/books/:book_id", function (req, res) {
  console.log(req.params.book_id);
  let id = req.params.book_id;
  Books.remove(
    {
      _id: id,
    },
    function (err) {
      if (err) res.send(err);
      else res.send("Successfully! Book has been Deleted.");
    }
  );
});

app.listen(port);
console.log("App listening on port : " + port);
