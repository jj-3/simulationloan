"use strict";
const { IntegerType } = require("../../../general/Types");

const range = { ge: 0 }

//連帯保証人の年収
class SpousalIncome extends IntegerType {
    constructor(spousalIncome) {
        var desc = {name: "spousalIncome", group: "input"}
        super(spousalIncome, { range }, desc)
        
    }
}   
module.exports = SpousalIncome;

