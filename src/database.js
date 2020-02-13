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
            "status:int": {}  // Idk what to do with this yet tho, lol.
          }
        }
      ],
    }).then(() => {
      // log a confirmation message.
      console.log("Database is up!")
    })
  },
  retrieve: async function() {
    return await (db("todos").query("select").exec())
      .then((rows) => rows)
  },
  insert: async function(item) {
      return await db("todos").query("upsert", {item: item}).exec();
  },

}




module.exports = databse;