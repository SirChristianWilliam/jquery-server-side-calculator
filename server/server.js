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
    "apple","pear","banana"
];

app.get('/currentVal', (req,res) => {
    console.log("getting content",content);
    res.send(content);
})

