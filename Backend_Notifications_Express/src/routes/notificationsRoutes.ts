import { Router } from 'express';
 import { Likes } from '../controllers/Likes/likesController';
 import { Follow } from '../controllers/Follow/followController';
 import { orders } from '../controllers/Order/orderController';
import { deleted } from '../controllers/AdminDelete/deletedController';
import { purchased } from '../controllers/Premium/purchasedController';
 import { Expired } from '../controllers/Premium/ExpiredController';
import { Expiring } from '../controllers/Premium/ExpiringController';  
    import { General } from '../controllers/General/GeneralNotificacionController'; 


const router = Router();

 router.post('/Likes', Likes);
 router.post('/Follow', Follow);
 router.post('/Orders', orders);
 router.post('/Deleted', deleted);
 router.post('/Purchased', purchased);
 router.post('/Expired', Expired);
 router.post('/Expiring', Expiring);
 router.post('/General', General);

export default router;
