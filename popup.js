chrome.storage.local.get("selectedText", (data) => {
  var selectedText = data.selectedText || "No text selected";
  var selectedTextDiv = document.getElementById("selectedText");
  selectedTextDiv.textContent = selectedText;
});

