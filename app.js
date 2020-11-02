const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

require("dotenv").config();

const userRouter = require("./routers/userRouter");
const pollRouter = require("./routers/pollRouter");

const app = express();

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.heuxh.mongodb.net/VoteApp?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then((result) => {
    console.log("Connected to database");

    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(bodyParser.json())

app.use(cookieParser());

app.use("/user", userRouter);

app.use("/poll", pollRouter);

app.get("/", (req, res) => {
  if (!req.cookies["user_id"]) {
    res.sendFile("/html/landingpage.html", { root: "./" });
  } else {
    res.sendFile("/html/home.html", { root: "./" });
  }
});

app.use((req, res) => {
  res.status(404).sendFile("html/404.html", { root: "./" });
});
