const { Router } = require('express');
const { check } = require('express-validator');

const { inputValidator } = require('../middlewares/inputValidator');
const { pathPost, googleSignIn } = require('../controllers/authController');

const router = Router();

router.post('/login',[
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    check('password', 'Password may be longer ( min 6 length )').isLength({ min: 6 }),
    inputValidator
], pathPost);

router.post('/google',[
    check('id_token', 'The token google is required').not().isEmpty(),
    inputValidator
], googleSignIn );

module.exports = router;