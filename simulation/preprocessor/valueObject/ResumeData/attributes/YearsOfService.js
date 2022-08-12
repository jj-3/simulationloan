"use strict";
const { IntegerType } = require("../../../general/Types")

/** 勤続年数 */
class YearsOfService extends IntegerType {
    constructor(yearsOfService, opt={}) {
        var desc = {name: "yearsOfService", group: "calcurated"}
        super(yearsOfService, opt, desc);
    }
    static of(dateOfCompanyJoin, dateOfPreviousCompanyJoin, employmentType, today) {
        const joinDate = dateOfCompanyJoin.toDate();
        const termOfService = today.diff(joinDate, "year");//現職の勤続年数を算出
 
        const employType = employmentType.toString();
        const range = {}

        if (employType == "1") {
            range.ge = 1
        }
        else if (employType == "3" || employType == "4") {
            range.ge = 2
        }
        else if (employType == "90") {
            range.ge = 5
        }
        else {
            range.ge = Infinity
        }

        if (!dateOfPreviousCompanyJoin.value){
            return new this(termOfService, { range });
        } else {
            const oldJoinDate = dateOfPreviousCompanyJoin.toDate();
            const oldTermOfService = today.diff(oldJoinDate,"year") - termOfService;
            
            // 勤続年数が長い方を採用する
            if(termOfService < oldTermOfService){
                return new this(oldTermOfService, { range });       
            }else{
                return new this(termOfService, { range });
            }
        }
    }
}
module.exports = YearsOfService;
