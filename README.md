# accounts-rest-api

This is the Module 4 assignment lab for the edX Introduction to NodeJS course.

This project implements a RESTful Accounts API using Mongoose for persistence

# Usage

$ npm i

$ node server.js

# Design

* Express is used for routing to provide a RESTful CRUD API via HTTP GET, POST, PUT and DELETE requests
* All database access to MongoDB is done via Mongoose models http://mongoosejs.com/
* Morgan is used for logging of HTTP requests and response codes
* The solution uses simple hard-coded data validation

# Evolution and Difficulties

Fairly simple project. Initially I used Model.findByIdAndUpdate for update requests, but to provide better
validation and allow updating of just name or balance, I ended up using Model.findById then doc.save

# Testing

I created curl commands to exercise all CRUD functions, see "curl tests.txt". Everything appears to be
working fine.
