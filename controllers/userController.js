const encrypt = require('../helpers/encrypt');

const User = require('../models');

const pathGet = async ( req, res ) => {

    try {
        const { limit = 5, from = 0, state = true} = req.query;
        const [ total_docs, users] = await Promise.all([
            User.countDocuments({state}),
            User.find({state})
                .skip( Number(from) )
                .limit( Number(limit) )
        ]);
    
        res.status(201).json({
            total_docs,
            users
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({
            msg: 'Something went wrong...'
        });
        
    }
}

const pathPost = async ( req, res ) => {

    try {
        const {name, password, email, role, state, google} = req.body;
        const user = new User({name, password, email, role, state, google});
    
        user.password = encrypt(user.password);
    
        await user.save(); 
    
        res.status(201).json({
            user
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({
            msg: 'Something went wrong...'
        });
    }
}

const pathPut = async ( req, res ) => {

    try {
        const { id } = req.params;
        const { password, google, ...resto } = req.body;
    
        if ( password ) {
            resto.password = encrypt(password);
        }
    
        const user = await User.findByIdAndUpdate(id, resto);
        
        res.status(201).json({
            user
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({
            msg: 'Something went wrong...'
        });
    }
}

const pathPatch = ( req, res ) => {
    
    try {
        const body = req.body;
    
        res.status(201).json({
            body
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({
            msg: 'Something went wrong...'
        });
    }
}

const pathDelete = async ( req, res ) => {
    
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, { state: false});
        
        res.status(201).json({
            msg: 'User has been deleted',
            user
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({
            msg: 'Something went wrong...'
        });
    }
}
 

module.exports = {
    pathGet,
    pathPut,
    pathPatch,
    pathPost,
    pathDelete
}