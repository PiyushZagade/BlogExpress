const express = require("express");
const cors = require("cors");

const userRouter = require("./routes/user");
const categoryRouter = require("./routes/category");
const blogRouter = require("./routes/blog");
const authorization = require("./routes/authorization");

const app = express();

// const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(authorization);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/blog", blogRouter);

app.listen(4000, "localhost", () => {
  console.log("Server Started at port number 4000");
});
