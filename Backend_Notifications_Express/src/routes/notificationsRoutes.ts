import { Router } from 'express';
 import { Likes } from '../controllers/likesController';
 import { Follow } from '../controllers/followController';


const router = Router();

 router.post('/Likes', Likes);
 router.post('/Follow', Follow);

export default router;
