"use strict";

class ApiResponse {
    constructor(res) {
        this.res = res
    }
    ok(result) {
        this.res.set("Content-Type", "application/json")
        result.isExecuted = true
        this.res.status = 200
        this.res.body = result
    }
    badRequest(err) {
        this.res.set("Content-Type", "application/json")
        this.res.status = 400
        this.res.body = { error: err.code, message: err.message, isExecuted: false }
    }
    unsupportedMediaType(err) {
        this.res.set("Content-Type", "application/json")
        this.res.status = 415
        this.res.body = { error: "UnsupportedMediaType", message: err.message, isExecuted: false }
    }
    internalServerError(err) {
        this.res.status = 500
    }
}
module.exports = ApiResponse
