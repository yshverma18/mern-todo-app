import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Schema & Model
const ItemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Item", ItemSchema);

// CRUD routes
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

// Connect to MongoDB Atlas & start server
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI; // put your Atlas URI in .env

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`)))
  .catch((err) => console.error("MongoDB connection error:", err));
