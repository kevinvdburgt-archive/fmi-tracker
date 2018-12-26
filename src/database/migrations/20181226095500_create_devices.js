exports.up = async (knex) => {
  await knex.schema.createTable('devices', (table) => {
    table.increments('id').primary();
    table.string('uuid');
    table.string('model');
    table.string('name');

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('devices');
};
