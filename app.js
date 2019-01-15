const express = require('express'),
      app     = express(),
      multer  = require('multer'),
      ejs     = require('ejs'),
      path    = require('path')

// set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads', //the destination where the file will be stored
    filename: function(req,file,cb) {
        cb(null, file.fieldname + '-' + Date.now() + 
        path.extname(file.originalname));
    }
})
// Init upload 
const upload = multer({
    storage: storage,
    limit: {filesize: 10}, // limit would be how big filesize could be.. 
    fileFilter: function(req,file,cb) {
        checkFileType(file, cb)
    }
}).single('myImage');
// .single might need to be changed Array to add multiple files
// enctype="multipart/form-data" also when adding a file in the front end
function checkFileType(file,cb) {
    // Allowed extension
    const filetypes = /jpeg|jpg|png|gif/;
    //check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());  
    //mimetype
    const mimetype = filetypes.test(file.mimetype)
}

app.set('view engine' ,'ejs')
app.use(express.static('./public'))

app.get('/', (req,res) => { res.render('index') })

app.post('/upload', (req,res) => {
    upload(res,res , (err) => {
        if(err) {
            res.render('index' , {
                msg: err
            })
        }else {
            console.log(req.file);
            res.send('test')
        }
    })
})

const Port = 3000
app.listen( Port , () => {
    console.log(`Listening on Port ${Port}`)
})