"use strict";
const { DateType } = require("../../../general/Types")

const format = "YYYYMMDD"
const tz = "Asia/Tokyo"

class Birthday extends DateType {
    constructor(birthday) {
        var desc = {name: "birthday", group: "input"}
        super(birthday, {format, tz}, desc)
    }
}
module.exports = Birthday;
