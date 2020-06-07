import express from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import ItensController from './controllers/ItensController';
import PointsControlles from './controllers/PointsController';


const router = express.Router();
const upload = multer(multerConfig);


const itensController = new ItensController();
const pointsController = new PointsControlles();

router.get('/itens', itensController.index);

router.post('/points', upload.single('image'), pointsController.create);

router.get('/points', pointsController.index);
router.get('/points/:id', pointsController.show);



export default router;