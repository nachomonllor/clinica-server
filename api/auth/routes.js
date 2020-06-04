import express from 'express';
import AuthController from './controller';

const app = express();

app.post('/', AuthController.Login);
app.get('/renewtoken', AuthController.RenewToken);

export default app;