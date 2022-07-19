"use strict";
const { NumberType } = require("../../../general/Types")

const digits = 2

/** その他を含む返済負担比率 */
class RepaymentBurdenRatio extends NumberType {
    constructor(repaymentBurdenRatio) {
        var desc = {name: "repaymentBurdenRatio", group: "calcurated"}
        super(repaymentBurdenRatio, { digits }, desc);
    }
    static of(annualRepayment, lastYearSalary) {
        const repaymentBurdenRatio = annualRepayment.toNumber() / lastYearSalary.toNumber();
        return new this(repaymentBurdenRatio);
    }
}
module.exports = RepaymentBurdenRatio;
