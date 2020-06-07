import Knek from 'knex';

export async function up(knex: Knek){
    //Criar tabela no banco
    return knex.schema.createTable ('point_intems', table=>{
            table.increments('id').primary(),

            table.integer('point_id')
                .notNullable()
                .references('id')
                .inTable('points'),

            table.integer('item_id')
                .notNullable()
                .references('id')
                .inTable('intens')
        });
}

export async function down(kenex: Knek){
    //Rollback do que foi feito no UP
    return kenex.schema.dropTable('point_intems');
}