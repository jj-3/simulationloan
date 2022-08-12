"use strict";

/** create resume data */
const AnnualRepayment = require("./attributes/AnnualRepayment");
const RepaymentAmount = require("./attributes/RepaymentAmount");
const RepaymentPeriod = require("./attributes/RepaymentPeriod");
const AgeAtAppraisal = require("./attributes/AgeAtAppraisal");
const PreScreeningCategory = require("./attributes/PreScreeningCategory");
const PurchaseCategory = require("./attributes/PurchaseCategory");
const LastAnnualIncome = require("./attributes/LastAnnualIncome");
const TotalPurchasePrice = require("./attributes/TotalPurchasePrice");
const AnnualIncomeRatio = require("./attributes/AnnualIncomeRatio");
const RepaymentBurdenRatio = require("./attributes/RepaymentBurdenRatio");
const DesignatedJobCategory = require("./attributes/DesignatedJobCategory");
const TotalCapital = require("./attributes/TotalCapital");
const RepaymentPeriodAge = require("./attributes/RepaymentPeriodAge");
const MaritalStatus = require("./attributes/MaritalStatus");
const CurrentMortage = require("./attributes/CurrentMortage");
const InsuranceCategory = require("./attributes/InsuranceCategory");
const JoinDate = require("./attributes/JoinDate");
const YearsOfService = require("./attributes/YearsOfService");
const Score = require("./attributes/Score");

const dayjs = require("dayjs")
dayjs.extend(require("dayjs/plugin/utc"))
dayjs.extend(require("dayjs/plugin/timezone"))
dayjs.extend(require("dayjs/plugin/isBetween"))
dayjs.tz.setDefault("Asia/Tokyo")

const {ValidationErrors, ExaminationError} = require("../../general/Errors")

const keyMap = new Map()
keyMap.set("年間返済額合計", "annualRepayment")
keyMap.set("事前審査決裁結果区分", "preScreeningCategory")
keyMap.set("新築中古区分", "purchaseCategory")
keyMap.set("本人採用年収", "lastAnnualIncome")
keyMap.set("購入価格合計", "totalPurchasePrice")
keyMap.set("年収倍率", "annualIncomeRatio")
keyMap.set("その他含む返済負担比率", "repaymentBurdenRatio")
keyMap.set("指定職種有無区分", "designatedJobCategory")
keyMap.set("所要資金_合計", "totalCapital")
keyMap.set("審査時年齢", "ageAtAppraisal")
keyMap.set("完済時年齢", "repaymentPeriodAge")
keyMap.set("同居配偶者有無", "maritalStatus")
keyMap.set("現在住居住宅ローン有無", "currentMortage")
keyMap.set("健康保険区分", "insuranceCategory")
keyMap.set("入社年月", "joinDate")
keyMap.set("勤続年数", "yearsOfService")
keyMap.set("勤務先業種区分", "industryCategory")
keyMap.set("勤務先職種区分", "occupationCategory")
keyMap.set("勤務先雇用形態区分", "employmentType")
keyMap.set("勤務先従業員数区分", "numberOfEmployees")


class ResumeData {
    /** データ生成 */
    constructor(inputData) {
        const today = dayjs().tz("Asia/Tokyo")

        for (let [key, val] of Object.entries(inputData)) {
            this[key] = val
        }

        try {
            this.ageAtAppraisal = AgeAtAppraisal.of(inputData.birthday, today);
            this.repaymentPeriodAge = RepaymentPeriodAge.of(this.ageAtAppraisal, inputData.requestDuration);
            this.repaymentPeriod = RepaymentPeriod.of(this.ageAtAppraisal, this.repaymentPeriodAge);

            this.lastAnnualIncome = LastAnnualIncome.of(inputData.lastYearSalary,inputData.spousalIncome);
            this.repayment = RepaymentAmount.of(this.lastAnnualIncome, this.repaymentPeriod, inputData.interestRate);
            this.annualRepayment = AnnualRepayment.of(this.repayment, this.repaymentPeriod, inputData.interestRate);
            this.repaymentBurdenRatio = RepaymentBurdenRatio.of(this.annualRepayment, this.lastAnnualIncome);
            this.annualIncomeRatio = AnnualIncomeRatio.of(this.repayment, this.lastAnnualIncome);

            this.totalPurchasePrice = TotalPurchasePrice.of(this.repayment, inputData.oneTimePayment);
            this.totalCapital = TotalCapital.of(this.repayment, inputData.oneTimePayment);

            this.preScreeningCategory = PreScreeningCategory.of(0);
            this.purchaseCategory = PurchaseCategory.of(inputData.loanPurpose);
            this.designatedJobCategory = DesignatedJobCategory.of(0);

            this.maritalStatus = MaritalStatus.of(inputData.familyPresence);
            this.currentMortage = CurrentMortage.of(inputData.existingLoanPresence,inputData.doubleLoan);
            this.insuranceCategory = InsuranceCategory.of(inputData.insuranceStatus);
    
            this.joinDate = JoinDate.of(inputData.dateOfCompanyJoin,inputData.dateOfPreviousCompanyJoin,inputData.birthday, today)
            this.yearsOfService = YearsOfService.of(inputData.dateOfCompanyJoin,inputData.dateOfPreviousCompanyJoin,inputData.employmentType,today);

        }
        catch (err) {
            switch (err.constructor) {
                case ValidationErrors.RangeError:
                    throw new ExaminationError(err.message);
                default:
                    throw err;
            };
        }

    }
    /** インプットデータの内容精査、データの担保 */
    static of(inputData) {
        return new this(inputData);
    }
    toAmlRequestBody() {
        const input1 = {}
        input1.ColumnNames = Array.from(keyMap.keys())
        input1.Values = [Array.from(keyMap.values()).map(key => this[key].toString())]
        return { input1 };
    }
    addScore(score) {
        this.score = Score.of(score)
    }
}
module.exports = ResumeData;
