"use strict";
const { CategoryType } = require("../../../general/Types")

const category = new Map()
category.set(10, "建設・建築・土木")
category.set(20, "製造")
category.set(30, "情報・通信")
category.set(40, "運輸")
category.set(50, "卸売・小売")
category.set(60, "電気・ガス・水道")
category.set(70, "不動産")
category.set(80, "飲食・宿泊")
category.set(90, "金融・保険")
category.set(100, "公務員")
category.set(110, "医療・介護・福祉")
category.set(120, "農林鉱漁")
category.set(800, "無職")
category.set(900, "その他")

class IndustryCategory extends CategoryType {
    constructor(industryCategory) {
        var desc = {name: "industryCategory", group: "input"}
        super(industryCategory, { category }, desc)
    }
}
module.exports = IndustryCategory;
