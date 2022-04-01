window.addEventListener("mouseup", handleSelection);

var selectedText;

function handleSelection() {
  selectedText = window.getSelection().toString().replace(/\s/g, "");
}

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  let msg =
    selectedText && selectedText.length > 0
      ? selectedText
      : "_TextNotSelected_";
  sendResponse({ swor: msg });
}
