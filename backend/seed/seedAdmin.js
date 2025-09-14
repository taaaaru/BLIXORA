require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
(async () => {
  try {
    await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/blixora');
    const email = 'admin@blixoralabs.dev';
    let admin = await User.findOne({ email });
    if (admin) {
      console.log('Admin already exists');
      process.exit(0);
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('Admin@123', salt);
    admin = new User({ name: 'Admin', email, passwordHash, role: 'admin' });
    await admin.save();
    console.log('Admin created: email=admin@blixoralabs.dev password=Admin@123');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
