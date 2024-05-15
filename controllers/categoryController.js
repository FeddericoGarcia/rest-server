const { response } = require('express');
const {User , Category} = require('../models');

const pathGet = async (req, res = response) => {

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
            category,
            // msg: 'GET CATEGORY CONTROLLER OK'
        });
    } catch (err) {
        console.log(err)
        res.status(403).json({
            msg: 'GET CATEGORY CONTROLLER ERROR'
        });
    }

}

module.exports = {
    pathGet,
}