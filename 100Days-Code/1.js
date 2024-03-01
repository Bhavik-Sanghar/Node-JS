// New Day 1 Challenge:
// Challenge: Build a Simple Calculator API
// Create a simple Node.js server that acts as a calculator API. It should accept GET requests with two query 
// parameters: num1 and num2, and a third query parameter operation indicating the operation to 
// perform (e.g., addition, subtraction, multiplication, division). Respond with the result of the operation.
// var add = http://localhost:8000/calculate?num1=10&num2=5&operation=addition

const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { num1, num2, operation } = parsedUrl.query;

    if (!num1 || !num2 || !operation) {
        res.statusCode = 400;
        res.end('Missing query parameters');
        return;
    }

    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) {
        res.statusCode = 400;
        res.end('Invalid numbers');
        return;
    }

    let result;
    switch (operation) {
        case 'addition':
            result = a + b;
            break;
        case 'subtraction':
            result = a - b;
            break;
        case 'multiplication':
            result = a * b;
            break;
        case 'division':
            if (b === 0) {
                res.statusCode = 400;
                res.end('Division by zero');
                return;
            }
            result = a / b;
            break;
        default:
            res.statusCode = 400;
            res.end('Invalid operation');
            return;
    }

    res.end(`${a} ${operation} ${b} = ${result}`);
});

server.listen(8000, () => {
    console.log('Server is running on port 8000');
});
