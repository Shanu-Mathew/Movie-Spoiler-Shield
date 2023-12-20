async function isSpoiler(title, reviewText) {
  try {
    const jsonData = {
      review: reviewText
    };
    // console.log('JSON Data:', jsonData);
    const apiUrl = 'http://127.0.0.1:5000/predict';


    const response = await fetch(apiUrl, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    });
    console.log('Response Received', response)
    if (!response.ok) {
      console.error('Network response was not ok:', response.status, response.statusText);
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    console.log('Response Data:', responseData);


    return responseData.prediction;
  } catch (error) {
    console.error('Error:', error.message);
    // Handle errors
    return false; // Assuming false for simplicity; adjust as needed
  }
}

function hideSpoiler(reviewElement) {
  const spoilerMessage = document.createElement('div');
  spoilerMessage.className = 'spoiler-message';
  spoilerMessage.innerHTML = `
    <p class="spoiler-text">Spoiler detected and removed by the extension.</p>
    <p class="disclaimer-text">Watch the movie to discover the plot twists!</p>
  `;

  // Add your preferred styles for the spoiler message
  spoilerMessage.style.backgroundColor = '#ffcccb'; // Light red background
  spoilerMessage.style.padding = '10px';
  spoilerMessage.style.borderRadius = '8px';
  spoilerMessage.style.marginTop = '10px';
  spoilerMessage.style.textAlign = 'center';

  // Replace the content of the review element with the spoiler message
  reviewElement.innerHTML = '';
  reviewElement.appendChild(spoilerMessage);
}

async function processReviews(isSpoilerBlockerEnabled) {
  if (isSpoilerBlockerEnabled) {
    const reviews = document.querySelectorAll('.review'); // Adjust the selector based on your actual HTML structure

    reviews.forEach(async (review) => {
      const titleElement = review.querySelector('.title');
      const descriptionElement = review.querySelector('.description');

      if (titleElement && descriptionElement) {
        const title = titleElement.innerText;
        const description = descriptionElement.innerText;

        // if (isSpoiler(title, description)) {
        //   hideSpoiler(review);
        // }
        const spoilerDetected = await isSpoiler(title,description);
        console.log('Spoiler Detected:', spoilerDetected);
        if (spoilerDetected) {
          hideSpoiler(review);
        }
      }
    });
  }
}

function applySpoilerBlocker() {
  // Get the spoiler blocker state from the background script
  chrome.runtime.sendMessage({ action: 'getSpoilerBlockerState' }, (response) => {
    const isSpoilerBlockerEnabled = response && response.spoilerBlockerEnabled;
    processReviews(isSpoilerBlockerEnabled);
  });
}

// Run the spoiler blocker logic when the content script is injected
applySpoilerBlocker();

// Add an event listener for dynamic content loading
// For example, listen for changes in the DOM:
const observer = new MutationObserver(applySpoilerBlocker);
observer.observe(document.body, { subtree: true, childList: true });

// Listen for messages from the background script to re-run the content script
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'reloadContentScript') {
    applySpoilerBlocker();
  }
});
