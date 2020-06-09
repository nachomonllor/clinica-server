import express from 'express';
import authRoutes from './auth/routes';
import userRoutes from './users/routes';
import roleRoutes from './roles/routes';
import specialityRoutes from './specialities/routes';
import turnRoutes from './turns/routes';

const app = express();

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/role', roleRoutes);
app.use('/speciality', specialityRoutes);
app.use('/turn', turnRoutes);

export default app;
