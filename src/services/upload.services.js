const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const upload = multer({ dest: 'public/cover/'});

const uploadFile = async (req, res, next) => {
    try{
        const file = req.file;
        if(!file){
            return res.status(400).json({
                status: 400,
                message: "No file Uploaded !",
                data: null
            });
        }
    
        const fileName = uuidv4() + Date.now() + file.originalname
        const filePath = path.join(__dirname,'../../public/', 'cover', fileName);
        fs.renameSync(file.path, filePath);
    
        return {file, fileName};
    }catch(err){
        next(err);
    }
}

module.exports = {
    upload,
    uploadFile
}