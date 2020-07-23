import express from 'express';
import StatisticsController from './controller';
import mdw from '../../middlewares/authentication';

const app = express();
app.get('/', [mdw.verifyToken], StatisticsController.Fetch);


export default app;
