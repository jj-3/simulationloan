"use strict";
const { NumberType } = require("../../../general/Types")

class Score extends NumberType {
    constructor(score) {
        var desc = {name: "score", group: "calcurated"}
        super(score, {}, desc);
    }
    static of(score) {
        return new this(Number(score));
    }
}
module.exports = Score;
