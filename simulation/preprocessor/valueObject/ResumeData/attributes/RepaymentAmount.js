"use strict";
const { IntegerType } = require("../../../general/Types")
const limit = { upper: 100000000 }; // 借り入れ金額上限１億円

/** ローン返済額計算 */
class RepaymentAmount extends IntegerType {
    constructor(repayment) {
        var desc = {name: "repayment", group: "calcurated"}
        super(repayment, { limit }, desc);
    }
    
    static of(lastAnnualIncome, repaymentPeriod, interestRate) {

        let payment;

        //合計年収700万未満は返済比率34％,700万以上は30％
        if(lastAnnualIncome >= 7000000){
            payment = 0.3;
        }else{
            payment = 0.34;
        }
        const repayment = lastAnnualIncome.toNumber() * payment;
        const annualInterest = 1 + interestRate.toNumber();
        const repayPeriod = repaymentPeriod.toNumber();
        
        const numbOfDecimalPlaces = 14; // 小数点以下の桁数がmacの電卓とnodeの桁数でdefaultが異なるため、計算結果に齟齬が発生しない桁数を指定
        const interest = Number((annualInterest ** repayPeriod).toFixed(numbOfDecimalPlaces));
        const magicNum = interest - 1;
        const baseInterest = repayment * magicNum;
        const data = baseInterest / interest / interestRate.toNumber();
        return new this(Number(data.toFixed()));
        }
}

module.exports = RepaymentAmount;
