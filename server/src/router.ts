import express, { Router } from 'express';
import { controller } from './controller';

const router: Router = express.Router();

router.get('/meals', controller.getAll);
router.post('/ai-generate', controller.postAI);
router.get('/meals/:id', controller.getOne);
router.put('/meals/:id', controller.updateOne);
router.delete('/meals/:id', controller.deleteOne);

export default router;
