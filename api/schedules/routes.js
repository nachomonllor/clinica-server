import express from 'express';
import SchedulesController from './controller';
import mdw from '../../middlewares/authentication';

const app = express();
app.get('/', [mdw.verifyToken], SchedulesController.Fetch);
app.put('/:id', [mdw.verifyToken], SchedulesController.Update);
export default app;
