import { Router } from 'express';
 import { Likes } from '../controllers/likesController';
 import { Follow } from '../controllers/followController';
 import { orders } from '../controllers/orderController';


const router = Router();

 router.post('/Likes', Likes);
 router.post('/Follow', Follow);
 router.post('/Orders', orders);

export default router;
