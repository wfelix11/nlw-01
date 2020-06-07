import { Request, Response } from 'express';
import knex from '../database/connection';

class pointsController {

    async index (req: Request, res: Response){
        const { city, uf, items } = req.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const point = await knex('points')
            .join('point_intems', 'points.id', '=', 'point_intems.point_id')
            .whereIn('point_intems.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

            const serializePoints = point.map(point=>{
                return { 
                    ...point, 
                    image_url: `http://localhost:3333/uploads/${point.image}`
                }
            })
        

        return res.json(serializePoints);
    }

    

    async show (req: Request, res: Response) {
        const { id } = req.params;

        const point = await knex('points').where('id', id).first();

        if(!point){
            return res.status(400).json({ message: 'Point not found!' });
        }

        const serializePoint = { 
                ...point, 
                image_url: `http://localhost:3333/uploads/${point.image}`
            }

    

        const item = await knex('itens')
                        .join('point_intems', 'itens.id', '=', 'point_intems.item_id')
                        .where('point_intems.point_id', id)
                        .select('title')

        return res.json({ point: serializePoint, item });

    }


    async create (req: Request, res: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longtude,
            city,
            uf,
            itens } = req.body
    
        const trx = await knex.transaction();
    
        const point = {
            image: req.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longtude,
            city,
            uf
        }

        

        const insertedId = await trx('points').insert(point);

        const point_id = insertedId[0]
        
        const pointItens = itens
        .split(',')
        .map((item: string)=> Number(item.trim()))
        .map((item_id: Number) => {
            return {
                item_id,
                point_id
            };
        })
        
        console.log(pointItens)
        await trx('point_intems').insert(pointItens);
    
        await trx.commit();

        return res.json({ 
            id: point_id,
            ...point
         }); 
    }
}

export default pointsController;