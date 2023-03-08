const multer = require ('multer');
const path = require('path');


const storage = multer.diskStorage({

     destination : function (req, file, cb){

        cb(null, path.join(__dirname, '../../public/images/users'));

     },

     filename : function (req, file, cb){

      cb(null, 'product-' + Date.now() + path.extname(file.originalname));
     
      }
});

const uploadUser = multer({storage});

module.exports = uploadUser;