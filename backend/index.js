const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// ENV
const MONGO_USER = process.env.MONGO_USER || "admin";
const MONGO_PASS = process.env.MONGO_PASS || "yourpassword";
const MONGO_HOST = process.env.MONGO_HOST || "localhost";
const MONGO_DB = process.env.MONGO_DB || "merndb";

// MongoDB Connection
const uri = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:27017/${MONGO_DB}?authSource=admin`;

mongoose.connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Schema
const ItemSchema = new mongoose.Schema({
  name: String
});
const Item = mongoose.model('Item', ItemSchema);

// Health check (VERY IMPORTANT for K8s)
app.get('/health', (req, res) => {
  res.send('OK');
});

// Create item
app.post('/data', async (req, res) => {
  const item = new Item({ name: req.body.name });
  await item.save();
  res.json(item);
});

// Get items
app.get('/data', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.listen(5000, () => console.log("Server running on port 5000"));