const settings = require("./settings"); // settings.json
const knex = require('knex')(settings);

const input = process.argv[2];

function searchByName(name, callback) {
  console.log('Searching ...');
  knex.select().from('famous_people')
  .whereRaw('LOWER(first_name) = LOWER(?)', name)
  .orWhereRaw('LOWER(last_name) = LOWER(?)', name)
  .then((result) => {
    printSearchResult(result);
  })
  .catch(function(err){
    console.error("error running query", err);
  })
  .then(() => {knex.destroy()});
}


function printSearchResult (result) {

    let i = 1;
    if (result.length > 0) {
      console.log(`Found ${result.length} person(s) by the name '${input}':`);
      for (let person of result){
        console.log(`- ${i}: ${person.first_name} ${person.last_name}, born ${person.birthdate.getUTCFullYear()}-${person.birthdate.getMonth()}-${person.birthdate.getDate()}`);
        i ++;
      }
    } else{
      console.log(`Did not find any person by the name '${name}'.`);
    }
  // }
}

searchByName(input, printSearchResult);
