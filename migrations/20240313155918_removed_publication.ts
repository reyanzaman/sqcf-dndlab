import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('book_covers', table => {
        table.dropColumn('publication');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('book_covers', table => {
        table.string('publication'); // Adjust the column type as needed
    });
}

