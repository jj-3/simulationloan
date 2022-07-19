"use strict";

const schema = new Map()
schema.set("bonusRatio", require("./attributes/BonusRatio"))
schema.set("interestRate", require("./attributes/InterestRate"))
schema.set("lastYearSalary", require("./attributes/LastYearSalary"))
schema.set("birthday", require("./attributes/Birthday"))
schema.set("oneTimePayment", require("./attributes/OneTimePayment"))
schema.set("loanPurpose", require("./attributes/LoanPurpose"))
schema.set("dateOfCompanyJoin", require("./attributes/DateOfCompanyJoin"))
schema.set("dateOfPreviousCompanyJoin",require("./attributes/DateOfPreviousCompanyJoin"))
schema.set("familyPresence", require("./attributes/FamilyPresence"))
schema.set("postalCode", require("./attributes/PostalCode"))
schema.set("employmentType", require("./attributes/EmploymentType"))
schema.set("companyCategory", require("./attributes/CompanyCategory"))
schema.set("industryCategory", require("./attributes/IndustryCategory"))
schema.set("occupationCategory", require("./attributes/OccupationCategory"))
schema.set("insuranceStatus", require("./attributes/InsuranceStatus"))
schema.set("numberOfEmployees", require("./attributes/NumberOfEmployees"))
schema.set("existingLoanPresence", require("./attributes/ExistingLoanPresence"))
schema.set("requestDuration", require("./attributes/RequestDuration"))
schema.set("loanRequestAmount", require("./attributes/LoanRequestAmount"))
schema.set("doubleLoan", require("./attributes/DoubleLoan"))
schema.set("spousalIncome", require("./attributes/SpousalIncome"))


const { ValidationErrors } = require("../../general/Errors")

class InputData {
    constructor(inputData) {
        for (let [key, AttrObject] of schema.entries()) {
            let inputVal = inputData[key];
            if (inputVal === void 0) {
                throw new ValidationErrors.KeyError(`Required key is not provided. (at input '${key}')`);
            };
            this[key] = new AttrObject(inputVal);
        }
    }
    static of(inputData) {
        return new this(inputData);
    }
};
module.exports = InputData;