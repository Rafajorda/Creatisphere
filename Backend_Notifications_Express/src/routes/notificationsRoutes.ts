import { Router } from 'express';
 import { Likes } from '../controllers/notificationController';


const router = Router();

 router.post('/Likes', Likes);

export default router;
