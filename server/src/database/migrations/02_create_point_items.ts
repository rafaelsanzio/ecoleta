import Knex from "knex";

// COMMIT
export async function up(knex: Knex) {
  return knex.schema.createTable("point_items", (table) => {
    table.integer("id").primary();
    table.integer("point_id").notNullable().references("in").inTable("points");
    table.integer("item_id").notNullable().references("in").inTable("items");
  });
}

//ROLLBACK
export async function down(knex: Knex) {
  return knex.schema.dropTable("point_items");
}
