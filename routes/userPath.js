const { Router } = require('express');
const { check } = require('express-validator');

const {
    inputValidator,
    validateJWT,
    haveRole
} = require('../middlewares');

const { pathGet, pathPatch, pathPut, pathPost, pathDelete } = require('../controllers/userController');
const { verifyRole, verifyEmail, verifyID } = require('../helpers/validators');

const router = Router();

router.get('/', pathGet);

router.patch('/', pathPatch);

router.put('/:id', [
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom( verifyID ),
    check('role').custom( verifyRole ),
    inputValidator
], pathPut);

router.post('/',[
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password is required ( min 6 length )').isLength({ min: 6 }),
    check('email').custom( verifyEmail ),
    check('role').custom( verifyRole ),
    inputValidator
] , pathPost);

router.delete('/:id',[
    validateJWT,
    haveRole('ADMIN', 'MOD'),
    check('id', 'It is not a valid ID').isMongoId(),
    check('id').custom( verifyID ),
    inputValidator
], pathDelete);

module.exports = router;
