"use strict";
const { StringType } = require("../../../general/Types")

const format = /^[0-9]{7}$/

class PostalCode extends StringType {
    constructor(postalCode) {
        var desc = {name: "postalCode", group: "input"}
        super(postalCode, { format }, desc)
    }
    get() {
        return this.postalCode;
    }
}
module.exports = PostalCode;
