const { Router } = require('express');
const { check } = require('express-validator');

const { 
    pathGet, 
    pathGetID, 
    pathPost, 
    pathPut, 
    pathDelete  
} = require('../controllers/categoryController');

const {
    inputValidator,
    validateJWT,
    roleValid
} = require('../middlewares');

const { verifyCategory } = require('../helpers/validators');

const router = Router();

router.get('/',[
    inputValidator
], pathGet)

router.get('/:id',[
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom( verifyCategory ),
    inputValidator
], pathGetID)

router.post('/',[
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    inputValidator
], pathPost)

router.put('/:id',[
    validateJWT,
    check('id').custom( verifyCategory ),
    check('name', 'The name is required').not().isEmpty(),
    inputValidator
], pathPut)

router.delete('/:id',[
    validateJWT,
    roleValid,
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom( verifyCategory ),
    inputValidator
], pathDelete)

module.exports = router;