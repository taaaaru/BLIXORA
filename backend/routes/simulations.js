import express from "express";
import { auth, adminOnly } from "../middleware/auth.js";
import { body } from "express-validator";
import validate from "../middleware/validate.js";
import Simulation from "../models/Simulation.js";

const router = express.Router();

// =================== Public: get all simulations ===================
router.get("/", async (req, res) => {
  try {
    const { level, category, q } = req.query;
    const filter = {};
    if (level) filter.level = level;
    if (category) filter.category = category;
    if (q) filter.title = { $regex: q, $options: "i" };

    const sims = await Simulation.find(filter).sort({ createdAt: -1 });
    res.json(sims);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// =================== Admin: create simulation ===================
router.post(
  "/",
  auth,
  adminOnly,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("level").notEmpty().withMessage("Level is required"),
  ],
  validate,
  async (req, res) => {
    try {
      const sim = new Simulation(req.body);
      await sim.save();
      res.json(sim);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

// =================== Admin: update simulation ===================
router.put("/:id", auth, adminOnly, async (req, res) => {
  try {
    const { title, category, level } = req.body;
    const sim = await Simulation.findByIdAndUpdate(
      req.params.id,
      { title, category, level },
      { new: true }
    );

    if (!sim) return res.status(404).json({ message: "Simulation not found" });
    res.json(sim);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// =================== Admin: delete simulation ===================
router.delete("/:id", auth, adminOnly, async (req, res) => {
  try {
    const sim = await Simulation.findByIdAndDelete(req.params.id);
    if (!sim) return res.status(404).json({ message: "Simulation not found" });
    res.json({ message: "Deleted", sim });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;
