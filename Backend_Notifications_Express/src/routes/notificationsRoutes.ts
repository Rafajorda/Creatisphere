import { Router } from 'express';
 import { Likes } from '../controllers/likesController';


const router = Router();

 router.post('/Likes', Likes);

export default router;
