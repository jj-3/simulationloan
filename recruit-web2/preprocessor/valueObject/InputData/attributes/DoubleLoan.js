//既にローンを組んでいる場合、完済するか否かの項目
"use strict";
const { boolean } = require("check-types");
const { BooleanType } = require("../../../general/Types")


class DoubleLoan extends BooleanType {
    constructor(DoubleLoan) {
        var desc = {name: "DoubleLoan", group: "input"}
        super(DoubleLoan, desc)
    }   
}
module.exports = DoubleLoan;