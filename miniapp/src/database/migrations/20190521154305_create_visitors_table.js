exports.up = function(knex, Promise) {
  return knex.schema.hasTable('visitors').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('visitors', function(table) {
        table.increments('id').unsigned().primary();
        table.string('ip', 45).notNull();
        table.dateTime('created_at').notNull();
        table.dateTime('updated_at').nullable();
        table.dateTime('deleted_at').nullable();
      });
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.hasTable('visitors').then(function(exists) {
    if (exists) {
      return knex.schema.dropTable('visitors');
    }
  });
};
