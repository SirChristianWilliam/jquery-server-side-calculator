$(document).ready(onReady)

function onReady() {
   loadOn(); // On load, display the empty data values
    
    $('p').on('click',operatorClicked);

   $('#myForm').on('submit', $('#equalBtn'), submitOn); //When the equalBtn within the form is clicked, call submitOn function
    
}
let content = [];
let contentArray = [];
let numberFromServer;
let operatorNumber = 0;
let whichIsIt;
//INITIAL GETTER AND RENDER

function loadOn() {
    console.log("in loadOn"); //Works

    $.ajax({ //Create request to server
        url: '/currentVal',
        method: 'GET'
    })
    .then((response) => { //Server sends back response
        content = response; //Server response is an array, apply that value to variable "content"
        return;
          // Send this updated information to be rendered
    })
    .catch((err) => {
        console.log('GET /in currentVal error',err)
    })
}

function render() { //Last function used to display the content on the DOM
    console.log("in render function"); // Works
      //Empty the past calculations container

      $.ajax({ //Create request to server
        url: '/currentVal',
        method: 'GET'
    })
    .then((response) => { //Server sends back response
        content = response; //Server response is an array, apply that value to variable "content"
           // Send this updated information to be rendered
    })
    .catch((err) => {
        console.log('GET /in currentVal error',err)
    })

        console.log(content,"YARRRR");
        $('#pastCalculations').empty();
        
         //Loop through the content of the array
            $('#pastCalculationsContainer').append(`
            <ul>
                 <li>
                   ${$('#leftNumber').val()} ${whichIsIt}
                   ${$('#rightNumber').val()}  = 
                   ${operatorNumber}
                </li>
            </ul>
              `) // Append the state array to the DOM that we just emptied
            $('#currentAnswerContainer').empty();
            $('#currentAnswerContainer').append(`
            ${operatorNumber}
            `);
 }

//END OF GETTER AND RENDER

function submitOn(evt) {
    console.log(operatorNumber,"OPERATOR #")
    //let finalNumber = calculateTheNumbers();
   
    evt.preventDefault(); //Prevent page reload
    console.log("In submitOn");

    let newObj = {
       nummer: operatorNumber
    }
    $.ajax({
        url: '/numberInput',
        method: 'POST',
        data: newObj
    })
    .then((response) => {
        console.log('POST /numberInput',response.totally);
         console.log("content!!!!!!!!!!");
          render();
    })
    .catch((err) => {
        console.log('POST /numberInput',err);
    })
    
}

function calculateTheNumbers(mathedUp) {
     console.log("In calculateTheNumbers function",mathedUp.total);
      operatorNumber = mathedUp.total;
  }
//END OF SUBMIT FUNCTION

function operatorClicked() {
    console.log("Calculation button clicked");
    let newObj2 = {
        lefter: $('#leftNumber').val(),
        righter: $('#rightNumber').val()
    }
    if($('#leftNumber').val() == '' || $('#rightNumber').val() == '') {
         alert("Please compare two numbers before calculating");
         return;
    }
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

            return;
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
            whichIsIt = "-"
         
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
            whichIsIt = "*"

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
            whichIsIt = "/"

            return;

         })
        .catch((err) => {
            console.log('POST /divideSelected',err);
        })

    }

}