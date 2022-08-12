"use strict";
const scoreThresh = 60


class ExaminationOutcome {
    constructor(result) {
        this.value = result;
        
    }
    static approve(id, amount) {
        const result = {
            id,
            isApproved: 'approve',
            loanAmount: amount
        };
        return new this(result);
    }
    static reject(id, message) {
        const result = {
            id,
            isApproved: 'reject',
            message
        };
        return new this(result);
    }
    static of(user, resumeData) {
        if (resumeData.score.toNumber() >= scoreThresh) {
            const amount = resumeData.repayment.toNumber();
            return this.approve(user, amount);
        }
        else {
            return this.reject(user);
        }
    }
    toObject() {
        return this.value;
    }
}
module.exports = ExaminationOutcome;
