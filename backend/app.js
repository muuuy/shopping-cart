var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const port = 5173;

require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var ordersRouter = require("./routes/orders");

var app = express();

//set up database connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use(
  session({
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 86400000 },
    store: MongoStore.create({
      mongoUrl: mongoDB,
      collectionName: "sessions",
      autoRemove: "native",
    }),
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/orders", ordersRouter);

app.listen(port, () => {
  console.log("listening to:", port);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
