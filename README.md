[![Code Climate](https://codeclimate.com/github/temiooo/PostIt-Application/badges/gpa.svg)](https://codeclimate.com/github/temiooo/PostIt-Application)
[![Build Status](https://travis-ci.org/temiooo/PostIt-Application.svg?branch=Develop)](https://travis-ci.org/temiooo/PostIt-Application)
[![Coverage Status](https://coveralls.io/repos/github/temiooo/PostIt-Application/badge.svg?branch=chore%2F148576433%2Fintegrate-travisCI)](https://coveralls.io/github/temiooo/PostIt-Application?branch=chore%2F148576433%2Fintegrate-travisCI)
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

## Getting Started
**Via Cloning The Repository**
```
# Clone the app
git clone https://github.com/temiooo/PostIt-Application.git

# Switch to directory
cd PostIt-Application

# Create .env file in the root directory
touch .env

# add your SECRET, DATABASE_URL, TEST_DATABASE_URL, PRODUCTION_DATABASE_URL, EMAIL_ADDRESS, EMAIL_PASSWORD keys
**Note that the email address and its password will be used by the application to send email notifications to users as required**

# Install Package dependencies
npm install

# Run your migrations
npm run db:migrate
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

## API Documentation
* https://temiooo.github.io/slate

## Contributing
If you are interested in contributing to development of PostIt-Application,

Follow the instructions below to contribute.
* Fork the repository

* Make your change

* Commit your change to your forked repository

* Provide a detailed commit description

* Create a pull request
