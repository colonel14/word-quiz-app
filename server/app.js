const express = require("express");
const app = express();
const cors = require("cors");

const mainRouter = require("./routes/main");
const notFoundMiddleware = require("./middlewares/not-found");

// middleware
app.use(express.json());
app.use(cors());
app.use("/api/v1", mainRouter);

app.use(notFoundMiddleware);

const port = 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
