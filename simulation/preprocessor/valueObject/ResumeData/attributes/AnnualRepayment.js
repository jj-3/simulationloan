"use strict";
const { IntegerType } = require("../../../general/Types")

/** 年間合計返済額 */
class AnnualRepayment extends IntegerType {
    constructor(annualRepayment) {
        var desc = {name: "annualRepayment", group: "calcurated"}
        super(annualRepayment, {}, desc);
    }
    static of(loanRequestAmount, repaymentPeriod, interestRate) {

        const annualInterest = 1 + interestRate.toNumber();//金利は0.02固定
        const repayPeriod = repaymentPeriod.toNumber();
        const numbOfDecimalPlaces = 14; // 小数点以下の桁数がmacの電卓とnodeの桁数でdefaultが異なるため、計算結果に齟齬が発生しない桁数を指定
        
        /** logic */
        const interest = Number((annualInterest ** repayPeriod).toFixed(numbOfDecimalPlaces));
        const magicNum = interest - 1;

        const calc1 = loanRequestAmount.toNumber() * interestRate.toNumber() * interest;
        const annualRepayment = calc1 / magicNum;
        return new this(Math.round(annualRepayment));
    }
}
module.exports = AnnualRepayment;
