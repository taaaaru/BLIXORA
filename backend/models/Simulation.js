import mongoose from "mongoose";
const SimulationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    duration: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

const Simulation = mongoose.model("Simulation", SimulationSchema);
export default Simulation;
