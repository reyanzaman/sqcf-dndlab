import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("illustrations_cards", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("title");
        table.string("title_Bangla");
        table.string("subtitle");
        table.string("subtitle_Bangla");
        table.string("publisher");
        table.string("publisher_Bangla");
        table.string("year");
        table.string("year_Bangla");
        table.string("imageUrl");
        table.text("description");
        table.specificType('tags', 'text[]').defaultTo('{}');
        table.specificType('tags_Bangla', 'text[]').defaultTo('{}');
        table.dateTime('createdAt').defaultTo(knex.fn.now());
        table.dateTime('updatedAt').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("illustrations_cards");
}
