const { Router } = require('express');
const { check } = require('express-validator');

const { inputValidator } = require('../middlewares/inputValidator');
const { uploadFile, loadImg } = require('../controllers/uploadsController');
const { allowedCollections } = require('../helpers');
const { validateFile } = require('../middlewares');

const router = Router();

router.post('/', [
    validateFile
] ,uploadFile);

router.put('/:collection/:id', [
    check('id', 'It is not a valid MongoID').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users','products'])),
    validateFile,
    inputValidator
], loadImg );

module.exports = router;