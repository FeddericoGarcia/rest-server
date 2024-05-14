

const pathGet = (res, req) => {

    try {
        res.status(200).json({
            msg: 'GET CATEGORY CONTROLLER OK'
        });
    } catch (err) {
        res.status(500).json({
            msg: 'GET CATEGORY CONTROLLER ERROR'
        });
    }

}

module.exports = {
    pathGet,
}