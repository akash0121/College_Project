require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const jwt = require("jsonwebtoken");
var cors = require("cors");
var bodyParser = require("body-parser");
const User = require("./models/User");
const authRouter = require('./routes/auth');
const verifyJWT = require("./middleware");
const path = require("path")

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname,'dist')))

// db connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database Connected");
}

app.use(express.json());

//Authentication route
app.use('/auth', authRouter);

//decodeDetails Route
app.get('/decodeDetails', verifyJWT, (req, res) => {
  const { userName } = req.user;
  res.json({ userName });
});


app.get("/", (req, res) => {
  res.send(path.resolve(__dirname,'dist'));
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
