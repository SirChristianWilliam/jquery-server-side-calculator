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

let content = [];
  
app.get('/currentVal', (req,res) => {
    console.log("getting content",content);
    res.send(content);
})

app.post('/numberInput', (req,res) => {
    console.log('in POST /numberInput');
    let numOneFromClient = req.body.firstNum;
    let numTwoFromClient = req.body.secondNum;
    let combined = {
        left: Number(numOneFromClient),
        right: Number(numTwoFromClient)
    }
     content.push(combined);
    res.sendStatus(201);
})

//DEALING WITH OPERATOR CLICKED

app.post('/plusSelected', (req,res) => {
    console.log('in POST /plusSelected');
    let numOneFromClient = req.body.lefter;
    let numTwoFromClient = req.body.righter;
    let combined = {
        total: Number(numOneFromClient) + Number(numTwoFromClient)

    }
    operatorCalc = [];
    console.log(combined.total);

    operatorCalc.push(combined);
    res.sendStatus(201);
 
})

app.post('/minusSelected', (req,res) => {
    console.log('in POST /minusSelected');
    let numOneFromClient = req.body.lefter;
    let numTwoFromClient = req.body.righter;
    let combined = {
        total: numOneFromClient - numTwoFromClient

     }
     operatorCalc = [];
     console.log(combined.total);

     operatorCalc.push(combined);
      res.sendStatus(201);
 
})

app.post('/multiplySelected', (req,res) => {
    console.log('in POST /multiplySelected');
    let numOneFromClient = req.body.lefter;
    let numTwoFromClient = req.body.righter;
    let combined = {
        total: numOneFromClient * numTwoFromClient

     }
     operatorCalc = [];
     console.log(combined.total);

     operatorCalc.push(combined);
      res.sendStatus(201);
 
})

app.post('/divideSelected', (req,res) => {
    console.log('in POST /divideSelected');
    let numOneFromClient = req.body.lefter;
    let numTwoFromClient = req.body.righter;
    let combined = {
        total: numOneFromClient / numTwoFromClient
     }
     operatorCalc = [];
     console.log(combined.total);
     operatorCalc.push(combined.total);
      res.sendStatus(201);
 
})


//END OF DEALING WITH OPERATOR CLICKED

