import express from 'express';
import SettingsController from './controller';
import mdw from '../../middlewares/authentication';

const app = express();
app.get('/', [mdw.verifyToken], SettingsController.Fetch);
app.put('/:id', [mdw.verifyToken], SettingsController.Update);
export default app;
