// Function to extract text from elements with specified CSS classes
function extractText() {
    var text = "";
    document.querySelectorAll('.story-element .story-element-text div p').forEach(function (element) {
        text += element.innerText.trim() + " ";
    });
    console.log(text);
    return text;
}

function runOnChange(){

    if (window.location.href.includes("prothomalo.com") &&
        window.location.href !== "https://www.prothomalo.com") {
        console.log("url found");
        var textContent = extractText();
        // chrome.storage.local.set({ selectedText: textContent });
        
        fetch("http://127.0.0.1:8000/summarize", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "text": textContent }),
            redirect: 'follow'
        })
        .then(response => response.json())
        .then(data => {
            // Open popup window and display response string
            const popupWindow = window.open("", "Popup Window", "width=400,height=500,left=940,top=150");
            popupWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
            <meta charset="UTF-8">
            <title>Bangla Text Summarizer</title>
            <style>
                body {
                font-family: Arial, sans-serif;
                margin-top: 40;
                padding: 0;
                }
            
                .container {
                display: flex;
                justify-content: space-around;
                align-items: flex-start;
                /* Align items to the top */
                height: fit-content;
                flex-direction: row;
                /* Display sections vertically */
                }
            
                .text-section {
                width: 90%;
                border: 1px solid #941414;
                padding: 0px 20px 20px;
                /* margin-bottom: 20px; */
                position: relative;
                }
            
            
                h2 {
                margin-bottom: 10px;
                }
            </style>
            </head>
            
            <body>
            <div class="container">
                <!--div class="text-section">
                <h2>Document</h2>
                <div id="textSection1">
                    <p>${data.text}</p>
                </div>
                </div-->
                <div class="text-section">
                <h2>Summary</h2>
                <div id="textSection2">
                    <p>${data.summary}</p>
                </div>
                </div>
            </div>
            
            
            </body>
            
            </html>`
            );
        })
        .catch(error => console.error('Error:', error));

    }

}

console.log("runs##################################");
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'hello') {
        console.log("changed##################################");
        runOnChange();
    }
});

