const { fileUpload } = require("../helpers");

const pathPost = async ( req, res ) => {

    try {

        if ( !req.files || Object.keys(req.files).length === 0 || !req.files.file ){
            return res.status(400).json({
                msg: `No files were uploaded.`
            });
        }

        
        const newFile = await fileUpload( req.files, '../uploads' );

        res.status(201).json({
            msg: `File uploaded successfully`,
            file: newFile
        })
        
            
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