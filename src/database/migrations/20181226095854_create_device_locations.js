exports.up = async (knex) => {
  await knex.schema.createTable('device_locations', (table) => {
    table.increments('id').primary();
    table.integer('device_id').unsigned().references('devices.id');
    
    table.decimal('latitude', 10, 8);
    table.decimal('longitude', 11, 8);
    
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('device_locations');
};
