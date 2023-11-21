// background.js
chrome.runtime.onInstalled.addListener(function () {
    chrome.action.onClicked.addListener(function (tab) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"]
      });
    });
  });
  