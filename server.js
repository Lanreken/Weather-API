require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3030;
const weatherRouter = require("./routes/weatherRouter");
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors())
app.use("/api/v1", weatherRouter);

app.use("/", (req, res) => {
  res.send("Connected to Weather API Server");
});

app.use((error, req, res, next) => {
  if (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
