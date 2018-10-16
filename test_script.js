const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const name = process.argv[2];

function searchByName(name, callback) {
  console.log('Searching ...');
  client.query("SELECT * FROM famous_people WHERE LOWER(first_name) = LOWER($1) OR LOWER(last_name) = LOWER($1)", [name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    callback(result);
  });
}

function printSearchResult (result) {
  const persons = result.rows;
  let i = 1;
  if (persons.length > 0) {
    console.log(`Found ${persons.length} person(s) by the name '${name}':`);
    for (let person of persons){
      console.log(`- ${i}: ${person.first_name} ${person.last_name}, born ${person.birthdate.getUTCFullYear()}-${person.birthdate.getMonth()}-${person.birthdate.getDate()}`);
      i ++;
    }
  } else{
    console.log(`Did not find any person by the name '${name}'.`);
  }
}


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  searchByName(name, printSearchResult);
});