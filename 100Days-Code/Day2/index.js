// Create a Node.js script that reads a CSV (Comma Separated Values) file named data.csv from the filesystem. The CSV file contains data in the format name,age,email. Your script should parse the CSV data, extract the email addresses, and write them to a new text file named emails.txt, each email address on a new line.

const fs = require('fs');
const csv = require('csv-parser');

// Read the CSV file

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Extract email address from each row
    const email = row.email;
    if (email) {
      // Append email address to emails.txt
      fs.appendFileSync('emails.txt', email + '\n');
    }
  })
  .on('end', () => {
    console.log('Email extraction complete. Check emails.txt.');
  });
