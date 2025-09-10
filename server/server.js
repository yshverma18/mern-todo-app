import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load local .env file

const app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*"
}));
app.use(express.json());

// --- Debugging logs ---
console.log("=== ENVIRONMENT DEBUG ===");
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "LOADED ✅" : "MISSING ❌");
console.log("MONGO_URI:", process.env.MONGO_URI ? "LOADED ✅" : "MISSING ❌");
console.log("PORT:", process.env.PORT || "Using default 5000");
console.log("========================");

// --- Config ---
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI || process.env.MONGO_URI; // fallback support

// --- Schema & Model ---
const ItemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Item", ItemSchema);

// --- Routes ---
app.get("/api/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.get("/api/items/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
});

app.post("/api/items", async (req, res) => {
  const newItem = new Item({ name: req.body.name });
  await newItem.save();
  res.json(newItem);
});

app.put("/api/items/:id", async (req, res) => {
  const updated = await Item.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  res.json(updated);
});

app.delete("/api/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// --- MongoDB connection ---
if (!URI) {
  console.error("❌ No MongoDB URI found in environment variables!");
  process.exit(1);
}

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
