const express = require("express");
require("dotenv").config();
const sanitize = require("sanitize");
const cors = require("cors");

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};

const router = require("./routes");

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(sanitize.middleware);

app.use(router);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

module.exports = app;
