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
    console.log('in POST /numberInput', req.body.nummer);
    //let numOneFromClient = req.body.firstNum;
    //let numTwoFromClient = req.body.secondNum;
    console.log(Number(req.body.nummer), "BALLOON")
    let combined = {
        totally: req.body.nummer
    }
     content.push(combined);
     res.send(combined);
})

//DEALING WITH THE OPERATOR THAT WAS CLICKED
 
app.post('/plusSelected', (req,res) => {
    console.log('in POST /plusSelected');
    let numOneFromClient = req.body.lefter;
    let numTwoFromClient = req.body.righter;
    let combined = {
        total: Number(numOneFromClient) + Number(numTwoFromClient)
    }
       console.log(combined.total, "HERRO");
         res.send(combined);
})

app.post('/minusSelected', (req,res) => {
    console.log('in POST /minusSelected');
    let numOneFromClient = req.body.lefter;
    let numTwoFromClient = req.body.righter;
    let combined = {
        total: numOneFromClient - numTwoFromClient
     }
      console.log(combined.total);
      res.send(combined);
})

app.post('/multiplySelected', (req,res) => {
    console.log('in POST /multiplySelected');
    let numOneFromClient = req.body.lefter;
    let numTwoFromClient = req.body.righter;
    let combined = {
        total: numOneFromClient * numTwoFromClient
     }
      console.log(combined.total);
      res.send(combined);
})

app.post('/divideSelected', (req,res) => {
    console.log('in POST /divideSelected');
    let numOneFromClient = req.body.lefter;
    let numTwoFromClient = req.body.righter;
    let combined = {
        total: numOneFromClient / numTwoFromClient
     }
       console.log(combined.total);
      res.send(combined);
})


//END OF DEALING WITH THE OPERATOR CLICKED

