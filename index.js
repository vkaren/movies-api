const express = require("express");
const app = express();
const port = 3000;
const routerApi = require("./routes");
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require("./middlewares/error.handler");

app.get("/", (req, res) => {
  res.send("Hola mi server en Express");
});

app.listen(port, () => {
  console.log("My port: " + port);
});

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

routerApi(app);
