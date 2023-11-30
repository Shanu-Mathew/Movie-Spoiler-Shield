function getTitleText(element) {
  const titleElement = element.querySelector('.title');
  return titleElement ? titleElement.textContent.trim() : '';
}

function getReviewText(element) {
  const textElement = element.querySelector('.text');
  return textElement ? textElement.textContent.trim() : '';
}

async function isSpoiler(reviewText) {
  try {
    const jsonData = {
      review: reviewText
    };
    // console.log('JSON Data:', jsonData);
    const apiUrl = 'http://127.0.0.1:5000/predict';


    const response = await fetch(apiUrl, {
      mode:'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    });
    console.log('Response Received',response)
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

function hideSpoiler(element) {
  element.innerHTML ='<h1><i>Spoiler detected and removed by the extension </i></h1>';
}

async function processChildElement(childElement) {
  // const titleText = getTitleText(childElement);
  const reviewText = getReviewText(childElement);

  const spoilerDetected = await isSpoiler(reviewText);
  console.log('spoiler Detected:',spoilerDetected);
  if (spoilerDetected) {
    hideSpoiler(childElement);
  }

  // console.log('Title:', titleText);
  // console.log('Review:', reviewText);
  // console.log('------------------------');
}

async function removeSpoiler() {
  const listerListDivs = document.querySelectorAll('.lister-list');

  const processPromises = [];

  listerListDivs.forEach(listerListDiv => {
    const childElements = listerListDiv.children;

    Array.from(childElements).forEach(childElement => {
      processPromises.push(processChildElement(childElement));
    });
  });

  // Wait for all promises to resolve
  await Promise.all(processPromises);
}

removeSpoiler();
