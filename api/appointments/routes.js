import express from 'express';
import AppointmentsController from './controller';
import mdw from '../../middlewares/authentication';

const app = express();
app.get('/', [mdw.verifyToken], AppointmentsController.Fetch);
app.post('/', [mdw.verifyToken], AppointmentsController.Create);
app.put('/:id', [mdw.verifyToken], AppointmentsController.Update);
app.delete('/:id', [mdw.verifyToken], AppointmentsController.Delete);
export default app;
