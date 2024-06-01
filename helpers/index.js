const encrypt = require("./encrypt");
const fileExtension = require("./fileExtension");
const fileUpload = require("./fileUpload");
const generateJWT = require("./generateJWT");
const googleVerify = require("./googleVerify");
const validators = require("./validators");

module.exports = {
    ...encrypt,
    ...fileExtension,
    ...fileUpload,
    ...generateJWT,
    ...googleVerify,
    ...validators
}