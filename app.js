const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const port = process.env.PORT || 3000;

// Set view engine to EJS for rendering HTML templates
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use body-parser middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Home route to load the main scanner page
app.get('/', (req, res) => {
  res.render('index');
});

// Handle scan request and display results
app.post('/scan', async (req, res) => {
  const url = req.body.url;
  const scanType = req.body.scanType;

  let result = '';

  // Simulate basic vulnerability detection
  if (scanType === 'sql_injection') {
    // Detect if URL has common SQL injection patterns
    if (url.includes("' OR 1=1") || url.includes("';--")) {
      result = `SQL Injection vulnerability found in ${url} (Severity: High)\nRecommendation: Use prepared statements and sanitize inputs.`;
    } else {
      result = `No SQL Injection vulnerabilities detected for ${url}.`;
    }
  } else if (scanType === 'xss') {
    // Simulate checking if the URL has XSS vulnerabilities
    if (url.includes("<script>")) {
      result = `XSS vulnerability detected in ${url} (Severity: Medium)\nRecommendation: Ensure user input is properly sanitized and output encoded.`;
    } else {
      result = `No XSS vulnerabilities detected for ${url}.`;
    }
  } else if (scanType === 'unpatched_software') {
    // Simulate checking for unpatched software (e.g., outdated server headers)
    if (url.includes("outdated")) {
      result = `Unpatched software detected on ${url} (Severity: Critical)\nRecommendation: Update to the latest security patches.`;
    } else {
      result = `No unpatched software detected for ${url}.`;
    }
  } else {
    result = `No vulnerabilities found for the given scan type on ${url}.`;
  }

  // Render the result page with the generated scan results
  res.render('result', { url, scanType, result });
});

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})