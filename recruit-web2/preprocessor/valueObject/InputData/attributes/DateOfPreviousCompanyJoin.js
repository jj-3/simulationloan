"use strict";
const { DateType } = require("../../../general/Types")

const format = "YYYYMMDD"
const tz = "Asia/Tokyo"

class DateOfPreviousCompanyJoin extends DateType {
    constructor(dateOfPreviousCompanyJoin, opt={}) {
        opt.format = opt.format || format
        opt.tz = opt.tz || tz

        var desc = {name: "dateOfPreviousCompanyJoin", group: "input"}
        super(dateOfPreviousCompanyJoin, opt,desc)
    }
    static of(dateOfPreviousCompanyJoin) {
        return new this(dateOfPreviousCompanyJoin, {format, tz});
    }
}
module.exports = DateOfPreviousCompanyJoin;