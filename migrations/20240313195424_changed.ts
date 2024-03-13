import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // Update the columns in the BookCover table
    await knex.schema.alterTable('book_covers', function (table) {
        table.dropColumn('date');

    });
    await knex.schema.alterTable('book_covers', function (table) {
        table.string('date');
    });

    // Update the columns in the IllustrationCard table
    await knex.schema.alterTable('illustration_cards', function (table) {
        table.dropColumn('year');
    });
    await knex.schema.alterTable('illustration_cards', function (table) {
        table.string('year');
    });
}

export async function down(knex: Knex): Promise<void> {

}
