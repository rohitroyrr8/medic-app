import multer = require('multer');
import path = require('path');
import * as express from 'express';

var storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
    
        // Uploads is the Upload_folder_name 
        cb(null, __dirname + '../../../../public/images/uploads')
    }, 
    filename: function (req, file, cb) { 
        // cb(null, file.fieldname + "-" + Date.now()+".jpg") 
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    } 
})
const maxSize = 10 * 1000 * 1000; 

var upload = multer({  
    storage: storage, 
    limits: { fileSize: maxSize }, 
    fileFilter: function (req, file, cb){ 
    
        // Set the filetypes, it is optional 
        var filetypes = /jpeg|jpg|png|pdf/; 
        var mimetype = filetypes.test(file.mimetype); 
    
        var extname = filetypes.test(path.extname( 
                    file.originalname).toLowerCase()); 
        
        if (mimetype && extname) { 
            return cb(null, true); 
        } 
        
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes); 
        }  
    
// mypic is the name of file attribute 
}).single("report"); 

function pushObject(req: any, res: any) {
    upload(req,res, function(err) { 
  
        if(err) { 
  
            // ERROR occured (here it can be occured due 
            // to uploading image of size greater than 
            // 1MB or uploading different file type) 
            console.log(err);
            res.send();
        } 
        else { 
            // SUCCESS, image successfully uploaded 
            console.log("Success, Image uploaded!");
            req.session.filename = req.file.filename;
        } 
    })

}
module.exports.pushObject = pushObject;