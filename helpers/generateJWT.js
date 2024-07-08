const jwt = require('jsonwebtoken');

const generateJWT = ( uid ) =>{

    return new Promise(( resolve, reject ) => {

        const payload = { uid }

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '1h'
        }, ( err, token ) => {
            if ( err ) {
                console.error( err );
                reject('There was an error generating the JWT');
            }else{
                resolve( token );
            }
        });
    
    });

};

module.exports = { 
    generateJWT 
};