exports.up = function(knex) {
  return knex.schema
    .createTable('secret', function(table) {
      table.increments('id').primary();
      table.string('text').notNull();
    })

};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('secret')
};
