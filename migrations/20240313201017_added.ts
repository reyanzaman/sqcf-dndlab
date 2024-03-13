import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('posters', function (table) {
        table.integer('width');
        table.integer('height');
        table.string('for_whom');
        table.string('year');
        table.string('year_Bangla');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('posters', function (table) {
        table.dropColumn('width');
        table.dropColumn('height');
        table.dropColumn('for_whom');
        table.dropColumn('year');
        table.dropColumn('year_Bangla');
    });
}