"use strict";
const { IntegerType } = require("../../../general/Types")

const range = { ge: 0, le: 35 }

class RequestDuration extends IntegerType {
    constructor(requestDuration) {
        var desc = {name: "requestDuration", group: "input"}
        super(requestDuration, { range }, desc)
    }
}
module.exports = RequestDuration;
