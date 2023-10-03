const express = require("express");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const { clientRouter } = require("./routers/client");
const { join } = require("path");
const { homeRouter } = require("./routers/home");
const { handleError } = require("./utils/errors");

const app = express();

app.use(methodOverride("_method"));
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.static("public"));
app.use(express.json());
app.set("views", join(__dirname, "views"));
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials",
  }),
);
app.set("view engine", ".hbs");

app.use("/", homeRouter);
app.use("/client", clientRouter);

app.use((err, req, res, next) => {
  handleError(err, req, res);
});

app.listen(3002, "localhost", () => {
  console.log("Listening on http://localhost:3002");
});
