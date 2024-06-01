const path = require('path');

const { v4: uuidv4 } = require('uuid');

const { fileExtension }  = require('./fileExtension');

const fileUpload = ( files, folder = '' ) => {

    return new Promise( (resolve, reject) =>{

        const { file } = files;
        fileExtension( file ).then(fileExt => {
            const tempName = uuidv4() + "." + fileExt;
            const uploadPath = path.join( __dirname, folder, tempName );
            file.mv( uploadPath, (err) => {
                if (err) {
                    reject(err);
                }
                resolve( uploadPath );
            });
        }).catch(err => {
            reject(err);
        });

    })

}


module.exports =  {fileUpload} ;