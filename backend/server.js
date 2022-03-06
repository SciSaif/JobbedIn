const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require("./middlewares/errorMiddleware");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");
const path = require("path");
const bodyParser = require("body-parser");

// connect to database
connectDB();

const app = express();

// app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

app.use("/api/company", require("./routes/companyRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api", require("./routes/otherRoutes"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the JobbedIn" });
  });
}
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
