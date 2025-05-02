// app.js - Main Express Application
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const shortid = require('shortid');
const { isURL } = require('validator');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/urlShortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// URL Schema
const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true
  },
  shortCode: {
    type: String,
    required: true,
    unique: true
  },
  clicks: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Url = mongoose.model('Url', urlSchema);

// API Routes
app.post('/api/shorten', async (req, res) => {
  const { longUrl } = req.body;

  // Validate URL
  if (!isURL(longUrl)) {
    return res.status(400).json({ error: 'Please enter a valid URL' });
  }

  try {
    // Check if URL already exists in database
    let url = await Url.findOne({ longUrl });

    if (url) {
      return res.json({
        success: true,
        shortCode: url.shortCode,
        shortUrl: `${req.protocol}://${req.get('host')}/${url.shortCode}`
      });
    }

    // Create new short URL
    const shortCode = shortid.generate();
    
    url = new Url({
      longUrl,
      shortCode
    });

    await url.save();

    res.json({
      success: true,
      shortCode,
      shortUrl: `${req.protocol}://${req.get('host')}/${shortCode}`
    });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Redirect route
app.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });

    if (!url) {
      return res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
    }

    // Increment click count
    url.clicks++;
    await url.save();

    return res.redirect(url.longUrl);
  } catch (err) {
    console.error('Error on redirect:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get URL stats
app.get('/api/stats/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.json({
      longUrl: url.longUrl,
      shortCode: url.shortCode,
      clicks: url.clicks,
      createdAt: url.createdAt
    });
  } catch (err) {
    console.error('Error getting stats:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get recent URLs (limited to 10)
app.get('/api/recent', async (req, res) => {
  try {
    const urls = await Url.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('-__v');
    
    res.json(urls);
  } catch (err) {
    console.error('Error getting recent URLs:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));