chrome.runtime.onInstalled.addListener(() => {
  // Create the context menu item
  chrome.contextMenus.create({
    id: "customOption",
    title: "Custom Option",
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
      width: 220,
      height: 120
    });
  }
});

