chrome.storage.local.get("selectedText", (data) => {
  var selectedText = data.selectedText || "No text selected";
  var summaryTextDiv = document.getElementById("textSection2");
  var documentTextDiv = document.getElementById("textSection1");
  
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "text": selectedText
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    var rText,rSum;

    fetch("http://127.0.0.1:8000/summarize", requestOptions)
      .then(response => response.json())
      .then(result => {
        rText = result.text;
        rSum = result.summary;
        console.log(typeof result, result);
        console.log(rText);
        summaryTextDiv.innerText = rSum;
        documentTextDiv.innerText = rText
      })
      .catch(error => console.log('error', error));
});



