"use strict";
const { CategoryType } = require("../../../general/Types")

const category = new Map()
category.set(1, "新築戸建")
category.set(2, "新築マンション")
category.set(3, "中古戸建")
category.set(4, "中古マンション")

class LoanPurpose extends CategoryType {
    constructor(LoanPurpose) {
        var desc = {name: "LoanPurpose", group: "input"}
        super(LoanPurpose, { category }, desc)
    }
    toBoolean() {
        switch (this.value) {
            case 1:
            case 2: {
                return true;
            }
            case 3:
            case 4: {
                return false;
            }
        }
    }
}
module.exports = LoanPurpose;
