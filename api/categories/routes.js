import express from 'express';
import CategoriesController from './controller';
import mdw from '../../middlewares/authentication';

const app = express();
app.get('/', [mdw.verifyToken], CategoriesController.Fetch);
app.get('/:id', [mdw.verifyToken], CategoriesController.FetchOne);
app.post('/', [mdw.verifyToken], CategoriesController.Create);
app.put('/:id', [mdw.verifyToken], CategoriesController.Update);
app.delete('/:id', [mdw.verifyToken], CategoriesController.Delete);

export default app;
