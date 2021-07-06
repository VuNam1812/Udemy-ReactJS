const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
require("express-async-errors");

const auth = require("./middlewares/auth.mdw");

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/public", express.static("public"));

//require('./middlewares/view.mdw')(app);
//require('./middlewares/session.mdw')(app);
//require('./middlewares/locals.mdw')(app);
//require('./middlewares/routes.mdw')(app);
//require('./middlewares/error.mdw')(app);

app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/accounts", require("./routes/account.route"));
app.use("/api/categories", require("./routes/category.route"));
app.use("/api/courses", require("./routes/course.route"));

app.use(function (req, res, next) {
  res.status(404).send({
    error_message: "Endpoint not found!",
  });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({
    error_message: "Something broke!",
  });
});

const PORT = 3030;
app.listen(PORT, function () {
  console.log(`back-end is running at http://localhost:${PORT}`);
});
