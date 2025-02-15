const express = require("express");
const app = express();

const EmployeRouter = require("./Routes/EmployeRoutes");

require("dotenv").config();
// Body parser is a middleware for Node. js that parses
// incoming request bodies and makes them available as
// objects in the req. body property. This is crucial for
//  handling data submitted through HTML forms, JSON data, and other formats
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 9000;
// connect to the data base
require("./Models/db");

app.use(bodyParser.json());

app.get("/");

app.use("/api/employess", EmployeRouter);

app.listen(PORT, () => {
  console.log(`The Server Is Working :- http://localhost:${PORT}`);
});
