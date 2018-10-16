const settings = require("./settings"); // settings.json
const knex = require('knex')(settings);

const input = process.argv.splice(2, 3);
const insertVal = {
  first_name: input[0],
  last_name: input[1],
  birthdate: new Date(input[2])
};

knex('famous_people').insert(insertVal)
.then(()=>{knex.destroy();});