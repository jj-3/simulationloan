"use strict";
const { IntegerType } = require("../../../general/Types")

const range = { ge: 0 }

class OneTimePayment extends IntegerType {
    constructor(oneTimePayment) {
        var desc = {name: "oneTimePayment", group: "input"}
        super(oneTimePayment, { range }, desc)
    }
}
module.exports = OneTimePayment;
