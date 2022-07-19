"use strict";
const { CategoryType } = require("../../../general/Types")

const category = new Map()
category.set(1, "新築")
category.set(2, "中古")

/** 新築中古 購入区分 */
class PurchaseCategory extends CategoryType {
    constructor(purchaseCategory) {
        var desc = {name: "purchaseCategory", group: "calcurated"}
        super(purchaseCategory, { category }, desc);
    }
    static of(loanPurpose) {
        return new this(loanPurpose.toBoolean() ? 1 : 2);
    }
}
module.exports = PurchaseCategory;
