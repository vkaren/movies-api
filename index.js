const express = require("express");
const cors = require("cors");
const app = express();
const { port } = require("./config");
const routerApi = require("./routes");
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  removeFileOnAuthErrorHandler,
} = require("./middlewares/error.handler");

app.use(cors());
app.use(express.json());

routerApi(app);

app.use(logErrors);
app.use(removeFileOnAuthErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Api listening on port ${port}`);
});
