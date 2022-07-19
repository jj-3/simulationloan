"use strict";
const { IntegerType } = require("../../../general/Types")

const range = { ge: 0 }

class LastYearSalary extends IntegerType {
    constructor(lastYearSalary) {
        var desc = {name: "lastYearSalary", group: "input"}
        super(lastYearSalary, {range}, desc)
    }
}   
module.exports = LastYearSalary;




