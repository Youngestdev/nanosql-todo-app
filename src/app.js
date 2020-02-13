
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const database = require('./database');

const app = express();
app.use(bodyParser.json());
app.use(cors())

database.start();

app.get("/", (req, res) => {
  database.retrieve().then((items) => {
    res.send(items)
  })
});

app.post("/", async (req, res) => {
  console.log(req.body)
  await database.insert(req.body.item).then(() => {    
    res.status(200).send()
  })
})


app.listen(8081, () => {
  console.log("App's running on port 8081");
});
