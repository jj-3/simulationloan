"use strict";
const { CategoryType } = require("../../../general/Types")

const category = new Map()
category.set(0, "")

/** 事前審査結果区分  */
class PreScreeningCategory extends CategoryType {
    constructor(preScreeningCategory) {
        var desc = {name: "preScreeningCategory", group: "calcurated"}
        super(preScreeningCategory, { category }, desc);
    }
    static of(preScreeningCategory) {
        return new this(preScreeningCategory)
    }
}
module.exports = PreScreeningCategory;
