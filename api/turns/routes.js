import express from 'express';
import TurnsController from './controller';
import mdw from '../../middlewares/authentication';

const app = express();
app.get('/:id', [mdw.verifyToken], TurnsController.FetchOne);
app.post('/', [mdw.verifyToken], TurnsController.Create);
app.put('/:id', [mdw.verifyToken], TurnsController.Update);
export default app;
