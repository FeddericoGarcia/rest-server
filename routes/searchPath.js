const { Router } = require('express');
const { check } = require('express-validator');

const { search } = require('../controllers/searchController');

const { inputValidator } = require('../middlewares');

const router = Router();

router.get('/:collection/:term',[
    // check('id', 'It is not a valid ID').isMongoId(),
    // inputValidator
], search);


module.exports = router;