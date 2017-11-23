[![Code Climate](https://codeclimate.com/github/temiooo/PostIt-Application/badges/gpa.svg)](https://codeclimate.com/github/temiooo/PostIt-Application)
[![Build Status](https://travis-ci.org/temiooo/PostIt-Application.svg?branch=Develop)](https://travis-ci.org/temiooo/PostIt-Application)
[![Coverage Status](https://coveralls.io/repos/github/temiooo/PostIt-Application/badge.svg?branch=chore%2F148576433%2Fintegrate-travisCI)](https://coveralls.io/github/temiooo/PostIt-Application?branch=chore%2F148576433%2Fintegrate-travisCI)
# PostIt Application
PostIt is a simple application that allows people to create accounts, create groups, add registered users to the groups, and send messages to these groups whenever they want. This way, everyone in the group can view messages that has been sent to that group. 

## Features
* Authentication is done using **Json Web Token**. This ensures that API endpoints are protected.
* Create an account.
* Login with your details.
* Create a new group.
* Edit a group name
* Add a user to a group you just created.
* Post a message to a group you belong to.
* Retrieve a list of messages in a group that you belong to.
* Get email notifications when urgent and critical messages are sent to groups you belong to

## Getting Started
**Via Cloning The Repository**
```
# Clone the app
git clone https://github.com/temiooo/PostIt-Application.git

# Switch to directory
cd PostIt-Application

# Create .env file in the root directory
touch .env

# use the .env.sample file as a guideline for keys that should be in your .env file
** Note that the email address and its password will be used by the application to send email notifications to users as required**

# Install Package dependencies
npm install

# Run your migrations
npm run db:migrate

#Start the application
npm run open:src
```

## Testing
```
Run `npm run test:server`
```

## Built with
* [NodeJS](https://nodejs.org/en/) - A Javscript runtime built runtime that uses an event-driven non-blocking I/O model that makes it lightweight and efficient.
* [ExpressJS](http://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. This is used in this application for routing to endpoints.
* [PostgreSQL](https://www.postgresql.org/) - A powerful, open source object-relational database system.
* [Sequelize](http://docs.sequelizejs.com/) - An ORM for Node.js that supports the dialects of PostgreSQL and features solid transaction support an relations.
* [ReactJS](https://reactjs.org/) - A Javascript library for building user interfaces.

## API Documentation
* https://mypostitapp.herokuapp.com/api-docs

## Contributing
PostIt-Application is open source and contributions are highly welcomed.

If you are interested in contributing, follow the instructions below.

* Fork the repository

* Create a new branch

* Make your changes and commit them

* Provide a detailed commit description

* Raise a pull request against Develop

`Ensure your codes follow the` [AirBnB Javascript Styles Guide](https://github.com/airbnb/javascript)

`See project wiki for commit message, pull request and branch naming conventions.`

`All Pull requests must be made against Develop branch. PRs against master would be rejected.`

