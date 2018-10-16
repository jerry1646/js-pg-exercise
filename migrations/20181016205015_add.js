
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', function(table){
      table.dropPrimary();
      table.dropColumn('id');
      // table.increments('id').primary();
      table.integer('famous_people_id');
      table.foreign('famous_people_id').references('famous_people.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', function(table){
      table.increments('id');
      // Add primary?
      table.dropColumn('famous_people_id');
      table.dropForeign('famous_people_id');
    })
  ]);
};
