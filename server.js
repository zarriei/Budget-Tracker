const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = 3200;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./Develop/routes/api"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);

  app.get('/', function(req, res){
    res.sendFile(__dirname+'/bin/public/index.html'); // change the path to your index.html
});
});