// const generateJWT = require('../helpers/generateJWT');
const path = require('path');
const fileExtension = require('../helpers/fileExtension');

const pathPost = async ( req, res ) => {

    try {

        if ( !req.files || Object.keys(req.files).length === 0 || !req.files.file ){
            return res.status(400).json({
                msg: `No files were uploaded.`
            });
        }

        const { file } = req.files;

        fileExtension( file, res );

        uploadPath = path.join( __dirname, `../uploads/`, file.name );

        file.mv( uploadPath, (err) => {
            if (err){
                console.log( err );
                return res.status(500).json({ err });
            }
            
            res.status(201).json({
                msg: `File uploaded to ${ uploadPath }`
            });
        });
            
    } catch (error) {

        console.log( error );
        res.status(500).json({
            msg: "Somethings is wrong in the controller."
        });

    }
}


module.exports = {
    pathPost
}