"use strict";
const { IntegerType } = require("../../../general/Types")

class BonusRatio extends IntegerType {
    constructor(bonusRatio) {
        var desc = {name: "bonusRatio", group: "input"}
        super(bonusRatio, {}, desc)
    }
}
module.exports = BonusRatio;
