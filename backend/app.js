var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var apiRouter = require("./routes/apis");
var newsRouter = require("./routes/news");
var categoryRouter = require("./routes/categories");
var subcategoryRouter = require("./routes/subcategories");
var commentRouter = require("./routes/comments");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/v1", apiRouter);
app.use("/news", newsRouter);
app.use("/categories", categoryRouter);
app.use("/subcategories", subcategoryRouter);
app.use("/comments", commentRouter);

module.exports = app;
