const fileExtension = ( file, allowedExtensions = [ 
    'jpg', 
    'jpeg', 
    'png', 
    'gif', 
] ) => {

    return new Promise( ( resolve, reject ) =>{
        const shortName = file.name.split('.');
        const extension = shortName[shortName.length - 1];

        if (!allowedExtensions.includes(extension) ){
            reject(`The extension ${ extension } is not allowed, the corrects ones are ${ allowedExtensions }`);
            return;
        }

        resolve( extension );
    })
}

module.exports = { 
    fileExtension 
};