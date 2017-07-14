# PostIt Application
PostIt is a simple application that allows people to create accounts, create groups and add registered users to the groups, and then send messages out to these groups whenever they want. This way one person can post notifications to everyone in the group by sending a message once. 

## Features
* Authentication is done using **Json Web Token**. This ensures that API endpoints are protected.
* Create an account.
* Login with you new details.
* Create a new group.
* Add a user to a group you just created.
* Post a message to a group you belong to.
* Retrieve a list of messages in a group that you belong to.

## Installation
To install this application, 
1. git clone this repository
2. Open the command line and cd into the folder you just cloned
3. Run ```npm install``` to install dependencies
4. Then run ```npm start``` to start the application

## Built with
* [NodeJS](https://nodejs.org/en/) - A Javscript runtime built runtime that uses an event-driven non-blocking I/O model that makes it lightweight and efficient.
* [ExpressJS](http://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. This is used in this application for routing to endpoints.
* [PostgreSQL](https://www.postgresql.org/) - A powerful, open source object-relational database system.
* [Sequelize](http://docs.sequelizejs.com/) - An ORM for Node.js that supports the dialects of PostgreSQL and features solid transaction support an relations.

## API
The routes specified in the application are as follows:
- **'/api/user/signup'**
    - **POST** - Creates a new user using a unique username, unique email and password.

- **'/api/user/signin'**
    - **POST** - Allows an already existing user to sign in into the application with a username and password.

```
Routes speccified below are protected. Authentication is required before they can be accessed.
```
- **'api/group'**
    - **POST** - Creates a new group. You have to pass it the name of the group you want to create.

- **'api/group/:groupId/user'**
    - **POST** - Adds a registered user to an already existing group. Specify the ID of the user you want to add to the group.
- **'api/group/:groupId/message'**
    - **POST** - Post a message to an already existing group
    Specify the content of the message you want to post to the group
- **'api/group/:groupId/messages**
    - **GET** Retrieve all the messages that have been posted to a group
