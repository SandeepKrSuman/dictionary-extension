
let query = {active: true, currentWindow: true};

chrome.tabs.query(query, gotTabs);
function gotTabs(tabs) {
    let msg = {
        txt: "hello from popup"
    }
    
    chrome.tabs.sendMessage(tabs[0].id, msg, function(response){
        if(response.swor === "error"){
            document.getElementById('word').innerHTML = "Please select a word!";
        }
        else{
            dictionary(response.swor)
        }
    });

  }

async function dictionary(query){
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`;
    let response = await fetch(url);
    let json = await response.json();
    if(json && !json.title){
        document.getElementById('word').innerHTML = json[0].word;
        document.getElementById('phonetic').innerHTML = `${json[0].phonetic ? json[0].phonetic : ""}  (${json[0].meanings[0].partOfSpeech})`;
        document.getElementById('definition').innerHTML = json[0].meanings[0].definitions[0].definition;
        if(json[0].meanings[0].definitions[0].example){
            document.getElementById('example').innerHTML = `Example: ${json[0].meanings[0].definitions[0].example}`;
        }
    }else if(json.title){
        document.getElementById('error').innerHTML = "⚠  " + json.title;
    }
}