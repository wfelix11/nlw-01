import Knex, { KnexTimeoutError } from 'knex';

export async function seed (knex: Knex) {
    await knex('itens').insert([
        {title: 'Lâmpadas', image:'lampadas.svg'},
        {title: 'Pilhas e baterias', image:'baterias.svg'},
        {title: 'Papéis e papelão', image:'papeis-papelao.svg'},
        {title: 'Resíduos Eletrônicos', image:'eletronicos.svg'},
        {title: 'Resíduos Orgânicos', image:'organico.svg'},
        {title: 'Óleo de cozinha', image:'oleo.svg'}
    ]);
}