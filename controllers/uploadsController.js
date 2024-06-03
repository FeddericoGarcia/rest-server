const { fileUpload } = require("../helpers");

const uploadFile = async ( req, res ) => {

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


const loadImg = async ( req, res ) => {

    const { collection, id } = req.params;

    return res.status(201).json({
        id,
        collection
    })
}

module.exports = {
    uploadFile,
    loadImg
}