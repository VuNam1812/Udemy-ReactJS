const multer = require('multer');

module.exports = {
    UploadCategories: function (req, res, next) {
        const storage = multer.diskStorage({
            destination: function(req,file,cb){
              cb(null, './public/imgs/Categories');
            },
            filename: function (req,file, cb){
                cb(null, Date.now() + '-' + file.originalname);
            }
           });
        return multer({storage: storage});
    },
    UploadUser: function (req, res, next) {
        const storage = multer.diskStorage({
            destination: function(req,file,cb){
              cb(null, './public/imgs/Users');
            },
            filename: function (req,file, cb){
                cb(null, Date.now() + '-' + file.originalname);
            }
           });
        return multer({storage: storage});
    },
    UploadCourses: function (req, res, next) {
        const storage = multer.diskStorage({
            destination: function(req,file,cb){
              cb(null, './public/imgs/Courses');
            },
            filename: function (req,file, cb){
                cb(null, Date.now() + '-' + file.originalname);
            }
           });
        return multer({storage: storage});
    },

    UploadVideoLecture: function (req, res, next) {
        const storage = multer.diskStorage({
            destination: function(req,file,cb){
              cb(null, './public/videos');
            },
            filename: function (req,file, cb){
                cb(null, Date.now() + '-' + file.originalname);
            }
           });
        return multer({storage: storage});
    },
}