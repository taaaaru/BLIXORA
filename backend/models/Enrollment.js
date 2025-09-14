const mongoose = require('mongoose');
const EnrollmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  simulationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Simulation', required: true },
  status: { type: String, enum: ['enrolled','in-progress','completed'], default: 'enrolled' }
}, { timestamps: true });
module.exports = mongoose.model('Enrollment', EnrollmentSchema);
