// Function to extract text from elements with specified CSS classes

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'hello') {
        isProthomAloArticle();
        runOnChange();
    }
});


function runOnChange(){
    var textContent = "";
    if (isProthomAloArticle()) {
        console.log("url found");
        textContent = extractTextFromProthomAlo();
    }
    



    //fetching
    if (textContent != ""){
        fetch("http://127.0.0.1:8000/summarize", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "text": textContent }),
            redirect: 'follow'
        }).then(response => response.json()).then(data => {
            // Open popup window and display response string
            const popupWindow = window.open("", "Popup Window", "width=400,height=500,left=940,top=150");
            popupWindow.document.write('');
            popupWindow.document.write(
            `<html><head>
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
                    h2 {margin-bottom: 10px;}
                </style>
            </head><body>
                <div class="container">
                    <div class="text-section">
                        <h2>Summary</h2>
                        <div id="textSection2">
                            <p>${data.summary}</p>
                        </div>
                    </div>
                </div>
            </body></html>`);
        }).catch(error => console.error('Error:', error));
    }
}


//prothom alo
function isProthomAloArticle(){
    if(s.includes('prothomalo')){
        querys = document.querySelectorAll('.story-element .story-element-text div p');
        if(querys.length !=0)
            return true;
        else return false;
    }
    else return false;
}

function extractTextFromProthomAlo() {
    var text = "";
    document.querySelectorAll('.story-element .story-element-text div p').forEach(function (element) {
        text += element.innerText.trim() + " ";
    });
    // console.log(text);
    return text;
}
