
    import express, { Request, Response, NextFunction } from 'express';
    import cors from 'cors';
    import dotenv from 'dotenv'; 
    import notificationsRoutes from './routes/notificationsRoutes';
    dotenv.config();
    const corsOptions = {
        origin: process.env.CORSURL, 
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        optionsSuccessStatus: 200
    };
    const app = express();
    app.use(cors(corsOptions));
   
    app.use(express.json());
    app.options('*', cors(corsOptions));   
    app.use('/api', notificationsRoutes); 
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500).send('Algo salió mal!');
    });

    const PORT = process.env.PORT || 3001;

    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });



