const express = require('express'),
      app     = express(),
      multer  = require('multer'),
      ejs     = require('ejs'),
      path    = require('path')

app.set('view engine' ,'ejs')

app.use(express.static('./public'))

app.get('/', (req,res) => { res.render('index') })

const Port = 3000
app.listen( Port , () => {
    console.log(`Listening on Port ${Port}`)
})