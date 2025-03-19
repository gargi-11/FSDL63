import React from 'react';

function Home() {
  return (
    <div style={styles.container}>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of our amazing website.</p>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
};

export default Home;