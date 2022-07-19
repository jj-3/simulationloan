"use strict";
const { CategoryType } = require("../../../general/Types")

const category = new Map()
category.set(1, "10人未満")
category.set(3, "50人未満")
category.set(4, "100人未満")
category.set(6, "100人以上")

class NumberOfEmployees extends CategoryType {
    constructor(numberOfEmployees) {
        var desc = {name: "numberOfEmployees", group: "input"}
        super(numberOfEmployees, { category }, desc)
    }
}
module.exports = NumberOfEmployees;
