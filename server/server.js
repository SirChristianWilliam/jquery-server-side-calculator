console.log("I am in server.js");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log("Show this when the server is active");
})

let content = [
    "Past Calculations:"
];

app.get('/currentVal', (req,res) => {
    console.log("getting content",content);
    res.send(content);
})

app.post('/numberInput', (req,res) => {
    console.log('in POST /numberInput');
    let numOneFromClient = req.body.firstNum;
    let numTwoFromClient = req.body.secondNum;
    let combined = Number(numOneFromClient) + Number(numTwoFromClient);
    content.push(combined);
    res.sendStatus(201);
})

