"use strict";
const { IntegerType } = require("../../../general/Types")

const limit = {upper: 79};

/** 完済時年齢 */
class RepaymentPeriodAge extends IntegerType {
    constructor(repaymentPeriodAge) {
        var desc = {name: "repaymentPeriodAge", group: "calcurated"}
        super(repaymentPeriodAge, {limit}, desc);
    }
    static of(age, requestDuration) {
        const reqDuration = requestDuration.toNumber();
        const repayPeriodAge = age.toNumber() + reqDuration;
        return new RepaymentPeriodAge(repayPeriodAge);
    }
}
module.exports = RepaymentPeriodAge;
