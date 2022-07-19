"use strict";
const { CategoryType } = require("../../../general/Types")

const category = new Map()
category.set(1, "国民健康保険")
category.set(2, "社会保険")

/** 健康保険区分 */
class InsuranceCategory extends CategoryType {
    constructor(insuranceCategory) {
        var desc = {name: "insuranceCategory", group: "calcurated"}
        super(insuranceCategory, { category }, desc);
    }
    static of(insuranceStatus) {
        return new this(insuranceStatus.toBoolean() ? 1 : 2)
    }
}
module.exports = InsuranceCategory;
