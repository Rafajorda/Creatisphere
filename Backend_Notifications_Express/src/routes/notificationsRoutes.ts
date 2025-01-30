import { Router } from 'express';
 import { Likes } from '../controllers/likesController';
 import { Follow } from '../controllers/followController';
 import { orders } from '../controllers/orderController';
import { deleted } from '../controllers/deletedController';
import { purchased } from '../controllers/Premium/purchasedController';
 import { Expired } from '../controllers/Premium/ExpiredController';
import { Expiring } from '../controllers/Premium/ExpiringController';   


const router = Router();

 router.post('/Likes', Likes);
 router.post('/Follow', Follow);
 router.post('/Orders', orders);
 router.post('/Deleted', deleted);
 router.post('/Purchased', purchased);
  router.post('/Expired', Expired);
 router.post('/Expiring', Expiring);

export default router;
