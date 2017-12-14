const express = require('express')
const bodyParser = require('body-parser')
const contactsRouter = require('../contacts')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', contactsRouter)

app.get('/contactss',(req,res) => {
    contactsRouter.get
    //res.status(200).json(contactsRouter.get)
})
/*contactsRouter.get('/contacts', (req,res) => {
    res.status(200).json(contactList)
})*/


module.exports = app