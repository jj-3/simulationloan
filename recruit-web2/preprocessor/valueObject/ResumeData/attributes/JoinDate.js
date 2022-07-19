"use strict";
const { DateType } = require("../../../general/Types")

const format = "YYYYMM"
const tz = "Asia/Tokyo"

const dayjs = require("dayjs")
dayjs.extend(require("dayjs/plugin/utc"))
dayjs.extend(require("dayjs/plugin/timezone"))
dayjs.extend(require("dayjs/plugin/isBetween"))
dayjs.tz.setDefault("Asia/Tokyo")

const { ValidationErrors } = require("../../../general/Errors")

/** 入社年月日 */
class JoinDate extends DateType {
    constructor(joinDate) {
        var desc = {name: "joinDate", group: "calcurated"}
        super(joinDate, {format, tz}, desc);
    }
    static of(dateOfCompanyJoin,dateOfPreviousCompanyJoin,birthday, dtToday) {        
        const dtJoinDate = dateOfCompanyJoin.toDate(); //現職の入社年月日

        const dtBirthday = birthday.toDate();

        const dtAtFifteenth = dtBirthday.add(15, "year")
        var year = dtAtFifteenth.year()
        if (dtAtFifteenth.month() >= 3) {
            year += 1
        }

        const dtWorkable = dayjs(new Date(year, 3, 1)) // 満15歳の4/1

        if (!dtJoinDate.isBetween(dtWorkable, dtToday, "day", "[]")) {
            var workable = dtWorkable.format(format)
            var today = dtToday.format(format)
            throw new ValidationErrors.RangeError(
                `Value must be in range between '${workable}' and '${today}'. (at calcurated 'joinDate')`
            )
        }

        const termOfService = dtToday.diff(dtJoinDate, "year");//現職の勤続年数を算出
        if (!dateOfPreviousCompanyJoin.value){
            return new JoinDate(dtJoinDate.format(format));
        } else {
            const dtPreviousJoinDate = dateOfPreviousCompanyJoin.toDate();
            const oldTermOfService = dtToday.diff(dtPreviousJoinDate,"year") - termOfService;  
            // 勤続年数が長い方を採用する
            if(termOfService < oldTermOfService){
                return new JoinDate(dtPreviousJoinDate.format(format));
            }else{
                return new JoinDate(dtJoinDate.format(format));
            }
        }        
    }
}
module.exports = JoinDate;
