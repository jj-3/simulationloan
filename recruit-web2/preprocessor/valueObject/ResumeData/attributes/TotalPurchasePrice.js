"use strict";
const { IntegerType } = require("../../../general/Types")

/** 合計購入価格 */
class TotalPurchasePrice extends IntegerType {
    constructor(totalPurchasePrice) {
        var desc = {name: "totalPurchasePrice", group: "calcurated"}
        super(totalPurchasePrice, {}, desc);
    }
    static of(repayment, oneTimePayment) {
        const totalPurchasePrice = repayment.toNumber() + oneTimePayment.toNumber();
        return new TotalPurchasePrice(totalPurchasePrice);
    }
}
module.exports = TotalPurchasePrice;
