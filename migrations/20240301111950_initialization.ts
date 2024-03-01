import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('arts', table => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('title');
        table.string('title_Bangla');
        table.string('artist');
        table.string('year');
        table.string('imageUrl');
        table.text('description');
        table.integer('width');
        table.integer('height');
        table.string('Medium');
        table.string('Medium_Bangla');
        table.string('type');
        table.specificType('tags', 'text[]');
        table.specificType('tags_Bangla', 'text[]');
        table.dateTime('createdAt').defaultTo(knex.fn.now());
        table.dateTime('updatedAt').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('arts');
}