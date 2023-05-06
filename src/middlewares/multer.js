const multer = require ('multer');
const path = require('path');


const storage = multer.diskStorage({

     destination : function (req, file, cb){

            if(file.fieldname == "product_image"){

               cb(null, path.join(__dirname, '../../public/images/products'));
            
            }else if(file.fieldname == "user_image_edit"){

               cb(null, path.join(__dirname, '../../public/images/users'));
            }
             

     },

     filename : function (req, file, cb){

      if(file.fieldname == "product_image"){
      cb(null, 'product-' + Date.now() + path.extname(file.originalname));
     
   }else if(file.fieldname == "user_image"){
      
      cb(null, 'user-' + Date.now() + path.extname(file.originalname));
      }

   }
});

const upload = multer({storage});


module.exports = upload;

