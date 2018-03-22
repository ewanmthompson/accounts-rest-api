// accounts-rest-api - implements an accounts api using mongoose
//   for edX - Introduction to NodeJS - Module 3 assignment
// server.js - application bootup
// 21 March 2018 - Ewan T.

// Imports
const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Instantiations
const app = express()

mongoose.connect('mongodb://localhost/test')
let Account = mongoose.model('Account', {
     name: String,
     balance: Number
})

// Middleware
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())

// Routes
app.get('/accounts', (req,res) => {
    if (req.query.id) {
        Account.findById(req.query.id, (err, account) => {
            if (err) return res.status(400).send({Error: err})
            res.status(200).send(account)
        })
    } else {
        Account.find({}, (err, accounts) => {
            if (err) return res.status(400).send({Error: err})
            res.status(200).send(accounts)
        })
    }
})

app.post('/accounts', (req,res) => {
    if (!req.body.name || !req.body.name.trim()) return res.status(400).send({Error: "Name missing"})
    if (!req.body.balance || isNaN(req.body.balance.trim())) return res.status(400).send({Error: "Balance missing or non-numeric"})
    let account = new Account({
        name: req.body.name.trim(),
        balance: req.body.balance.trim()
    })
    account.save((err, account) => {
        if (err) return res.status(400).send({Error: err})
        console.log('Saved: ', account)
        res.status(201).send({accountId: account._id})
    })
})

app.put('/accounts/:id', (req,res) => {
    Account.findById(req.params.id, (err, account) => {
        if (err) return res.status(400).send({Error: err})
        if (req.body.name) account.name = req.body.name.trim()
        if (req.body.balance) {
            if (isNaN(req.body.balance.trim())) return res.status(400).send({Error: "Balance invalid"})
            account.balance = req.body.balance.trim()
        } 
        account.save((err, account) => {
            if (err) return res.status(400).send({Error: err})
            console.log('Updated: ', account)
            res.status(200).send(account)
        })
    })
})

app.delete('/accounts/:id', (req,res) => {
    Account.findByIdAndRemove(req.params.id, (err, account) => {
        if (err) return res.status(400).send({Error: err})
        if (!account) return res.status(400).send({Error: "Account does not exist"})
        console.log('Deleted: ', account)
        res.status(204).send()
    })
})

// Server bootup
console.log('Listening on port 3000')
app.listen(3000)
