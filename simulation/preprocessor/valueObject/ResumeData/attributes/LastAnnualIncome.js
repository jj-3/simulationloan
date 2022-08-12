"use strict";
const { IntegerType } = require("../../../general/Types")

const range = { ge: 100 * 10**4 } // 年収下限100万円
// const limit = { upper: 11000000 * 10**4 } // 年収上限11000万円

/** 本人採用年収(審査基準年収？) */
class LastAnnualIncome extends IntegerType {
    constructor(lastAnnualIncome) {
        var desc = {name: "lastAnnualIncome", group: "calcurated"}
        super(lastAnnualIncome, { range }, desc);
    }
    //連帯保証人の収入の半分を前年度年収に加算する
    static of(lastYearSalary,spousalIncome) {
        return new this(Math.floor(spousalIncome.toNumber()/ 2) + lastYearSalary.toNumber());
    }
}
module.exports = LastAnnualIncome;
