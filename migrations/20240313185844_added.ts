import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // Add createdAt and updatedAt to the BookCover table
    await knex.schema.alterTable('book_covers', table => {
        table.dateTime('createdAt').defaultTo(knex.fn.now());
        table.dateTime('updatedAt').defaultTo(knex.fn.now());
    });

    // Add createdAt and updatedAt to the Poster table
    await knex.schema.alterTable('posters', table => {
        table.dateTime('createdAt').defaultTo(knex.fn.now());
        table.dateTime('updatedAt').defaultTo(knex.fn.now());
    });

    // Add createdAt and updatedAt to the IllustrationCard table
    await knex.schema.alterTable('illustration_cards', table => {
        table.dateTime('createdAt').defaultTo(knex.fn.now());
        table.dateTime('updatedAt').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    // Remove createdAt and updatedAt from the IllustrationCard table
    await knex.schema.alterTable('illustration_cards', table => {
        table.dropColumn('createdAt');
        table.dropColumn('updatedAt');
    });

    // Remove createdAt and updatedAt from the Poster table
    await knex.schema.alterTable('posters', table => {
        table.dropColumn('createdAt');
        table.dropColumn('updatedAt');
    });

    // Remove createdAt and updatedAt from the BookCover table
    await knex.schema.alterTable('book_covers', table => {
        table.dropColumn('createdAt');
        table.dropColumn('updatedAt');
    });
}
