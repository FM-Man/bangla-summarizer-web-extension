chrome.runtime.onInstalled.addListener(() => {
  // Create the context menu item
  chrome.contextMenus.create({
    id: "customOption",
    title: "Summarize Selected Text",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "customOption") {
    // Store the selected text in storage
    chrome.storage.local.set({ selectedText: info.selectionText });

    // Open the popup window
    chrome.windows.create({
      type: "popup",
      url: "popup.html",
      width: 1100,
      height: 500
    });
  }
});


chrome.tabs.onCreated.addListener(tab => {
  sendMessageToTab(tab);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url || changeInfo.status === 'loading') {
      sendMessageToTab(tab);
  }
});

function sendMessageToTab(tab) {
  chrome.tabs.sendMessage(tab.id, {
      message: 'hello',
      url: tab.url
  });
}

