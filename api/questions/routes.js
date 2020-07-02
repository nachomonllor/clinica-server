import express from 'express';
import QuestionsController from './controller';
import mdw from '../../middlewares/authentication';

const app = express();
app.get('/', [mdw.verifyToken], QuestionsController.Fetch);
app.get('/:id', [mdw.verifyToken], QuestionsController.FetchOne);
app.post('/', [mdw.verifyToken], QuestionsController.Create);
app.put('/:id', [mdw.verifyToken], QuestionsController.Update);
app.delete('/:id', [mdw.verifyToken], QuestionsController.Delete);
export default app;
