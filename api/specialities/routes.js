import express from 'express';
import SpecialitiesController from './controller';
import mdw from '../../middlewares/authentication';

const app = express();
app.get('/', [mdw.verifyToken], SpecialitiesController.Fetch);
app.get('/:id', [mdw.verifyToken], SpecialitiesController.FetchOne);
app.post('/', [mdw.verifyToken], SpecialitiesController.Create);
app.put('/:id', [mdw.verifyToken], SpecialitiesController.Update);
app.delete('/:id', [mdw.verifyToken], SpecialitiesController.Delete);

export default app;
