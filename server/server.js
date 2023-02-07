console.log("I am in server.js");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const port = 3000;
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Show this when the server is active");
})
let content = [];  //This is my state array variable
 
app.get('/currentVal', (req,res) => {
     console.log("getting content",content);
    res.send(content); //This function sends back the state array. First from onload,
    // and every time render() is called.
})
app.post('/numberInput', (req,res) => {
//This is called on submitOn from the client. It inputs an object with a placeholder key
//that has a value of the operatorNumber.
    console.log('in POST /numberInput', req.body.numbO);
    let combined = {
        numInputKey: req.body.numbO,
        oppy: req.body.oppy,
        left: req.body.left,
        right: req.body.right
    }//creates new object with placeholder, and the operatorNumber value.
    console.log(combined,"YEEEEE");
    content.push(combined);//Update the state array(content) with the new object,which
    // has the current operatorNumber's value in it.
    res.sendStatus(201);//Send back the object, which gets sent to calculateTheNumbers function,
    //which sets the operatorNumber to the sent object's total.
})

//DEALING WITH THE OPERATOR THAT WAS CLICKED
//These next app.post methods all do pretty much the same thing, but with different
//calculations, depending on which operator the client clicked.
//They take the object that was created, which has two properties, with two values.
//The two values are the left and right input values. The server here will then
//create two variables, each respectively applying the client's object properties
// to the variables(numOneFromClient,numTwoFromClient). A third variable is created,
// called combine, which is an object. It will take the two properties and calculate
//them, while applying that new value to a property called "total".
//This app.post will send that object back to the client to ultimately lead to be used
//in the calculateTheNumbers function. This is why I don't return or render in the
//calculateTheNumbers function, as the client isn't sure what the final calculation will be.
app.post('/plusSelected', (req,res) => {
    console.log('in POST /plusSelected');
    let numOneFromClient = req.body.lefter;
    let numTwoFromClient = req.body.righter;
    let combined = {
        total: Number(numOneFromClient) + Number(numTwoFromClient)
    }
     console.log(content);
    res.send(combined);
})
app.post('/minusSelected', (req,res) => {
    console.log('in POST /minusSelected');
    let numOneFromClient = req.body.lefter;
    let numTwoFromClient = req.body.righter;
    let combined = {
        total: numOneFromClient - numTwoFromClient
     }
      console.log(content);
      res.send(combined);
})
app.post('/multiplySelected', (req,res) => {
    console.log('in POST /multiplySelected');
    let numOneFromClient = req.body.lefter;
    let numTwoFromClient = req.body.righter;
    let combined = {
        total: numOneFromClient * numTwoFromClient
     }
      console.log(content);
      res.send(combined);
})
app.post('/divideSelected', (req,res) => {
    console.log('in POST /divideSelected');
    let numOneFromClient = req.body.lefter;
    let numTwoFromClient = req.body.righter;
    let combined = {
        total: numOneFromClient / numTwoFromClient
     }
      console.log(content);
      res.send(combined);
})