"use strict";

class MediaTypeError extends Error {
    constructor(...params) {
        super(...params);
        if (Error.captureStackTrace) { Error.captureStackTrace(this, MediaTypeError) };
        this.name = "MediaTypeError";
        this.code = "UnsupportedMediaType";
    }
};

class BadArgumentError extends Error {
    constructor(...params) {
        super(...params);
        if (Error.captureStackTrace) { Error.captureStackTrace(this, BadArgumentError) };
        this.name = "BadArgumentError";
        this.code = "BadArgument";
    }
};

class KeyError extends Error {
    constructor(...params) {
        super(...params);
        if (Error.captureStackTrace) { Error.captureStackTrace(this, KeyError) };
        this.name = "KeyError";
        this.code = this.name;
    }
};

class TypeError extends Error {
    constructor(...params) {
        super(...params);
        if (Error.captureStackTrace) { Error.captureStackTrace(this, TypeError) };
        this.name = "TypeError";
        this.code = this.name;
    }
};

class RangeError extends Error {
    constructor(...params) {
        super(...params);
        if (Error.captureStackTrace) { Error.captureStackTrace(this, RangeError) };
        this.name = "RangeError";
        this.code = this.name;
    }
};

class FormatError extends Error {
    constructor(...params) {
        super(...params);
        if (Error.captureStackTrace) { Error.captureStackTrace(this, FormatError) };
        this.name = "FormatError";
        this.code = this.name;
    }
};

class ExaminationError extends Error {
    constructor(...params) {
        super(...params);
        if (Error.captureStackTrace) { Error.captureStackTrace(this, ExaminationError) };
        this.name = "ExaminationError";
        this.code = this.name;
    }
};

module.exports.ValidationErrors = {
    MediaTypeError,
    BadArgumentError,
    KeyError,
    TypeError,
    RangeError,
    FormatError,
}

module.exports.ExaminationError = ExaminationError