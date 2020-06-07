import Knek from 'knex';

export async function up(knex: Knek){
    //Criar tabela no banco
    return knex.schema.createTable ('points', table=>{
            table.increments('id').primary(),
            table.string('image').notNullable(),
            table.string('name').notNullable(),
            table.string('email').notNullable(),
            table.string('whatsapp').notNullable(),
            table.decimal('latitude').notNullable(),
            table.decimal('longtude').notNullable(),
            table.string('city').notNullable(),
            table.string('uf', 2).notNullable()
        });
}

export async function down(kenex: Knek){
    //Rollback do que foi feito no UP
    return kenex.schema.dropTable('points');
}