const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require("./middlewares/errorMiddleware");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");

// connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/api/employers", require("./routes/employerRoute"));

//Routes

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
