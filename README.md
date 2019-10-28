# Fast And Fresh
BuyFastAndFresh is the name of the repository for the initial idea of the app Fast And Fresh, app design with the porpuse to facilitate people who likes to buy at haymarkets or farmer market places, and for the sellers to have a way to promote their products in the internet. The app requires sellers to settup an account for their stall/store and add products using an ipad camera to take pictures of their products, enter the price and other information about it. The clients have to register to in order to  place orders, that will be process after payment is completed, bagged and be ready for the client to be pick up at the market place. The app is still in development stage.

## Getting Started
* Before starting with you need to install Nodejs and have basic understanding of it and npm (node package manager) this is the official line for the documentation [Nodejs Docs](https://nodejs.org/en/docs/), also know how to clone repositories from Github to your local machine [Git Reference](https://www.git-scm.com/docs). 
* You need to install MySql Db for this project, in order for the app to run propertly. [MySQL Documentation](https://dev.mysql.com/doc/).

## Installing and Starting the app locally

Clone the app from this repository to you local drive of you PC (previously I recomended to have knowledge of how to clone repositories and where to find the information) and go to the root directory of the project, then run the command

```
npm install
```
This will take only a few minuts, the packages are small, and it should install node modules within the server directory. For the client side since the project runs using HTML, Javascript and CSS, along with other libraries, the browser takes care of running it.

Make sure MySQLDb is running in the background, if it is not running the Express server still will run, but it will throw an error and the database for the project will not be created.

After both installations complete, run the following command in your terminal:

```
npm start
```

Your app should now be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## Deployment (Heroku)

To deploy, simply add and commit your changes, and push to Heroku. As is, the NPM scripts should take care of the rest.

## Built With

### for the back end server and data persistance
* Visual Studio Code
* Nodejs 
* Express 
* MySQL and Sequelize. 

### client side for the user interface.
* Passport, passport-local 
* HTML, Javascript, CSS
* JQUERY and Bootstrap4

# Author
* Wilson Linares 
