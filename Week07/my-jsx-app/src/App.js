import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import UserList from './components/UserList';

function App() {
  return (
    <Router>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/about" style={styles.link}>About</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>
        <Link to="/users" style={styles.link}>Users</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>
  );
}

const styles = {
  nav: {
    backgroundColor: '#333',
    padding: '10px',
    textAlign: 'center',
  },
  link: {
    color: '#fff',
    margin: '0 10px',
    textDecoration: 'none',
  },
};

export default App;