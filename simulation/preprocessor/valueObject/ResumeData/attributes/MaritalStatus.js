"use strict";
const { CategoryType } = require("../../../general/Types")

const category = new Map()
category.set(0, "同居配偶者無")
category.set(1, "同居配偶者有")

/** 同居配偶者有無 */
class MaritalStatus extends CategoryType {
    constructor(maritalStatus) {
        var desc = {name: "maritalStatus", group: "calcurated"}
        super(maritalStatus, { category }, desc);
    }
    static of(familyPresence) {
        return new this(familyPresence.toNumber())
    }
}
module.exports = MaritalStatus;
