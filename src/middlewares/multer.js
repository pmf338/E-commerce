const multer = require ('multer');
const path = require('path');


const storage = multer.diskStorage({

     destination : function (req, file, cb){

        console.log('destination', file);

        cb(null, path.join(__dirname, '../../public/images/products'));

     },

     filename : function (req, file, cb){

      console.log('filename', file);
        cb(null, 'product-' + Date.now() + path.extname(file.originalname));
     }
});

const upload = multer({storage});

module.exports = upload;