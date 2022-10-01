$(document).ready(onReady)

function onReady() {
   loadOn(); // On load, display the empty data values

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
        render(); // Send this updated information to be rendered
    })
    .catch((err) => {
        console.log('GET /in currentVal error',err)
    })
}

function render() { //Last function used to display the content on the DOM
    console.log("in render function"); // Works
    $('#pastCalculations').empty(); //Empty the past calculations container
         for(let x of content) { //Loop through the content of the array
            $('#pastCalculations').append(`
            <ul>
                <li>
                    ${x} 
                </li>
            </ul>
            `) // Append the state array to the DOM that we just emptied
        }
}

//END OF GETTER AND RENDER

function submitOn(evt) {
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
        loadOn();
    })
    .catch((err) => {
        console.log('POST /numberInput',err);
    })
}