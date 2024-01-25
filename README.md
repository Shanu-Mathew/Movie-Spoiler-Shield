# Movie Spoiler-Shield Chrome Extension

## Overview

The Movie Spoiler-Shield is a comprehensive Chrome extension designed to elevate your movie-watching experience by harnessing the power of the BERT pre-trained model for spoiler detection in movie reviews. With a user-friendly interface, customizable settings, and a seamless integration of machine learning and web scraping, this extension ensures users are shielded from plot revelations, allowing them to enjoy reviews without the fear of spoilers.

## Features

- **Spoiler Detection with BERT:** Utilizes a BERT pre-trained model to accurately detect potential spoilers in movie reviews, providing advanced spoiler protection.

- **Web Scraping Integration:** The JavaScript code performs web scraping to extract relevant data from movie review websites, allowing the extension to analyze and process the content.

- **Flask API Backend:** Hosts the BERT model using Flask, creating a robust backend system for handling predictions based on the content extracted from movie reviews.

- **Dynamic Content Handling:** The extension's JavaScript dynamically interacts with the Flask API to obtain real-time predictions, ensuring that the spoiler detection is consistently up-to-date.

- **Automatic Spoiler Blocking:** If the BERT model predicts the presence of spoilers, the extension automatically hides the corresponding review content, preventing users from accidentally encountering plot details.

- **Toggle Functionality:** Easily enable or disable the spoiler blocker with the click of a button, giving you control over when to use the extension.

- **Stylish Design:** The extension features a clean and modern design with rounded corners and attractive colors for a visually appealing user interface.

- **Dynamic Content Handling:** The content script dynamically adjusts to changes in the webpage's DOM, ensuring continuous spoiler protection as you navigate through different reviews.

## Model Architecture
![image](https://github.com/Shanu-Mathew/Movie-Spoiler-Shield/assets/89411098/3629053d-b403-4985-8224-c08148872d10)


## Installation

1. Clone the repository.

2. Open Chrome and navigate to `chrome://extensions/`.

3. Enable "Developer mode" in the top right corner.

4. Click on "Load unpacked" and select the folder Spoiler-Extension containing the extension files.

5. The Movie Spoiler-Shield icon should now appear.

6. For the extension to work, Run the server.py before the extension.

## Usage

1. Click on the Movie Spoiler-Shield icon in the Chrome toolbar to open the popup.

2. Use the "Toggle Spoiler Blocker" button to enable or disable the spoiler blocker.

3. Enjoy reading movie reviews without worrying about spoilers! If the extension detects potential spoilers, it automatically hides the relevant content.


## Working Images
1) ![Extension working Example 1](https://github.com/Shanu-Mathew/Movie-Spoiler-Shield/assets/89411098/1d64812a-fc93-49c7-b080-c77befaebdf9)
2) ![Extension working Example 2](https://github.com/Shanu-Mathew/Movie-Spoiler-Shield/assets/89411098/3bde165a-bdc8-46fb-84d4-a75d02b58089)
