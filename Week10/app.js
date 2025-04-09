// app.js - Main Application Entry Point

// Import required modules
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import database connection
const connectDB = require('./config/db');

// Create Express application
const app = express();

// Connect to MongoDB
connectDB();

// Set up view engine (Handlebars)
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Simple logging middleware using callbacks
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`Request received: ${req.method} ${req.url}`);
  
  // Create a callback function to log after response is sent
  const originalSend = res.send;
  res.send = function(...args) {
    const duration = Date.now() - start;
    console.log(`Request completed: ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
    originalSend.apply(res, args);
  };
  
  next();
});

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Node.js Express MongoDB Demo',
    heading: 'Welcome to our Demo Application'
  });
});

// Import and use product routes
const productRoutes = require('./routes/products');
app.use('/products', productRoutes);

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).render('index', {
    title: 'Page Not Found',
    heading: '404 - Page Not Found',
    error: 'The page you are looking for does not exist.'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('index', {
    title: 'Server Error',
    heading: '500 - Server Error',
    error: 'Something went wrong on our end.'
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the application`);
});