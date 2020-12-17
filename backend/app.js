var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Load UserCtl
const userCtl = require("./ctl/userCtl");

app.get("/", function (req, res) {
  res.send("Welcome to the application");
});

// List of all users
app.get("/users", function (req, res) {
  userCtl.getUsersList(req, res);
});

// Create a new user
app.post("/users", function (req, res) {
  userCtl.createUser(req, res);
});

// Update a user
app.put("/users/:id", function (req, res) {
  userCtl.updateUser(req, res);
});

// Get a specific user
app.get("/users/:id", function (req, res) {
  userCtl.getUser(req, res);
});

// Delete a user
app.delete("/users/:id", function (req, res) {
  userCtl.deleteUser(req, res);
});

// Authenticate a user
app.post("/auth", function (req, res) {
  userCtl.userAuth(req, res);
});

var server = app.listen(8081, function () {
  var port = server.address().port;

  console.log("App listening at http://localhost:%s", port);
});

module.exports = app;
