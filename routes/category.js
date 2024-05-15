const { Router } = require('express');
const { check } = require('express-validator');

const { pathGet } = require('../controllers/categoryController');

const {
    inputValidator,
    validateJWT
} = require('../middlewares');

const router = Router();

router.get('/',[
    inputValidator
], pathGet)

router.get('/:id',[
    inputValidator
], pathGet)

router.post('/',[
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    inputValidator
], pathGet)

router.put('/:id',[
    inputValidator
], pathGet)

router.delete('/:id',[
    inputValidator
], pathGet)

module.exports = router;