
const fileExtension = ( file, res ) => {

    const shortName = file.name.split('.');
    const extension = shortName[shortName.length - 1];
    const allowedExtensions = [ 'jpg', 'jpeg', 'png', 'gif', 'pdf' ]

    if (!allowedExtensions.includes(extension) ){
        res.status(400).json({
            msg: `The extension ${ extension } is not allowed, the corrects ones are ${ allowedExtensions }`,
        });
        return;
    }

    return extension;
}

module.exports = fileExtension;