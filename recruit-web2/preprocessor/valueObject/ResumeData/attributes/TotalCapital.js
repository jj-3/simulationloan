"use strict";
const { IntegerType } = require("../../../general/Types")

/** 所有資金 合計 */
class TotalCapital extends IntegerType {
    constructor(totalCapital) {
        var desc = {name: "totalCapital", group: "calcurated"}
        super(totalCapital, {}, desc);
    }
    static of(repayment, oneTimePayment) {
        /** 固定値として指定されているが意味は不明 */
        const staticNum = 2000000;
        const totalCapital = repayment.toNumber() + oneTimePayment.toNumber() + staticNum;
        return new TotalCapital(totalCapital);
    }
}
module.exports = TotalCapital;
