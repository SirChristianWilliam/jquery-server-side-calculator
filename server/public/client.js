$(document).ready(onReady)

function onReady() {
   loadOn(); // On load, display the empty data values
    

    $('p').on('click',operatorClicked);

   $('#myForm').on('submit', $('#equalBtn'), submitOn); //When the equalBtn within the form is clicked, call submitOn function
}

//INITIAL GETTER AND RENDER

function loadOn() {
    console.log("in loadOn"); //Works
    $.ajax({ //Create request to server
        url: '/currentVal',
        method: 'GET'
    })
    .then((response) => { //Server sends back response
        content = response; //Server response is an array, apply that value to variable "content"
        
        render(content); // Send this updated information to be rendered
    })
    .catch((err) => {
        console.log('GET /in currentVal error',err)
    })
}

function render(contentArray,computedValue) { //Last function used to display the content on the DOM
    console.log("in render function"); // Works
     $('#pastCalculations').empty(); //Empty the past calculations container
    
         for(let x of contentArray) { //Loop through the content of the array
            $('#pastCalculations').append(`
            <ul>
                <li>
                    ${computedValue}
                </li>
            </ul>
            `) // Append the state array to the DOM that we just emptied
            $('#currentAnswerContainer').empty();
            $('#currentAnswerContainer').append(`
            ${computedValue}
            `);
        }
}

//END OF GETTER AND RENDER

function submitOn(evt) {
    
    let finalNumber = calculateTheNumbers();
   
    evt.preventDefault(); //Prevent page reload
    console.log("In submitOn");

    let newObj = {
        firstNum: $('#leftNumber').val(),
        secondNum: $('#rightNumber').val()
    }

    $.ajax({
        url: '/numberInput',
        method: 'POST',
        data: newObj
    })
    .then((response) => {
        console.log('POST /numberInput',response);
        content = response;
        console.log("content!!!!!!!!!!");
         render(content,finalNumber);
    })
    .catch((err) => {
        console.log('POST /numberInput',err);
    })
}

function calculateTheNumbers(mathedUp) {
    let numberFromOperator = mathedUp;
    console.log(numberFromOperator)
    return numberFromOperator;
}
//END OF SUBMIT FUNCTION

function operatorClicked() {
    console.log("Calculation button clicked");
    let newObj2 = {
        lefter: $('#leftNumber').val(),
        righter: $('#rightNumber').val()
    }
    if($('#leftNumber').val() == '' || $('#rightNumber').val() == '') {
         alert("Please compare two numbers");
         return;
    }
    else if($(this).text() === '+') {
        $.ajax({
            url:'/plusSelected',
            method:'POST',
            data:newObj2
        })
        .then((response) => {
            console.log('POST /plusSelected',response);
            let math1 = Number(response.lEft);
            let math2 = Number(response.rIght);
            let mathedUp = Number(math1) + Number(math2);
            calculateTheNumbers(Number(mathedUp));
            return;

        })
        .catch((err) => {
            console.log('POST /plusSelected',err);
        })
    } else if ($(this).text() === '=') {
        $.ajax({
            url:'/minusSelected',
            method:'POST',
            data:newObj2
        })
        .then((response) => {
            console.log('POST /minusSelected',response);
            let math1 = Number(response.lEft);
            let math2 = Number(response.rIght);
            let mathedUp = Number(math1) - Number(math2);
            calculateTheNumbers(Number(mathedUp));
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
            let math1 = Number(response.lEft);
            let math2 = Number(response.rIght);
            let mathedUp = Number(math1) * Number(math2);
            calculateTheNumbers(Number(mathedUp));
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
            let math1 = Number(response.lEft);
            let math2 = Number(response.rIght);
            let mathedUp = Number(math1) / Number(math2);
            calculateTheNumbers(Number(mathedUp));
            return;

         })
        .catch((err) => {
            console.log('POST /divideSelected',err);
        })

    }

}