// Simple URL Shortener API with MongoDB
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/urlShortener');

// URL Schema
const urlSchema = new mongoose.Schema({
  longUrl: String,
  shortCode: String,
  createdAt: { type: Date, default: Date.now }
});

const Url = mongoose.model('Url', urlSchema);

// Shorten URL endpoint
app.post('/api/shorten', async (req, res) => {
  const { longUrl } = req.body;
  
  // Generate a random code
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let shortCode = '';
  for (let i = 0; i < 6; i++) {
    shortCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  // Save to database
  const url = new Url({
    longUrl,
    shortCode
  });
  
  await url.save();
  
  // Return the short URL
  res.json({
    success: true,
    shortUrl: `${req.protocol}://${req.get('host')}/${shortCode}`
  });
});

// Redirect endpoint
app.get('/:code', async (req, res) => {
  const url = await Url.findOne({ shortCode: req.params.code });
  
  if (url) {
    return res.redirect(url.longUrl);
  } else {
    return res.status(404).send('URL not found');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));