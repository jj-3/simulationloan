"use strict";
const { DateType } = require("../../../general/Types")

const format = "YYYYMMDD"
const tz = "Asia/Tokyo"

class DateOfCompanyJoin extends DateType {
    constructor(dateOfCompanyJoin, opt={}) {
        opt.format = opt.format || format
        opt.tz = opt.tz || tz

        var desc = {name: "dateOfCompanyJoin", group: "input"}
        super(dateOfCompanyJoin, opt, desc)
    }
    static of(dateOfCompanyJoin) {
        return new this(dateOfCompanyJoin, {format, tz});
    }
}
module.exports = DateOfCompanyJoin;
