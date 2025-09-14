import mongoose from "mongoose";
import dotenv from "dotenv";
import { Simulation } from "./models/Simulation.js";

dotenv.config();

const simulations = [
  {
    title: "Bubble Sort Simulator",
    description: "Visualize Bubble Sort step by step.",
    category: "Sorting Algorithms",
  },
  {
    title: "Binary Search Simulator",
    description: "Learn how binary search works.",
    category: "Searching Algorithms",
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Simulation.deleteMany(); // clears old data
    await Simulation.insertMany(simulations);
    console.log("Database seeded!");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
