const server = require("../config/server");

module.exports = {
    handleServerErrorResponse: (res, error) => {
        if(server.ENV === 'production') {
            res.status(500).send({
                message: 'A server error occured'
            });
            res.end();
        }
        else {
            console.log(error);
            res.status(500).send(error);
            res.end();
        }
    },
    
    handleNotFoundResponse: (res) => {
        res.status(404).json({
            message: 'Resource does not exist'
        });
        res.end();
    }
};