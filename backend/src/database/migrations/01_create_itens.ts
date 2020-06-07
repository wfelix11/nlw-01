import Knek from 'knex';

export async function up(knex: Knek){
    //Criar tabela no banco
    return knex.schema.createTable ('itens', table=>{
            table.increments('id').primary(),
            table.string('image').notNullable(),
            table.string('title').notNullable()
        });
}

export async function down(kenex: Knek){
    //Rollback do que foi feito no UP
    return kenex.schema.dropTable('itens');
}