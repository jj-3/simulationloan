"use strict";
const { IntegerType } = require("../../../general/Types")

const range = { ge: 0 }

class LoanRequestAmount extends IntegerType {
    constructor(loanRequestAmount) {
        var desc = {name: "loanRequestAmount", group: "input"}
        super(loanRequestAmount, { range }, desc)
    }
}
module.exports = LoanRequestAmount;
