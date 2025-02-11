// script.js

// Initialize steps by copying the correct order
let steps = [...correctOrder];
let checkAttempts = 0; // Counter for check attempts

// Function to shuffle the steps array using Fisher-Yates algorithm
function shuffleSteps(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to display the steps in the DOM
function displaySteps() {
  const container = document.getElementById('steps-container');
  container.innerHTML = ''; // Clear existing steps

  steps.forEach((step, index) => {
    const stepElement = document.createElement('div');
    stepElement.className = 'step';
    stepElement.textContent = step;
    stepElement.dataset.index = index;
    container.appendChild(stepElement);
  });

  // Initialize Sortable.js on the container for drag-and-drop functionality
  Sortable.create(container, {
    animation: 150
  });
}

// Function to check if the current order is correct
function checkOrder() {
  const currentSteps = Array.from(document.querySelectorAll('#steps-container .step'));
  const feedback = document.getElementById('feedback');
  
  // Increment the counter
  checkAttempts++;
  
  // Check each step and highlight if correct (only after 10 attempts)
  if (checkAttempts > 10) {
    currentSteps.forEach((stepElement, index) => {
      if (stepElement.textContent === correctOrder[index]) {
        stepElement.classList.add('step-correct');
        setTimeout(() => {
          stepElement.classList.remove('step-correct');
        }, 2000);
      }
    });
  }

  // Check if all steps are correct
  const isCorrect = currentSteps.every((step, index) => step.textContent === correctOrder[index]);
  feedback.textContent = isCorrect ? 'Answer correct!' : 
                        (checkAttempts > 10) ? 'Try again. Correct steps will be highlighted.' : 'Try again.';
  feedback.style.color = isCorrect ? 'green' : 'red';
}

// Event listener for the Shuffle button
document.getElementById('shuffle-button').addEventListener('click', () => {
  shuffleSteps(steps);
  displaySteps();
  document.getElementById('feedback').textContent = '';
  checkAttempts = 0; // Reset counter on shuffle
});

// Event listener for the Check button
document.getElementById('check-button').addEventListener('click', () => {
  checkOrder();
});

// Initial setup: shuffle and display steps when the page loads
shuffleSteps(steps);
displaySteps();
