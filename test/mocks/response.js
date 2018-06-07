var sinon = require("sinon");

module.exports = function getResMockObj() {
    var result = {
        spies: {
            send: sinon.spy(),
            json: sinon.spy()
        }
    };

    result.spies.status = result.status = sinon.spy(function() {
        return {
            send: result.spies.send,
            json: result.spies.json
        };
    });

    return result;
};
