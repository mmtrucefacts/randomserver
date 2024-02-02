// server.js
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
app.use(express.json());

// Endpoint to receive code from main site client
app.post('/api/send-code', async (req, res) => {
  const { websiteUrl, action } = req.body;

  try {
    // Make a request to the specified website and perform action
    const response = await axios.get(websiteUrl);

    // Load the HTML content into cheerio
    const $ = cheerio.load(response.data);

    // Extract specific content from the HTML (example: title)
    const title = $('title').text();
    const mainContent = $('body').html();

    // Send extracted content back to main site client
    res.json({ success: true, title, mainContent });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'An error occurred' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
