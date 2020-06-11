import express from 'express';
import TurnsController from './controller';
import mdw from '../../middlewares/authentication';

const app = express();
app.get('/', [mdw.verifyToken], TurnsController.Fetch);
app.post('/', [mdw.verifyToken], TurnsController.Create);
app.put('/:id', [mdw.verifyToken], TurnsController.Update);
export default app;
