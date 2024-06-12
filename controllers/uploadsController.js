const { _fileUpload } = require("../helpers");
const Product  = require("../models/product");
const User = require("../models/user");

const uploadFile = async ( req, res ) => {

    try {

        if ( !req.files || Object.keys(req.files).length === 0 || !req.files.file ){
            return res.status(400).json({
                msg: `No files were uploaded.`
            });
        }

        
        const newFile = await _fileUpload( req.files, '../uploads' );

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
    let _model;

    if ( !req.files || Object.keys(req.files).length === 0 || !req.files.file ){
        return res.status(400).json({
            msg: `No files were uploaded.`
        });
    }

    switch ( collection ) {
        case "users":
            try {
                _model = await User.findById( id );
                if (!_model) {
                    return res.status(400).json({
                        msg: `Inexistent user with the ID ${id}`
                    });
                }
                break;
            } catch (error) {
                console.log(error)
            }
        case "products":
            try {
                _model = await Product.findById( id );
                if (!_model) {
                    return res.status(400).json({
                        msg: `Inexistent product with the ID ${id}`
                    });
                }
                break;
            } catch (error) {
                console.log(error)
            }
        default:
            return res.status(400).json({
                msg: `Invalid collection: ${collection}`
            });
    }
    
    const newModel = await _fileUpload(req.files, '../uploads/' + collection );
    if (!newModel) {
        return res.status(500).json({
            msg: `Error uploading file`
        });
    }

    _model.img = newModel;

    try {
        await _model.save();
        res.status(200).json({
            msg: `File uploaded successfully`,
            file: _model
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Error saving file to the model`
        });
    }
};


module.exports = {
    uploadFile,
    loadImg
}