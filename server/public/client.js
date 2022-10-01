$(document).ready(onReady)

function onReady() {
   loadOn();

}

function loadOn() {
    console.log("in loadOn");
    $.ajax({
        url: '/currentVal',
        method: 'GET'
    })
    .then((response) => {
        content = response;
        render();
    })
    .catch((err) => {
        console.log('GET /in currentVal error',err)
    })
}

function render() {
    console.log("in render function");
    $('#pastCalculations').empty();
        for(let x of content) {
            $('#pastCalculations').append(`
            ${x}
            `)
        }
}
