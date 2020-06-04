import express from 'express';
import mdw from '../../middlewares/authentication';
import UsersController from './controller';

const app = express();
app.get('/', [mdw.verifyToken], UsersController.Fetch);
app.get('/:id', [mdw.verifyToken], UsersController.FetchOne);
app.post('/', UsersController.Create);
app.put('/:id', UsersController.Update);
app.delete('/:id', UsersController.Delete);

export default app;
