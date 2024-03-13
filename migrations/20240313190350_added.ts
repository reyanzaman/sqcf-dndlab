import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('book_covers', table => {
        table.dropColumn('updated_at');
        table.dropColumn('created_at');
    });

    await knex.schema.table('posters', table => {
        table.dropColumn('updated_at');
        table.dropColumn('created_at');
    });

    await knex.schema.table('illustration_cards', table => {
        table.dropColumn('updated_at');
        table.dropColumn('created_at');
    });
}


export async function down(knex: Knex): Promise<void> {
}

