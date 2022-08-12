"use strict";

const { IntegerType } = require("../../../general/Types")
const limit = { upper: 35 }

/** ローン返済期間計算 */
class RepaymentPeriod extends IntegerType {
    constructor(repayPeriod) {
        var desc = {name: "repayPeriod", group: "calcurated"}
        super(repayPeriod, {limit}, desc);
    }
    static of(age, repaymentPeriodAge) {
        const repayPeriod = repaymentPeriodAge.toNumber() - age.toNumber();
        return new this(repayPeriod);
    }
    get() {
        return this.value;
    }
}
module.exports = RepaymentPeriod;
