# PROJECT NAME
Weekend-Jquery-Server-Calculator

## Description
Time to complete project: 25 hours

This project is a calculator app created with focus on connections between the client and server using POST and GET methods.
I spent roughly 4 hours thinking of how I was going to go about this project. In that time I also set up my files and created the "barebones" structure for my index.html. 
The rest of the time was split about half and half on syling and half on the logic. 
When you have your numbers in the two inputs provided, the equal button will perform a calculation on those numbers based on the operator you selected (" + = * / ").
You will either be given a prompt or simply not be able to see your result if you forget to input numbers. Additionally,
if you change a value within the the input box, you will have to reselect an operator to use. You may click the equal(submit) button right after clicking it if you haven't changed the numbers in the input. You may also select a different operator and then submit a new calculation as long as the numbers haven't changed. 
I added media queries to make the page more responsive. I added fun sounds to add to the theme...you'll have to click around to find them (there are three!). 

## Screen Shot
![Settings Window](server/public/Screen Shot 2022-10-02 at 9.15.59 PM.png)

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- List other prerequisites here

## Installation

How do you get your application up and running? This is a step by step list for how another developer could get this project up and running. The good target audience in terms of knowledge, would be a fellow Primer from another cohort being able to spin up this project. Note that you do not need a paragraph here to intro Installation. It should be step-by-step.

If your application has secret keys (for example --  Twilio), make sure you tell them how to set that up, both in getting the key and then what to call it in the `.env` file.

1. Create a database named `your database name`,
2. The queries in the `tables.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage
How does someone use this application? Tell a user story here.

1. xxx
2. xxx
3. xxx
4. xxx
5. xxx
6. xxx


## Built With

List technologies and frameworks here

## License
[MIT](https://choosealicense.com/licenses/mit/)

_Note, include this only if you have a license file. GitHub will generate one for you if you want!_

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. (Thank your people)

## Support
If you have suggestions or issues, please email me at [youremail@whatever.com](www.google.com)