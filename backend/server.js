require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const simRoutes = require('./routes/simulations');
const enrollRoutes = require('./routes/enrollments');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));

// Connect DB
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/blixora');

app.use('/api/auth', authRoutes);
app.use('/api/simulations', simRoutes);
app.use('/api/enrollments', enrollRoutes);

app.get('/', (req, res) => res.send('Blixora Labs API'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
