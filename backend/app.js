var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var newsRouter = require("./routes/news");
var categoryRouter = require("./routes/categories");
var subcategoryRouter = require("./routes/subCategories");
var commentRouter = require("./routes/comments");
var roleRouter = require("./routes/roles");
var authRouter = require("./routes/auth");
const PORT = 3000;

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/news", newsRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/subcategories", subcategoryRouter);
app.use("/api/comments", commentRouter);
app.use("/api/auth", authRouter);
app.use("/api/roles", roleRouter);

app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
