// Include axios library
const axios = require('axios');
const cheerio = require('cheerio');

// Function to fetch webpage and extract text
async function fetchAndConcatText(url) {
    try {
        // Fetch the webpage content
        const response = await axios.get(url);
        const html = response.data;

        // Load HTML content into cheerio
        const $ = cheerio.load(html);

        // Extract text from elements with specified CSS classes
        var text = "";
        $('.story-element .story-element-text div p').each(function() {
            text += $(this).text().trim() + " ";
        });

        // Output the concatenated text
        console.log(text);
    } catch (error) {
        console.error('Error fetching webpage:', error);
    }
} 

// Specify the URL of the webpage
var url = "https://www.prothomalo.com/bangladesh/1pji8ibjhj"; // Replace with your URL

// Call the function with the URL
fetchAndConcatText(url);
