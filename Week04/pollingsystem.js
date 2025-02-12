// Store the votes in an object
let pollResults = {
  Red: 0,
  Blue: 0,
  Green: 0,
  Yellow: 0
};

// Update the vote counts displayed on the page
function updateResults() {
  document.getElementById('redVotes').textContent = 'Red: ' + pollResults.Red + ' votes';
  document.getElementById('blueVotes').textContent = 'Blue: ' + pollResults.Blue + ' votes';
  document.getElementById('greenVotes').textContent = 'Green: ' + pollResults.Green + ' votes';
  document.getElementById('yellowVotes').textContent = 'Yellow: ' + pollResults.Yellow + ' votes';
}

// Handle form submission
document.getElementById('pollForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting and refreshing the page

  // Get the selected color
  const selectedColor = document.querySelector('input[name="color"]:checked');
  
  if (selectedColor) {
    // Increment the vote for the selected color
    const color = selectedColor.value;
    pollResults[color]++;

    // Update the results display
    updateResults();
  } else {
    alert('Please select a color to vote!');
  }
});

// Initial results display
updateResults();
