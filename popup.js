chrome.storage.local.get("selectedText", (data) => {
  var selectedText = data.selectedText || "No text selected";
  var summaryTextDiv = document.getElementById("textSection2");
  var documentTextDiv = document.getElementById("textSection1");
  // selectedTextDiv.textContent = selectedText;

  // Replace with your actual API endpoint URL
  // var apiUrl = "http://localhost:8080/api/demo";

  // Perform POST API call
  // fetch(apiUrl, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ text: selectedText }),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     var responseDiv = document.getElementById("response");
  //     responseDiv.textContent = data.response;
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //     var responseDiv = document.getElementById("response");
  //     responseDiv.textContent = "Error occurred while fetching data.";
  //   });



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

    fetch("http://127.0.0.1:8000/v2/summarize", requestOptions)
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

      // selectedTextDiv.innerText = rSum;
});


function copyText(elementId) {
  const textElement = document.getElementById(elementId).querySelector('p');
  const text = textElement.innerText;

  navigator.clipboard.writeText(text)
    .then(() => {
      alert('Text copied to clipboard: ' + text);
    })
    .catch(err => {
      console.error('Could not copy text: ', err);
    });
}

