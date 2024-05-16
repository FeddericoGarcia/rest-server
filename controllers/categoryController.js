const { response } = require('express');
const { Category } = require('../models');

const pathGet = async (req, res = response) => {

    try {
        const { state = true } = req.query;
        const [ total_docs, categories] = await Promise.all([
            Category.countDocuments({state}),
            Category.find({state})
        ]);
    
        res.status(201).json({
            total_docs,
            categories
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({
            msg: 'Something went wrong in controller'
        });
        
    }

}

const pathGetID = async ( req, res ) => {
    
    try {
        const { id } = req.params
        const category = await Category.find({ id })

        if ( !category ) {
            console.log(category)
            res.status(403).json({
                msg: `There are not categories`
            })
        }

        res.status(200).json({
            category
        })

    } catch (error) {
        console.log(error)
        res.status(403).json({
            msg: 'Something went wrong in controller'
        });
    }

}
const pathPost = async ( req, res ) => {
    
    try {
        const name = req.body.name.toUpperCase();

        const categoryDB = await Category.findOne({ name });

        if ( categoryDB ){
            res.status(400).json({
                msg: `The category ${ categoryDB.name } is already registered`
            });
        }

        const data = {
            name,
            user: req.user._id
        }

        const category = new Category( data );

        await category.save();

        res.status(200).json({
            category
        });

    } catch (err) {
        console.log(err)
        res.status(403).json({
            msg: 'Something went wrong in controller'
        });
    }

}
const pathPut = async ( req, res ) => {

    try {
        const { id } = req.params;
        const { name, state, user } = req.body;

        if ( !name ) {
            res.status(401).json({
                msg: `There are incorrect parameters`
            });
        }
    
        const category = { name, state, user };
        
        await Category.findByIdAndUpdate(id, category);
        
        res.status(201).json({
            msg: `The category ${ category.name } is update`,
            category
        });

    } catch (error) {
        console.error(error);
        res.status(401).json({
            msg: 'Something went wrong in controller'
        });
    }
    
}
const pathDelete = async ( req, res ) => {
    
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndUpdate(id, { state: false});
        
        if( !category.state ){
            res.status(401).json({
                msg: `The category ${ category.name } is inactive, status in false`
            });
        }

        res.status(201).json({
            msg: 'Category has been deleted',
            category
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({
            msg: 'Something went wrong in controller'
        });
    }
}

module.exports = {
    pathGet,
    pathGetID,
    pathPost,
    pathPut,
    pathDelete,
}