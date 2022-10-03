$(document).ready(onReady)

function onReady() {
   loadOn(); // On load, display the empty data values
    
    $('p').on('click',operatorClicked); 

    $('#myForm').on('submit', $('#equalBtn'), submitOn); //When the equalBtn within the form is clicked, call submitOn function
    
    $('#leftNumber').on('input',changeOperator); 
    $('#rightNumber').on('input',changeOperator); 

    $('#clearBtn').on('click',clearForm); //Didn't time manage well enough to experiemnt with the DELETE method
   
    $('#leftNumber').on('focusout',changeStuff); 
    $('#rightNumber').on('focusout',changeStuff);

    $('#hSixContainer h6').on('click',manualEntry);

  }
 const ahDio = new Audio('click-21156.mp3'); //Audio for operator buttons and submit button
 const ahDio2 = new Audio('cork-85200.mp3'); //Audio for stretch buttons
 const ahDio3 = new Audio('mixkit-hellhound-monster-attack-dog-wolf-creature-3015.wav'); //Audio for the Clear button

function changeOperator() {
    whichIsIt = ""; //This is necessary so that you don't keep submitting the same number if you switch the input values
    // but forget to select a new operator
}
let content = []; 
let numberFromServer;
let operatorNumber = 0; //This ends up being the final calculated number between the two input values
let whichIsIt; //This will end up being a string value of either / + * -
let woogedy;

//INITIAL GETTER AND RENDER
function loadOn() {
    console.log("in loadOn"); //NOTE: I AM GOING TO DELETE A LOT OF MY CONSOLE LOGS AS I CLEAN UP MY CODE
    // YOU CAN VIEW PAST ONES IN GITHHUB PREVIOUS COMMITS IF INTERESTED
    $.ajax({ //Create request to server to get the state array
        url: '/currentVal',
        method: 'GET'
    })
    .then((response) => { //Server sends back response, which is the state array content[]
        content = response; //Server response is an array, apply that value to variable "content"
        return; //Not sure if this is needed, I don't think it is. I found I didn't need to render here. 
    })
    .catch((err) => {
        console.log('GET /in currentVal error',err)
    })
}
function render() { //This is the function that appends to the DOM
        console.log("in render function"); // Works
        $.ajax({ 
            url: '/currentVal',
            method: 'GET'
        })//This is the exact same GET request as the loadOn function. The difference is, 
        .then((response) => {      // is that I return in this one as it won't return undefined,
            content = response;  // as the top one would.
        })
        .catch((err) => {
            console.log('GET /in currentVal error',err)
        })
    $('#pastCalculations').empty(); //Empty the past calculations elements
    //Re-appends the emptied content and adds the current values. It appends the
    //value of the current left input value. This is where I call the whichIsIt variable,
    //which now has a string value of - +/ or *. This way, it always appends the correct
    //method of calculation. Finally, the string ends with the operatorNumber variable,
    //which is the current value between the two calcualated input numbers.
    $('#pastCalculationsContainer').append(` 
        <ul id="pastCalculationsAdd">
            <li>
                ${$('#leftNumber').val()} ${whichIsIt}
                ${$('#rightNumber').val()}  = 
                ${operatorNumber}
            </li>
        </ul>
    `) 
    $('#currentAnswerContainer').empty(); //Always empty the container on render.
    $('#currentAnswerContainer').append(`
        ${operatorNumber.toFixed(2)}
    `);//This appends only the operatorNumber, replacing the old one. It shows what the
    //current value of the two calculated input numbers is. toFixed(2), while not perfect
    //in this case, makes it so you don't get super long values when dividing, or multiplying
    //floating point integers.
 } //END OF GETTER AND RENDER

