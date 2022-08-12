"use strict";
const { BooleanType } = require("../../../general/Types")

class ExistingLoanPresence extends BooleanType {
    constructor(existingLoanPresence) {
        var desc = {name: "existingLoanPresence", group: "input"}
        super(existingLoanPresence, desc)
    }
}
module.exports = ExistingLoanPresence