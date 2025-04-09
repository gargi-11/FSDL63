// callback-demo.js - Demonstrates callback patterns in Node.js

console.log('===== CALLBACK DEMONSTRATION =====');

// Basic callback example
console.log('\n1. Basic Callback Example:');
function performTask(task, callback) {
  console.log(`Starting task: ${task}`);
  
  // Simulate an asynchronous operation
  setTimeout(() => {
    console.log(`Completed task: ${task}`);
    callback(null, `${task} result`);
  }, 1000);
}

performTask('Data Processing', (err, result) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Callback received result:', result);
  }
});

// Callback with error handling
console.log('\n2. Callback with Error Handling:');
function divideNumbers(a, b, callback) {
  console.log(`Attempting to divide ${a} by ${b}`);
  
  // Simulate processing time
  setTimeout(() => {
    if (b === 0) {
      callback(new Error('Division by zero is not allowed'));
    } else {
      callback(null, a / b);
    }
  }, 1500);
}

// Success case
divideNumbers(10, 2, (err, result) => {
  if (err) {
    console.error('Error occurred:', err.message);
  } else {
    console.log('Division result:', result);
  }
});

// Error case
divideNumbers(10, 0, (err, result) => {
  if (err) {
    console.error('Error occurred:', err.message);
  } else {
    console.log('Division result:', result);
  }
});

// Callback hell example
console.log('\n3. Callback Hell Example:');
function step1(data, callback) {
  console.log('Step 1 processing:', data);
  setTimeout(() => callback(null, `${data} - step 1 processed`), 500);
}

function step2(data, callback) {
  console.log('Step 2 processing:', data);
  setTimeout(() => callback(null, `${data} - step 2 processed`), 500);
}

function step3(data, callback) {
  console.log('Step 3 processing:', data);
  setTimeout(() => callback(null, `${data} - step 3 processed`), 500);
}

// Demonstrate callback hell (nested callbacks)
step1('Initial data', (err, step1Result) => {
  if (err) {
    console.error('Step 1 error:', err);
    return;
  }
  
  step2(step1Result, (err, step2Result) => {
    if (err) {
      console.error('Step 2 error:', err);
      return;
    }
    
    step3(step2Result, (err, step3Result) => {
      if (err) {
        console.error('Step 3 error:', err);
        return;
      }
      
      console.log('Final result:', step3Result);
    });
  });
});

// Solution to callback hell using named functions
console.log('\n4. Solving Callback Hell with Named Functions:');
function processData(initialData) {
  console.log('Starting data processing pipeline...');
  
  step1(initialData, step1Callback);
  
  function step1Callback(err, step1Result) {
    if (err) {
      console.error('Step 1 error:', err);
      return;
    }
    step2(step1Result, step2Callback);
  }
  
  function step2Callback(err, step2Result) {
    if (err) {
      console.error('Step 2 error:', err);
      return;
    }
    step3(step2Result, step3Callback);
  }
  
  function step3Callback(err, step3Result) {
    if (err) {
      console.error('Step 3 error:', err);
      return;
    }
    console.log('Data processing complete! Final result:', step3Result);
  }
}

processData('New initial data');

// Callbacks with file operations
console.log('\n5. File System Callbacks:');
const fs = require('fs');

// Write file with callback
fs.writeFile('demo-file.txt', 'This is a demonstration of Node.js callbacks', (writeErr) => {
  if (writeErr) {
    console.error('Error writing file:', writeErr);
    return;
  }
  
  console.log('File was written successfully!');
  
  // Read file with callback
  fs.readFile('demo-file.txt', 'utf8', (readErr, data) => {
    if (readErr) {
      console.error('Error reading file:', readErr);
      return;
    }
    
    console.log('File contents:', data);
    
    // Delete file with callback
    fs.unlink('demo-file.txt', (unlinkErr) => {
      if (unlinkErr) {
        console.error('Error deleting file:', unlinkErr);
        return;
      }
      
      console.log('File was deleted successfully!');
    });
  });
});

console.log('\nNote: Asynchronous operations are still running...');