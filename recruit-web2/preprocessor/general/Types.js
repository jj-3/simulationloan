"use strict";

const check = require("check-types")

const dayjs = require("dayjs")
const JST = "Asia/Tokyo"
dayjs.extend(require("dayjs/plugin/utc"))
dayjs.extend(require("dayjs/plugin/timezone"))
dayjs.tz.setDefault(JST)

const { ValidationErrors } = require("./Errors")

class BaseType {
    constructor(value, type, description={}) {
        this.value = value
        this.type = type
        this.description = description
    }
    toString() {
        return String(this.value)
    }
    isValidType() {
        return check[this.type](this.value)
    }
    validate() {
        var msgSuffix = ""
        var {name, group} = this.description
        if (name && group)
            msgSuffix = ` (at ${group} '${name}')`
        else if (name)
            msgSuffix = ` (at '${name}')`

        if (!this.isValidType()) {
            throw new ValidationErrors.TypeError(`Type of value must be '${this.type}'.${msgSuffix}`)
        };
    }
}

class StringType extends BaseType {
    constructor(value, opt={}, description={}) {
        super(value, "string", description)
        this.regex = opt.format ? new RegExp(opt.format) : null
        this.validate()
    }
    validate() {
        var msgSuffix = ""
        var {name, group} = this.description
        if (name && group)
            msgSuffix = ` (at ${group} '${name}')`
        else if (name)
            msgSuffix = ` (at '${name}')`

        if (!this.isValidType()) {
            throw new ValidationErrors.TypeError(`Type of value must be '${this.type}'.${msgSuffix}`)
        };
        if (!this.regex.test(this.value)) {
            throw new ValidationErrors.FormatError(`Format of value must be ${this.regex}.${msgSuffix}`);
        };
    }
}

class BooleanType extends BaseType {
    constructor(value, description={}) {
        super(value, "boolean", description);
        this.validate()
    }
    toNumber() {
        return Number(this.value);
    }
    toBit() {
        return String(this.toNumber());
    }
    toBoolean() {
        return this.value;
    }
}

class NumberType extends BaseType {
    constructor(value, opt={}, description={}) {
        
        var { lower, upper } = opt.limit || {}
        if (lower && value < lower) value = lower
        if (upper && value > upper) value = upper
        
        super(value, "number", description)
        var {digits, range} = opt
        this.digits = (digits || digits === 0) ? digits : null
        this.range = range || {}
        this.validate()
    }
    validate() {
        var msgSuffix = ""
        var {name, group} = this.description
        if (name && group)
            msgSuffix = ` (at ${group} '${name}')`
        else if (name)
            msgSuffix = ` (at '${name}')`

        if(!this.isValidType()) {
            throw new ValidationErrors.TypeError(`Type of value must be '${this.type}'.${msgSuffix}`);
        }

        var rangeCheck = []
        var {ge, gt, le, lt} = this.range

        if (ge !== void 0) rangeCheck.push(this.value >= ge);
        if (gt !== void 0) rangeCheck.push(this.value > gt);
        if (le !== void 0) rangeCheck.push(this.value <= le);
        if (lt !== void 0) rangeCheck.push(this.value < lt);

        var isValidRange = rangeCheck.every(v => v);
        if(!isValidRange) {
            var range = {
                min: {comp: "<=", value: -Infinity},
                max: {comp: "<=", value: Infinity},
            }
            if (ge !== void 0) { range.min.value = ge; }
            if (gt !== void 0) { range.min.value = gt; range.min.comp = "<"; }
            if (le !== void 0) { range.max.value = le; }
            if (lt !== void 0) { range.max.value = lt; range.max.comp = "<"; }
            var rangeDescription = `[${range.min.value} ${range.min.comp} value ${range.max.comp} ${range.max.value}]`

            throw new ValidationErrors.RangeError(`Value must be in range ${rangeDescription}.${msgSuffix}`);
        }

    }
    toString() {
        if (this.digits === null) {
            return String(this.value)
        }
        else {
            return this.value.toFixed(this.digits)
        }
    }
    toNumber() {
        return Number(this.toString())
    }
}

class IntegerType extends NumberType {
    constructor(value, opt={}, description={}) {
        opt.digits = 0
        super(value, opt, description)
        this.type = "integer"
        this.validate()
    }
}

class DateType extends BaseType {
    constructor(value, opt, description={}) {
        super(value, "date", description)
        this.format = opt.format
        this.tz = opt.tz
        this.validate()
    }
    validate() {
        var msgSuffix = ""
        var {name, group} = this.description
        if (name && group)
            msgSuffix = ` (at ${group} '${name}')`
        else if (name)
            msgSuffix = ` (at '${name}')`

        if (!check.string(this.value)) {
            throw new ValidationErrors.TypeError(`Type of value must be 'string'.${msgSuffix}`);
        }
        if (!this.value){
            // なにもしない
        } else {
            var isValid = (this.toDate().format(this.format) == this.value)
            if(!isValid) {
                throw new ValidationErrors.FormatError(`Format of value must be '${this.format}'.${msgSuffix}`);
            }
        }
    }
    toDate() {
        return dayjs.tz(this.value, this.format, this.tz)
    }
}

class ArrayType extends BaseType {
    constructor(value, description={}) {
        super(value, "array", description)
        this.validate()
    }
    toArray() {
        return this.value()
    }
}

class CategoryType extends BaseType {
    constructor(value, opt={}, description={}) {
        super(value, "category", description)
        this.category = opt.category || new Map()
        this.validate()
    }
    validate() {
        var msgSuffix = ""
        var {name, group} = this.description
        if (name && group)
            msgSuffix = ` (at ${group} '${name}')`
        else if (name)
            msgSuffix = ` (at '${name}')`

        var isValid = this.category.has(this.value)
        if(!isValid) {
            var keys = Array.from(this.category.keys())
            throw new ValidationErrors.RangeError(`Value must be in category [${keys}].${msgSuffix}`);
        }
    }
    toWord() {
        return category.get(this.value)
    }
}


exports.StringType = StringType
exports.BooleanType = BooleanType
exports.NumberType = NumberType
exports.IntegerType = IntegerType
exports.DateType = DateType
exports.ArrayType = ArrayType
exports.CategoryType = CategoryType
