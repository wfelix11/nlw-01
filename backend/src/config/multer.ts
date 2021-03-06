import multer from 'multer';
import path from 'path';
import crypto from 'crypto';


export default {
    storage : multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.resolve(__dirname, '..', '..', 'uploads'))
        },

        filename: function (req, file, cb) {
            const hash = crypto.randomBytes(6).toString('hex');

            const fileName = `${hash}-${file.originalname}`;

            cb(null, fileName);
        } 
    }),
};