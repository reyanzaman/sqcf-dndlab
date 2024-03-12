import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // Drop the artist column from the Art table
    await knex.schema.table('arts', table => {
        table.dropColumn('artist');
    });

    // Create the BookCover table
    await knex.schema.createTable('book_covers', table => {
        table.uuid('id').primary();
        table.string('title').notNullable();
        table.string('title_Bangla');
        table.string('author').notNullable();
        table.string('author_Bangla');
        table.string('publisher').notNullable();
        table.string('publisher_Bangla');
        table.date('date');
        table.string('date_Bangla');
        table.string('imageUrl');
        table.text('description');
        table.string('publication');
        table.string('type');
        table.string('type_Bangla');
        table.jsonb('tags').defaultTo('[]');
        table.jsonb('tags_Bangla').defaultTo('[]');
        table.timestamps(true, true);
    });


    // Create the Poster table
    await knex.schema.createTable('posters', table => {
        table.uuid('id').primary();
        table.string('title').notNullable();
        table.string('title_Bangla');
        table.string('imageUrl');
        table.text('description');
        table.string('category');
        table.jsonb('tags').defaultTo('[]');
        table.jsonb('tags_Bangla').defaultTo('[]');
        table.timestamps(true, true);
    });


    // Create the IllustrationCard table
    await knex.schema.createTable('illustration_cards', table => {
        table.uuid('id').primary();
        table.string('title').notNullable();
        table.string('title_Bangla');
        table.string('subtitle');
        table.string('subtitle_Bangla');
        table.string('publisher').notNullable();
        table.string('publisher_Bangla');
        table.date('year');
        table.string('year_Bangla');
        table.string('imageUrl');
        table.text('description');
        table.jsonb('tags').defaultTo('[]');
        table.jsonb('tags_Bangla').defaultTo('[]');
        table.timestamps(true, true);
    });

}

export async function down(knex: Knex): Promise<void> {
    // Re-add the artist column to the Art table
    await knex.schema.table('arts', table => {
        table.string('artist'); // Adjust the column type as needed
    });

    // Drop the newly added tables
    await knex.schema.dropTable('illustration_cards');
    await knex.schema.dropTable('posters');
    await knex.schema.dropTable('book_covers');
}
