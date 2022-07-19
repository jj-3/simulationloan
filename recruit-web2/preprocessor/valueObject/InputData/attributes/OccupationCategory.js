"use strict";
const { CategoryType } = require("../../../general/Types")

const category = new Map()
category.set(10, "管理職")
category.set(20, "事務")
category.set(30, "営業・販売")
category.set(40, "介護・看護")
category.set(50, "作業員・工員")
category.set(60, "専門・技術")
category.set(70, "運転")
category.set(80, "接客")
category.set(90, "医師・弁護士・会計士・税理士")
category.set(900, "その他")

class OccupationCategory extends CategoryType {
    constructor(occupationCategory) {
        var desc = {name: "occupationCategory", group: "input"}
        super(occupationCategory, { category }, desc)
    }
}
module.exports = OccupationCategory;
