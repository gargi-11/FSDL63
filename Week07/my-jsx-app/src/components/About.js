import React from 'react';

function About() {
  return (
    <div style={styles.container}>
      <h1>About Us</h1>
      <p>We are a team of developers building amazing websites.</p>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
};

export default About;