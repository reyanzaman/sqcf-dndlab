import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('writings', function (table) {
        table.string('subtitle');
        table.string('subtitle_Bangla');
        table.string('publisher');
        table.string('publisher_Bangla');
        table.string('link');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('writings', function (table) {
        table.dropColumn('subtitle');
        table.dropColumn('subtitle_Bangla');
        table.dropColumn('publisher');
        table.dropColumn('publisher_Bangla');
        table.dropColumn('link');
    });
}