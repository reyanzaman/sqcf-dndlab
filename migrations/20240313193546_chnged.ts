import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // Update the columns in the BookCover table
    await knex.schema.alterTable('book_covers', function (table) {
        table.dropColumn('tags');
        table.dropColumn('tags_Bangla');
    });
    await knex.schema.alterTable('book_covers', function (table) {
        table.specificType('tags', 'text[]').defaultTo('{}');
        table.specificType('tags_Bangla', 'text[]').defaultTo('{}');
    });

    // Update the columns in the Poster table
    await knex.schema.alterTable('posters', function (table) {
        table.dropColumn('tags');
        table.dropColumn('tags_Bangla');
    });
    await knex.schema.alterTable('posters', function (table) {
        table.specificType('tags', 'text[]').defaultTo('{}');
        table.specificType('tags_Bangla', 'text[]').defaultTo('{}');
    });

    // Update the columns in the IllustrationCard table
    await knex.schema.alterTable('illustration_cards', function (table) {
        table.dropColumn('tags');
        table.dropColumn('tags_Bangla');
    });
    await knex.schema.alterTable('illustration_cards', function (table) {
        table.specificType('tags', 'text[]').defaultTo('{}');
        table.specificType('tags_Bangla', 'text[]').defaultTo('{}');
    });
}

export async function down(knex: Knex): Promise<void> {
    // Since we're simply reversing the 'up' process,
    // drop the newly added text[] columns
    // and add back the jsonb columns with no data.

    // For BookCover table
    await knex.schema.alterTable('book_covers', function (table) {
        table.dropColumn('tags');
        table.dropColumn('tags_Bangla');
    });
    await knex.schema.alterTable('book_covers', function (table) {
        table.jsonb('tags').defaultTo('[]');
        table.jsonb('tags_Bangla').defaultTo('[]');
    });

    // For Poster table
    await knex.schema.alterTable('posters', function (table) {
        table.dropColumn('tags');
        table.dropColumn('tags_Bangla');
    });
    await knex.schema.alterTable('posters', function (table) {
        table.jsonb('tags').defaultTo('[]');
        table.jsonb('tags_Bangla').defaultTo('[]');
    });

    // For IllustrationCard table
    await knex.schema.alterTable('illustration_cards', function (table) {
        table.dropColumn('tags');
        table.dropColumn('tags_Bangla');
    });
    await knex.schema.alterTable('illustration_cards', function (table) {
        table.jsonb('tags').defaultTo('[]');
        table.jsonb('tags_Bangla').defaultTo('[]');
    });
}
