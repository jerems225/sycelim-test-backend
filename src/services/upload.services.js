require('dotenv').config();
const { SUPABASE_BUCKET, SUPABASE_DIRECTORY } = process.env;
const supabase = require('./superbaseClient');
const multer = require('multer');
const HttpError = require('../utils/HttpError');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadFile = async (file) => {
    try {
        if (!file) {
            throw new HttpError(404, 'No file provided', null);
        }

        const fileExt = file.originalname.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${SUPABASE_DIRECTORY}/${fileName}`;
        

        const { error } = await supabase.storage
            .from(SUPABASE_BUCKET)
            .upload(filePath, file.buffer, {
                contentType: file.mimetype,
                upsert: false,
            });

        if (error) {
            throw new HttpError(error.status, error.message, error.data)
        }

        const { data } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(SUPABASE_DIRECTORY);
        const fileUrl = `${data.publicUrl}/${fileName}`;


        return fileUrl;
    } catch (err) {
        throw new HttpError(err.status, err.message, err.data)
    }
}

module.exports = {
    upload,
    uploadFile
}