const express = require("express");
const cors = require("cors");
const app = express();
const { port } = require("./config");
const routerApi = require("./routes");
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require("./middlewares/error.handler");

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Api listening on port ${port}`);
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
