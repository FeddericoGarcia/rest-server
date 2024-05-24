const { Router } = require('express');
// const { check } = require('express-validator');

// const { inputValidator } = require('../middlewares/inputValidator');
const { search } = require('../controllers/searchController');

const router = Router();

router.get('/:collection/:term', search);


module.exports = router;