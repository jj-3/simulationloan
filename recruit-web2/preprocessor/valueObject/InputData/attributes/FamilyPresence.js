"use strict";
const { BooleanType } = require("../../../general/Types")

class FamilyPresence extends BooleanType {
    constructor(familyPresence) {
        var desc = {name: "familyPresence", group: "input"}
        super(familyPresence, desc)
    }
}
module.exports = FamilyPresence