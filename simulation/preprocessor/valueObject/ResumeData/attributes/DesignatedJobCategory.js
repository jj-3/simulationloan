"use strict";
const { CategoryType } = require("../../../general/Types")

const category = new Map()
category.set(0, "指定職種無")

/** 指定職種有無区分 */
class DesignatedJobCategory extends CategoryType {
    constructor(designatedJobCategory) {
        var desc = {name: "designatedJobCategory", group: "calcurated"}
        super(designatedJobCategory, { category }, desc)
    }
    static of (designatedJobCategory) {
        return new this(designatedJobCategory)
    }
}
module.exports = DesignatedJobCategory;