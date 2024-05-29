
const bcryptjs = require('bcryptjs');

const generateJWT = require('../helpers/generateJWT');
const { googleVerify } = require('../helpers/googleVerify');

const User = require('../models/user');

const pathPost = async ( req, res ) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                msg: 'Invalid credentials - email or password - EMAIL'
            });
        }

        const validPassword = await bcryptjs.compare( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Invalid credentials - email or password - PASS'
            });
        }

        const token = await generateJWT( user.id );

        res.status(201).json({
            results: user
        });

    } catch (error) {

        console.log( error );
        res.status(500).json({
            msg: 'POST-CONTROLLER / LOGIN ERROR'
        });

    }
}

const googleSignIn = async ( req, res ) => {

    const { id_token } = req.body;

    try {

        const { name, img, email} = await googleVerify( id_token );

        let user = await User.findOne({ email });

        if ( !user ){
            const data = {
                name,
                email,
                password: "asd",
                img,
                role: "USER",
                state: true,
                google: true,
            }
            user = new User( data );
            await user.save();
        }

        if ( !user.state ) {
            return res.status(401).json({
                msg: `The user ${ user.email } is denied, please contact your admin`,
            })
        }

        const token = await generateJWT( user.id );

        res.status(201).json({
            results: user
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `The Google token cannot be verified`
        });
    }
}

module.exports = {
    pathPost,
    googleSignIn
}