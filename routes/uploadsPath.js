const { Router } = require('express');
// const { check } = require('express-validator');

// const { inputValidator } = require('../middlewares/inputValidator');
const { pathPost } = require('../controllers/uploadsController');

const router = Router();

router.post('/', pathPost);

module.exports = router;