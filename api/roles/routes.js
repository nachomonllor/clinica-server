import express from 'express';
import RolesController from './controller';
import mdw from '../../middlewares/authentication';

const app = express();
app.get('/', [mdw.verifyToken], RolesController.Fetch);
app.get('/:id', [mdw.verifyToken], RolesController.FetchOne);
app.post('/', [mdw.verifyToken], RolesController.Create);
app.put('/:id', [mdw.verifyToken], RolesController.Update);
app.delete('/:id', [mdw.verifyToken], RolesController.Delete);
export default app;
