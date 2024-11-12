const multer = require("multer"); 
const path = require("path"); 
const express = require("express"); 
const os = require("os"); 
router = express.Router(); 
const {saveFile} = require("../controllers/productController"); 


const storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, os.tmpdir()); 
    }, 
    filename: (req, file, cb) => { 
        cb(null, Date.now() + path.extname(file.originalname));  // file is passed here correctly
    }
}); 

const upload = multer({storage: storage});

router.post("/save-file",upload.single('csvFile'), saveFile); 


module.exports = router; 