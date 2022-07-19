"use strict";

const funcPrdRequestWeb = require("../../../prd-request-web");

module.exports = async function (context, req) {

    const ctx = { ...context }

    ctx.log = context.log
    ctx.invocationId = context.invocationId
    ctx.traceContext = context.traceContext
    ctx.executionContext = context.executionContext

    ctx.done = (val) => {}
    ctx.req = req
    ctx.bindings = {req: ctx.req}
    ctx.bindingData = {}

    ctx.res = {headers: {}, cookies: []}
    Object.defineProperty(ctx.res, "header", {value: (key, val) => {ctx.res.headers[key] = val}})
    Object.defineProperty(ctx.res, "set", {value: ctx.res.header})
    Object.defineProperty(ctx.res, "get", {value: (key) => {return ctx.res.headers[key]}})
    Object.defineProperty(ctx.res, "send", {value: () => {}})
    Object.defineProperty(ctx.res, "_done", {value: ctx.done})
    
    await funcPrdRequestWeb(ctx, req);

    return ctx.res
}
