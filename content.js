window.addEventListener("mouseup", handleSelection);

var selectedText;

function handleSelection() {
    selectedText = window.getSelection().toString();
}

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse){
    if(selectedText.length > 0){
        let msg = {
            swor: selectedText.trim()
        };

        sendResponse(msg);
    }

    else{
        sendResponse({swor: "error"});
    }
}