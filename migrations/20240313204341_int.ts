import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('posters', function (table) {
        table.float('width').alter();
        table.float('height').alter();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('posters', function (table) {
        table.integer('width').alter();
        table.integer('height').alter();
    });
}