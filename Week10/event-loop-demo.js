// event-loop-demo.js - Demonstrates Node.js event loop phases

console.log('===== EVENT LOOP DEMONSTRATION =====');

// Import required modules
const fs = require('fs');
const crypto = require('crypto');
const EventEmitter = require('events');

// Create custom event emitter
const myEmitter = new EventEmitter();

// 1. Demonstrating the execution order
console.log('\n1. EXECUTION ORDER DEMONSTRATION:');

// This executes immediately (synchronously)
console.log('1. Program Start - Main Execution Context');

// setTimeout - macrotask queue (Timer phase)
setTimeout(() => {
  console.log('2. setTimeout with 0ms delay (Timer phase)');
}, 0);

// setImmediate - runs in the Check phase, after I/O
setImmediate(() => {
  console.log('3. setImmediate callback (Check phase)');
});

// File operation - runs in the Poll phase (I/O)
fs.readFile(__filename, () => {
  console.log('4. fs.readFile callback (I/O Poll phase)');
  
  // Nested timer and immediate to demonstrate order within I/O callback
  setTimeout(() => {
    console.log('5. setTimeout inside I/O callback');
  }, 0);
  
  setImmediate(() => {
    console.log('6. setImmediate inside I/O callback');
  });
  
  // process.nextTick always runs before other phases
  process.nextTick(() => {
    console.log('7. process.nextTick inside I/O callback');
  });
});

// process.nextTick - runs after current operation, before next phase
process.nextTick(() => {
  console.log('8. process.nextTick (runs before next phase)');
});

// Promise resolution - microtask queue (similar to nextTick, but after all nextTicks)
Promise.resolve().then(() => {
  console.log('9. Promise.resolve (microtask queue)');
});

console.log('10. Program End - Main Execution Context');

// 2. Demonstrating CPU-bound operations and how they block the event loop
console.log('\n2. CPU-BOUND OPERATIONS:');

// Register an event listener
myEmitter.on('heavy-operation-complete', (duration) => {
  console.log(`Heavy operation completed in ${duration} milliseconds`);
});

console.log('Starting CPU-intensive operation...');
const startTime = Date.now();

// This is a CPU-intensive operation that will block the event loop
// In real applications, you'd want to avoid this or use worker threads
function blockingOperation() {
  // Perform expensive calculation
  crypto.pbkdf2Sync('password', 'salt', 100000, 512, 'sha512');
  return Date.now() - startTime;
}

// This will block the event loop
const duration = blockingOperation();

// This will only emit after the blocking operation completes
myEmitter.emit('heavy-operation-complete', duration);

console.log('CPU-intensive operation complete');

// 3. Demonstrating event emitters with async operations
console.log('\n3. EVENT EMITTER DEMONSTRATION:');

// Create a custom event emitter for a database simulator
class DatabaseSimulator extends EventEmitter {
  connect() {
    console.log('Connecting to database...');
    
    // Simulate async connection
    setTimeout(() => {
      // Connection successful, emit event
      this.emit('connected', { host: 'localhost', port: 27017 });
      
      // Simulate retrieving data
      setTimeout(() => {
        this.emit('data', [
          { id: 1, name: 'Product 1' },
          { id: 2, name: 'Product 2' }
        ]);
        
        // Simulate connection closed
        setTimeout(() => {
          this.emit('closed');
        }, 1000);
      }, 1000);
    }, 1000);
  }
}

const db = new DatabaseSimulator();

// Set up event listeners
db.on('connected', (connectionInfo) => {
  console.log(`DB Connected to ${connectionInfo.host}:${connectionInfo.port}`);
});

db.on('data', (data) => {
  console.log('Received data from database:', data);
});

db.on('closed', () => {
  console.log('Database connection closed');
});

// Start the connection process
db.connect();

// 4. Demonstrating event loop delays
console.log('\n4. TRACKING EVENT LOOP DELAY:');

let lastTime = Date.now();

// Check how long the event loop is delayed
function checkEventLoopDelay() {
  const now = Date.now();
  const delay = now - lastTime - 1000; // Expected delay is about 1000ms
  console.log(`Event loop delay: ${delay}ms`);
  lastTime = now;
  
  // Schedule the next check
  setTimeout(checkEventLoopDelay, 1000);
}

// Start checking event loop delay
setTimeout(checkEventLoopDelay, 1000);

console.log('\nNote: Event loop demonstration is running. Observe the order of execution...');