/*
// function removeSpoiler() {
//   // Get all div elements with the class name "lister-list"
//   const listerListDivs = document.querySelectorAll('.lister-list');

//   // Iterate through the "lister-list" divs
//   listerListDivs.forEach(function (listerListDiv, index) {
//     // console.log('Lister List Div ' + index + ':', listerListDiv);

//     // Get all child elements of the current "lister-list" div
//     const childElements = listerListDiv.children;

//     // Iterate through the child elements
//     Array.from(childElements).forEach(function (childElement, childIndex) {
//       // console.log('Child Element ' + childIndex + ':', childElement);

//       // Extract the text content from the title element
//       const titleText = childElement.querySelector('.title').textContent.trim();

//       // Extract the text content from the review content element
//       const reviewText = childElement.querySelector('.text').textContent.trim();

//       // Check if the child element is spoiler or not
//       if (titleText && titleText === 'Crazy in every sense') {
//         // Hide the child element
//         // childElement.style.display = 'none';

//         childElement.innerHTML =
//           '<h1><i>Spoiler detected and removed by the extension </i><h1>';
//       }

//       // Output the results (you can do anything else with the extracted data)
//       console.log('Title:', titleText);
//       console.log('Review:', reviewText);
//       console.log('------------------------');
//     });
//   });
// }

// removeSpoiler(); */





function getTitleText(element) {
  return element.querySelector('.title').textContent.trim();
}

function getReviewText(element) {
  return element.querySelector('.text').textContent.trim();
}

function isSpoiler(titleText, reviewText) {
  /* MODEL IMPLEMENTION */  


  /* FOR DEMO */
  return titleText === 'Crazy in every sense';

}

function hideSpoiler(element) {
  element.innerHTML = '<h1><i>Spoiler detected and removed by the extension </i></h1>';
}

function processChildElement(childElement) {
  const titleText = getTitleText(childElement);
  const reviewText = getReviewText(childElement);

  if (isSpoiler(titleText, reviewText)) {
    hideSpoiler(childElement);
  }

  console.log('Title:', titleText);
  console.log('Review:', reviewText);
  console.log('------------------------');
}

function removeSpoiler() {
  const listerListDivs = document.querySelectorAll('.lister-list');

  listerListDivs.forEach(function (listerListDiv) {
    const childElements = listerListDiv.children;

    Array.from(childElements).forEach(function (childElement) {
      processChildElement(childElement);
    });
  });
}

removeSpoiler();

