"use strict";
const { CategoryType } = require("../../../general/Types")

const category = new Map()
category.set(1, "上場一部")
category.set(2, "上場二部")
category.set(3, "新興市場上場")
category.set(4, "非上場")

class CompanyCategory extends CategoryType {
    constructor(companyCategory) {
        var desc = {name: "companyCategory", group: "input"}
        super(companyCategory, { category }, desc)
    }
}
module.exports = CompanyCategory