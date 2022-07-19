"use strict";
const { BooleanType } = require("../../../general/Types")

class InsuranceStatus extends BooleanType {
    constructor(insuranceStatus) {
        var desc = {name: "insuranceStatus", group: "input"}
        super(insuranceStatus, desc)
    }
}
module.exports = InsuranceStatus;
