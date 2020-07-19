import express from 'express';
import SurveyController from './controller';
import mdw from '../../middlewares/authentication';

const app = express();
app.put('/:id', [mdw.verifyToken], SurveyController.Update);

export default app;
