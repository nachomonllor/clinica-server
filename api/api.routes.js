import express from 'express';
import authRoutes from './auth/routes';
import userRoutes from './users/routes';
import roleRoutes from './roles/routes';
import categoryRoutes from './categories/routes';
import appointmentRoutes from './appointments/routes';
import scheduleRoutes from './schedules/routes';
const app = express();

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/role', roleRoutes);
app.use('/category', categoryRoutes);
app.use('/appointment', appointmentRoutes);
app.use('/schedule', scheduleRoutes);
export default app;
