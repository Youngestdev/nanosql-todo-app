
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const database = require('./database');

const app = express();
app.use(bodyParser.json());
app.use(cors())

database.start();

app.get("/", (req, res) => {
  database.retrieveAll().then((items) => {
    res.send(items)
  })
});

app.get("/:id", (req, res) => {
  database.retrieve(req.params.id).then((item) => {
    res.send(item)
  })
});

app.post("/", async (req, res) => {
  await database.insert(req.body.item).then(() => {    
    res.status(200).send("You have successfully added a new todo.")
  })
})

app.delete("/del/:id", async (req, res) => {
  await database.delete(req.params.id).then(() => {
    res.status(200).send(`Todo item ${req.params.id} has been successfully deleted.`)
  })
})

app.put("/update/:id", async (req, res) => {
  await database.update(req.params.id, req.body.item).then(() => {
    res.status(200).send(`Todo item ${req.params.id} has been updated successfully.`)
  })
})

app.delete("/delete", async (req, res) => {
  await database.deleteAll().then(() => {
    res.status(200).send(`All todo items have been deleted.`)
  })
})


app.listen(8081, () => {
  console.log("App's running on port 8081");
});
