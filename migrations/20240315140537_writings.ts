import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    // Create the Writings table
    await knex.schema.createTable('writings', table => {
        table.uuid('id').primary();
        table.string('title');
        table.string('title_Bangla');
        table.string('writer');
        table.string('writer_Bangla');
        table.string('category');
        table.string('type');
        table.string('day');
        table.string('day_Bangla');
        table.string('month');
        table.string('month_Bangla');
        table.string('year');
        table.string('year_Bangla');
        table.string('imageUrl');
        table.string('imageAlt');
        table.text('text');
        table.specificType('tags', 'text[]');
        table.specificType('tags_Bangla', 'text[]');
        table.dateTime('createdAt').defaultTo(knex.fn.now());
        table.dateTime('updatedAt').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    // Drop the newly added table
    await knex.schema.dropTable('illustration_cards');
}

