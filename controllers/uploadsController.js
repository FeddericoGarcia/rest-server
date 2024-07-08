const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLODINARY_URL );

const { _fileUpload } = require("../helpers");
const {Product, User } = require("../models");

const uploadFile = async ( req, res ) => {
    try {
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

//
// ****** EN CASO DE REQUERIR ALMACENAMIENTO INTERNO Y/O EN OTRA DATABASE 
// ****** ES POSIBLE DESCOMENTAR Y MODIFICAR ESTA FUNCIÓN.
//
// const loadImg = async ( req, res ) => {
//     const { collection, id } = req.params;
//     let _model;

//     switch ( collection ) {
//         case "users":
//             try {
//                 _model = await User.findById( id );
//                 if (!_model) {
//                     return res.status(400).json({
//                         msg: `Inexistent user with the ID ${id}`
//                     });
//                 }
//                 break;
//             } catch (error) {
//                 console.log(error)
//             }
//         case "products":
//             try {
//                 _model = await Product.findById( id );
//                 if (!_model) {
//                     return res.status(400).json({
//                         msg: `Inexistent product with the ID ${id}`
//                     });
//                 }
//                 break;
//             } catch (error) {
//                 console.log(error)
//             }
//         default:
//             return res.status(400).json({
//                 msg: `Invalid collection: ${collection}`
//             });
//     }
    
//     deletePreviousImg( _model, collection );

//     const newModel = await _fileUpload(req.files, '../uploads/' + collection );
//     if (!newModel) {
//         return res.status(500).json({
//             msg: `Error uploading file`
//         });
//     }

//     _model.img = newModel;

//     try {
//         await _model.save();
//         res.status(200).json({
//             msg: `File uploaded successfully`,
//             file: _model
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             msg: `Error saving file to the model`
//         });
//     }
// };

const loadImgCloudinary = async ( req, res ) => {
    const { collection, id } = req.params;
    let _model;

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
    
    deletePreviousImg( _model, collection );

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

    _model.img = secure_url;

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

const showImg = async ( req, res ) =>{
    const { collection, id } = req.params;
    let _model;

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

    try {
        if( _model.img ){
            const pathImg = path.join( __dirname, '../uploads', collection, _model.img );
            if( fs.existsSync( pathImg ) ){
                return res.sendFile( pathImg );
            }
        } 

        returnPlaceholderImg( res );

    } catch (error) {
        console.log(error);
    }
}

const returnPlaceholderImg = ( res ) => {
    const pathImg = path.join( __dirname, '../assets/no-image.jpg');
    return res.sendFile( pathImg );
}

const deletePreviousImg = ( _model, collection ) =>{
    try {
        if( _model.img ){
            const nameArr = _model.img.split('/');
            const imgName = nameArr[nameArr.length - 1];
            const  [ public_id ] = imgName.split('.');
            cloudinary.uploader.destroy( public_id );
        }
    } catch (error) {
        console.log( error );
    }
}


module.exports = {
    uploadFile,
    // loadImg,
    loadImgCloudinary,
    showImg
}