const inputValidator = require('../middlewares/inputValidator');
const validateJWT = require('../middlewares/validateJWT');
const rolesValidator = require('../middlewares/rolesValidator');
const validateFile = require('../middlewares/validateFile');

module.exports = {
    ...inputValidator,
    ...validateJWT,
    ...rolesValidator,
    ...validateFile,
}