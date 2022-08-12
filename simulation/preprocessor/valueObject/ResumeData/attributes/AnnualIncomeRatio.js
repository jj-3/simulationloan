"use strict";
const { NumberType } = require("../../../general/Types")

const digits = 1

/** 年収倍率 */
class AnnualIncomeRatio extends NumberType {
    constructor(annualIncomeRatio) {
        var desc = {name: "annualIncomeRatio", group: "calcurated"}
        super(annualIncomeRatio, { digits }, desc);
    }
    static of(repayment, lastAnnualIncome) {
        const annualIncomeRatio = repayment.toNumber() / lastAnnualIncome.toNumber();
        return new AnnualIncomeRatio(annualIncomeRatio);
    }
}
module.exports = AnnualIncomeRatio;