function submitOn(evt) {
    evt.preventDefault(); //Prevent page reload
    ahDio.play(); //Audio played whenever the submit button is clicked.
    console.log("In submitOn");
    if(!whichIsIt || whichIsIt == "" || whichIsIt == undefined) {
        return;// Ensure that you will need to first select an operator before being able to calculate,
        //this prevents undefined values as well as adding incomplete values to the state array.
    }
    let newObj = {
       inconsequential: operatorNumber //Object with a placeholder key, and a value of whatever the operator # is
    }
    $.ajax({
        url: '/numberInput',
        method: 'POST',
        data: newObj //Send the newObj to the corresponding server POST /numberInput
    })
    .then((response) => {
        console.log('POST /numberInput',response.numInputKey);
        render(); //All this did was update the state. When I call render, render will use its
        //GET method to retrive the updated content array. I know I didn't do this kosher, but it works well regardless.
    })
    .catch((err) => {
        console.log('POST /numberInput',err);
    })
}
//END OF SUBMIT FUNCTION
function calculateTheNumbers(mathedUp) {
    console.log("In calculateTheNumbers function",mathedUp.total);
    operatorNumber = mathedUp.total; //The point of this function is to change the global operatorNumber value.
}
function operatorClicked() { 
    console.log("Calculation button clicked");
    ahDio.play(); //Audio played whenever an operator button is clicked.
    let newObj2 = {
        lefter: $('#leftNumber').val(),
        righter: $('#rightNumber').val()
    }//Creates another object using two properties, left input's value and the right's
    if($('#leftNumber').val() == '' || $('#rightNumber').val() == '') {
        alert("Please compare two numbers before calculating");
        return; //exit this function in case there is inadequate input values
    }//All these if/else statements will be checking the text() value of the operator
    //element that was clicked. Whichever one is true will post the newObj2 to the server.
    // It will then create a new object using the newObj2 values, and perform a math operation
    //on them, depending on the current operator. 
    else if($(this).text() === '+') {
        $.ajax({
            url:'/plusSelected',
            method:'POST',
            data:newObj2
        })
        .then((response) => {
            numberFromServer = response;
            console.log('POST /plusSelected',response);
             calculateTheNumbers(numberFromServer);
             whichIsIt = "+"
             return;//Not fully sure if I need these returns or not...
        })
        .catch((err) => {
            console.log('POST /plusSelected',err);
        })
    } else if ($(this).text() === '-') {
        $.ajax({
            url:'/minusSelected',
            method:'POST',
            data:newObj2
        })
        .then((response) => {
            console.log('POST /minusSelected',response);
            numberFromServer = response;
            calculateTheNumbers(numberFromServer);  
            whichIsIt = "-";
            return;
         })
        .catch((err) => {
            console.log('POST /minusSelected',err);
        })
    } else if($(this).text() === '*') {
        $.ajax({
            url:'/multiplySelected',
            method:'POST',
            data:newObj2
        })
        .then((response) => {
            console.log('POST /multiplySelected',response);
            numberFromServer = response;
            calculateTheNumbers(numberFromServer);
            whichIsIt = "*";
            return;
         })
        .catch((err) => {
            console.log('POST /multiplySelected',err);
        })
    } else {
        $.ajax({
            url:'/divideSelected',
            method:'POST',
            data:newObj2
        })
        .then((response) => {
            console.log('POST /divideSelected',response);
             numberFromServer = response;
            calculateTheNumbers(numberFromServer);
            whichIsIt = "/";
            return;
         })
        .catch((err) => {
            console.log('POST /divideSelected',err);
        })
    }
}//When the calculated value is returned, let the numberFromServer value equal the new object from the server.
// Before exiting the operatorClicked function, I set the whichIsIt value to a string value, which is 
// dependent upon which POST method was used.
function clearForm() {
    ahDio3.play(); //Audio played whenever the clear button is pressed. It's dog themed.
    $('#leftNumber').val('');
    $('#rightNumber').val('');
    $('#currentAnswerContainer').empty();
}
function changeStuff() {
    if(this.id == 'leftNumber') { //"this.id" is finding the input that lost focus(event), 
    //and seeing if the id is equal to either 'leftNumber' or 'rightNumber'(else).
        woogedy = "woogedyLeft";
    } else {
        woogedy = "woogedyRight";
    }
    console.log(this.id,woogedy);
 }
function manualEntry() { //When any of the stretch buttons are clicked, run this function.
    ahDio2.play(); // audio when any h6 elements within the hSixContainer are clicked.
    let numberClicked = ""; //Create new variable with an empty value. This resets everytime
    // the h6 element is clicked.
    whichIsIt = ""; //Clear whichIsIt. This way, everytime a new number is added using an
    //h6 element, I will be required to select a new operator to calculate the new numbers.
    //Otherwise, I would get the same resulting number that the last calculation produced.
    numberClicked = $(this).text(); //Each h6 has a string of a number or decimal. NumberClicked
    //was emptied, and now it is given that h6 string value. 
    if(woogedy === "woogedyLeft") { //Woogedy is changed every time an input loses focus, to either woogedy left or woogedy right.
    $('#leftNumber').val($('#leftNumber').val() + numberClicked) //If it's woogedyLeft, change the value of the left input.
    console.log("in woogedy left")
} 
    else {
        $('#rightNumber').val($('#rightNumber').val() + numberClicked);
        console.log("in woogedy right"); //If it's woogedy right, change the value of the right input also by the h6 value(number clicked).
    }
}