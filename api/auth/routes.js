import express from 'express';
import AuthController from './controller';

const app = express();

app.post('/', AuthController.Login);
app.get('/renewtoken', AuthController.RenewToken);
app.put('/verify/:id', AuthController.Verify);
export default app;
