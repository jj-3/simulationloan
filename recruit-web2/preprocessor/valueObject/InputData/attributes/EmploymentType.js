"use strict";
const { CategoryType } = require("../../../general/Types")

const category = new Map()
category.set(1, "正社員") 
category.set(3, "法人役員") 
category.set(4, "自営業") 
category.set(90, "派遣・契約・嘱託社員") 

class EmploymentType extends CategoryType {
    constructor(employmentType) {
        var desc = {name: "employmentType", group: "input"}
        super(employmentType, { category }, desc)
    }
    static of(employmentType) {
        return new this(employmentType);
    }
}
module.exports = EmploymentType;
