const multer = require ('multer');
const path = require('path');


const Userstorage = multer.diskStorage({

     destination : function (req, file, cb){

        cb(null, path.join(__dirname, '../../public/images/users'));

     },

     filename : function (req, file, cb){

      cb(null, 'user-' + Date.now() + path.extname(file.originalname));
     
      }
});

const uploadUser = multer({Userstorage});

module.exports = uploadUser;