import express from 'express';
import ReviewController from './controller';
import auth from '../../middlewares/authentication';

const app = express();
app.get('/:id', [auth.verifyToken], ReviewController.FetchOne);
app.put('/:id', [auth.verifyToken], ReviewController.Update);
export default app;
