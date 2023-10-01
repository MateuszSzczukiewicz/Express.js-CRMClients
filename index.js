const express = require("express");
const { engine } = require("express-handlebars");
const { clientRouter } = require("./routers/client");
const { join } = require("path");

const app = express();

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
    // helpers: handlebarsHelpers,
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials",
  }),
);
app.set("view engine", ".hbs");

app.use("/client", clientRouter);

app.listen(3002, "localhost", () => {
  console.log("Listening on http://localhost:3002");
});
