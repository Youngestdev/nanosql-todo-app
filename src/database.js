const nSQL = require("@nano-sql/core");

const db = nSQL.nSQL;

// Start database...

let databse = {
  start: async function() {
    return await db().createDatabase({
      id: "todo_list",
      mode: "PERM",
      tables: [
        {
          name: "todos",
          model: {
            "id:uuid": {pk: true},
            "item:string": {},            
          }
        }
      ],
    }).then(() => {
      // log a confirmation message.
      console.log("Database is up!")
    })
  },
  retrieve: async function(id) {
    return await db("todos").query("select").where(["id", "=", id]).exec().then((item) => item)
  },
  retrieveAll: async function() {
    return await (db("todos").query("select").exec())
      .then((rows) => rows)
  },
  insert: async function(item) {
    return await db("todos").query("upsert", {item: item}).exec();
  },
  update: async function(id, item) {
    await db("todos").query("upsert", {item: item}).where(["id", "=", id]).stream((row) => {
      console.log(row)
    }, () => {
      console.log("done")
      // await this.delete(id)
    }, (err) => {
      console.log(err)
    })
  },
  delete: async function(id) {
    return await db("todos").query("delete").where(["id", "=", id]).exec();
  },
  deleteAll: async function() {
    return await db("todos").query("delete").exec();
  },
}




module.exports = databse;