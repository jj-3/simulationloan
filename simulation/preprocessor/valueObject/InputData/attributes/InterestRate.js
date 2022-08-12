"use strict";
const { StringType } = require("../../../general/Types")

const format = /^-?(\d+\.\d+|\d+)$/

class InterestRate extends StringType {
    constructor(interestRate) {
        var desc = {name: "interestRate", group: "input"}
        super(interestRate, { format }, desc)
    }
    toNumber() {
        return Number(this.value)
    }
}
module.exports = InterestRate;
