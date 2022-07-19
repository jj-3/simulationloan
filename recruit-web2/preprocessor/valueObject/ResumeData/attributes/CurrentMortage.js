"use strict";
const { boolean } = require("check-types");
const { CategoryType } = require("../../../general/Types");
 
const category = new Map()
category.set(0, "住宅ローン無")
category.set(1, "住宅ローン有")
 

class CurrentMortage extends CategoryType {
    constructor(currentMortgage) {
        var desc = {name: "currentMortgage", group: "calcurated"}
        super(currentMortgage, { category }, desc);
    }
    static of(existingLoanPresence,doubleLoan) {
        switch(doubleLoan.value){
            case true:
                return new this(0,existingLoanPresence);
                break;
            case false:
                return new this(1,existingLoanPresence);
                break;
        }   
    }
}
module.exports = CurrentMortage;