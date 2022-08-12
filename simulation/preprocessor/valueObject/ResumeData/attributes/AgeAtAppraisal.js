"use strict";
const { IntegerType } = require("../../../general/Types")

const range = { ge: 20, lt: 65 }

/** 審査時の年齢 */
class AgeAtAppraisal extends IntegerType {
    constructor(ageAtAppraisal) {
        var desc = {name: "ageAtAppraisal", group: "calcurated"}
        super(ageAtAppraisal, { range }, desc)
    }
    static of(birthday, today, opt) {
        const birthDay = birthday.toDate();
        const ageAtAppraisal = today.diff(birthDay, "year");

        return new this(ageAtAppraisal);
    }
}

module.exports = AgeAtAppraisal;
