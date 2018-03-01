//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;

/* Package-scope variables */
var moment;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/momentjs_moment/moment.js                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
//! moment.js                                                                                                        // 1
//! version : 2.20.1                                                                                                 // 2
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors                                                       // 3
//! license : MIT                                                                                                    // 4
//! momentjs.com                                                                                                     // 5
                                                                                                                     // 6
;(function (global, factory) {                                                                                       // 7
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :                      // 8
    typeof define === 'function' && define.amd ? define(factory) :                                                   // 9
    global.moment = factory()                                                                                        // 10
}(this, (function () { 'use strict';                                                                                 // 11
                                                                                                                     // 12
var hookCallback;                                                                                                    // 13
                                                                                                                     // 14
function hooks () {                                                                                                  // 15
    return hookCallback.apply(null, arguments);                                                                      // 16
}                                                                                                                    // 17
                                                                                                                     // 18
// This is done to register the method called with moment()                                                          // 19
// without creating circular dependencies.                                                                           // 20
function setHookCallback (callback) {                                                                                // 21
    hookCallback = callback;                                                                                         // 22
}                                                                                                                    // 23
                                                                                                                     // 24
function isArray(input) {                                                                                            // 25
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';                     // 26
}                                                                                                                    // 27
                                                                                                                     // 28
function isObject(input) {                                                                                           // 29
    // IE8 will treat undefined and null as object if it wasn't for                                                  // 30
    // input != null                                                                                                 // 31
    return input != null && Object.prototype.toString.call(input) === '[object Object]';                             // 32
}                                                                                                                    // 33
                                                                                                                     // 34
function isObjectEmpty(obj) {                                                                                        // 35
    if (Object.getOwnPropertyNames) {                                                                                // 36
        return (Object.getOwnPropertyNames(obj).length === 0);                                                       // 37
    } else {                                                                                                         // 38
        var k;                                                                                                       // 39
        for (k in obj) {                                                                                             // 40
            if (obj.hasOwnProperty(k)) {                                                                             // 41
                return false;                                                                                        // 42
            }                                                                                                        // 43
        }                                                                                                            // 44
        return true;                                                                                                 // 45
    }                                                                                                                // 46
}                                                                                                                    // 47
                                                                                                                     // 48
function isUndefined(input) {                                                                                        // 49
    return input === void 0;                                                                                         // 50
}                                                                                                                    // 51
                                                                                                                     // 52
function isNumber(input) {                                                                                           // 53
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';                 // 54
}                                                                                                                    // 55
                                                                                                                     // 56
function isDate(input) {                                                                                             // 57
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';                       // 58
}                                                                                                                    // 59
                                                                                                                     // 60
function map(arr, fn) {                                                                                              // 61
    var res = [], i;                                                                                                 // 62
    for (i = 0; i < arr.length; ++i) {                                                                               // 63
        res.push(fn(arr[i], i));                                                                                     // 64
    }                                                                                                                // 65
    return res;                                                                                                      // 66
}                                                                                                                    // 67
                                                                                                                     // 68
function hasOwnProp(a, b) {                                                                                          // 69
    return Object.prototype.hasOwnProperty.call(a, b);                                                               // 70
}                                                                                                                    // 71
                                                                                                                     // 72
function extend(a, b) {                                                                                              // 73
    for (var i in b) {                                                                                               // 74
        if (hasOwnProp(b, i)) {                                                                                      // 75
            a[i] = b[i];                                                                                             // 76
        }                                                                                                            // 77
    }                                                                                                                // 78
                                                                                                                     // 79
    if (hasOwnProp(b, 'toString')) {                                                                                 // 80
        a.toString = b.toString;                                                                                     // 81
    }                                                                                                                // 82
                                                                                                                     // 83
    if (hasOwnProp(b, 'valueOf')) {                                                                                  // 84
        a.valueOf = b.valueOf;                                                                                       // 85
    }                                                                                                                // 86
                                                                                                                     // 87
    return a;                                                                                                        // 88
}                                                                                                                    // 89
                                                                                                                     // 90
function createUTC (input, format, locale, strict) {                                                                 // 91
    return createLocalOrUTC(input, format, locale, strict, true).utc();                                              // 92
}                                                                                                                    // 93
                                                                                                                     // 94
function defaultParsingFlags() {                                                                                     // 95
    // We need to deep clone this object.                                                                            // 96
    return {                                                                                                         // 97
        empty           : false,                                                                                     // 98
        unusedTokens    : [],                                                                                        // 99
        unusedInput     : [],                                                                                        // 100
        overflow        : -2,                                                                                        // 101
        charsLeftOver   : 0,                                                                                         // 102
        nullInput       : false,                                                                                     // 103
        invalidMonth    : null,                                                                                      // 104
        invalidFormat   : false,                                                                                     // 105
        userInvalidated : false,                                                                                     // 106
        iso             : false,                                                                                     // 107
        parsedDateParts : [],                                                                                        // 108
        meridiem        : null,                                                                                      // 109
        rfc2822         : false,                                                                                     // 110
        weekdayMismatch : false                                                                                      // 111
    };                                                                                                               // 112
}                                                                                                                    // 113
                                                                                                                     // 114
function getParsingFlags(m) {                                                                                        // 115
    if (m._pf == null) {                                                                                             // 116
        m._pf = defaultParsingFlags();                                                                               // 117
    }                                                                                                                // 118
    return m._pf;                                                                                                    // 119
}                                                                                                                    // 120
                                                                                                                     // 121
var some;                                                                                                            // 122
if (Array.prototype.some) {                                                                                          // 123
    some = Array.prototype.some;                                                                                     // 124
} else {                                                                                                             // 125
    some = function (fun) {                                                                                          // 126
        var t = Object(this);                                                                                        // 127
        var len = t.length >>> 0;                                                                                    // 128
                                                                                                                     // 129
        for (var i = 0; i < len; i++) {                                                                              // 130
            if (i in t && fun.call(this, t[i], i, t)) {                                                              // 131
                return true;                                                                                         // 132
            }                                                                                                        // 133
        }                                                                                                            // 134
                                                                                                                     // 135
        return false;                                                                                                // 136
    };                                                                                                               // 137
}                                                                                                                    // 138
                                                                                                                     // 139
function isValid(m) {                                                                                                // 140
    if (m._isValid == null) {                                                                                        // 141
        var flags = getParsingFlags(m);                                                                              // 142
        var parsedParts = some.call(flags.parsedDateParts, function (i) {                                            // 143
            return i != null;                                                                                        // 144
        });                                                                                                          // 145
        var isNowValid = !isNaN(m._d.getTime()) &&                                                                   // 146
            flags.overflow < 0 &&                                                                                    // 147
            !flags.empty &&                                                                                          // 148
            !flags.invalidMonth &&                                                                                   // 149
            !flags.invalidWeekday &&                                                                                 // 150
            !flags.weekdayMismatch &&                                                                                // 151
            !flags.nullInput &&                                                                                      // 152
            !flags.invalidFormat &&                                                                                  // 153
            !flags.userInvalidated &&                                                                                // 154
            (!flags.meridiem || (flags.meridiem && parsedParts));                                                    // 155
                                                                                                                     // 156
        if (m._strict) {                                                                                             // 157
            isNowValid = isNowValid &&                                                                               // 158
                flags.charsLeftOver === 0 &&                                                                         // 159
                flags.unusedTokens.length === 0 &&                                                                   // 160
                flags.bigHour === undefined;                                                                         // 161
        }                                                                                                            // 162
                                                                                                                     // 163
        if (Object.isFrozen == null || !Object.isFrozen(m)) {                                                        // 164
            m._isValid = isNowValid;                                                                                 // 165
        }                                                                                                            // 166
        else {                                                                                                       // 167
            return isNowValid;                                                                                       // 168
        }                                                                                                            // 169
    }                                                                                                                // 170
    return m._isValid;                                                                                               // 171
}                                                                                                                    // 172
                                                                                                                     // 173
function createInvalid (flags) {                                                                                     // 174
    var m = createUTC(NaN);                                                                                          // 175
    if (flags != null) {                                                                                             // 176
        extend(getParsingFlags(m), flags);                                                                           // 177
    }                                                                                                                // 178
    else {                                                                                                           // 179
        getParsingFlags(m).userInvalidated = true;                                                                   // 180
    }                                                                                                                // 181
                                                                                                                     // 182
    return m;                                                                                                        // 183
}                                                                                                                    // 184
                                                                                                                     // 185
// Plugins that add properties should also add the key here (null value),                                            // 186
// so we can properly clone ourselves.                                                                               // 187
var momentProperties = hooks.momentProperties = [];                                                                  // 188
                                                                                                                     // 189
function copyConfig(to, from) {                                                                                      // 190
    var i, prop, val;                                                                                                // 191
                                                                                                                     // 192
    if (!isUndefined(from._isAMomentObject)) {                                                                       // 193
        to._isAMomentObject = from._isAMomentObject;                                                                 // 194
    }                                                                                                                // 195
    if (!isUndefined(from._i)) {                                                                                     // 196
        to._i = from._i;                                                                                             // 197
    }                                                                                                                // 198
    if (!isUndefined(from._f)) {                                                                                     // 199
        to._f = from._f;                                                                                             // 200
    }                                                                                                                // 201
    if (!isUndefined(from._l)) {                                                                                     // 202
        to._l = from._l;                                                                                             // 203
    }                                                                                                                // 204
    if (!isUndefined(from._strict)) {                                                                                // 205
        to._strict = from._strict;                                                                                   // 206
    }                                                                                                                // 207
    if (!isUndefined(from._tzm)) {                                                                                   // 208
        to._tzm = from._tzm;                                                                                         // 209
    }                                                                                                                // 210
    if (!isUndefined(from._isUTC)) {                                                                                 // 211
        to._isUTC = from._isUTC;                                                                                     // 212
    }                                                                                                                // 213
    if (!isUndefined(from._offset)) {                                                                                // 214
        to._offset = from._offset;                                                                                   // 215
    }                                                                                                                // 216
    if (!isUndefined(from._pf)) {                                                                                    // 217
        to._pf = getParsingFlags(from);                                                                              // 218
    }                                                                                                                // 219
    if (!isUndefined(from._locale)) {                                                                                // 220
        to._locale = from._locale;                                                                                   // 221
    }                                                                                                                // 222
                                                                                                                     // 223
    if (momentProperties.length > 0) {                                                                               // 224
        for (i = 0; i < momentProperties.length; i++) {                                                              // 225
            prop = momentProperties[i];                                                                              // 226
            val = from[prop];                                                                                        // 227
            if (!isUndefined(val)) {                                                                                 // 228
                to[prop] = val;                                                                                      // 229
            }                                                                                                        // 230
        }                                                                                                            // 231
    }                                                                                                                // 232
                                                                                                                     // 233
    return to;                                                                                                       // 234
}                                                                                                                    // 235
                                                                                                                     // 236
var updateInProgress = false;                                                                                        // 237
                                                                                                                     // 238
// Moment prototype object                                                                                           // 239
function Moment(config) {                                                                                            // 240
    copyConfig(this, config);                                                                                        // 241
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);                                               // 242
    if (!this.isValid()) {                                                                                           // 243
        this._d = new Date(NaN);                                                                                     // 244
    }                                                                                                                // 245
    // Prevent infinite loop in case updateOffset creates new moment                                                 // 246
    // objects.                                                                                                      // 247
    if (updateInProgress === false) {                                                                                // 248
        updateInProgress = true;                                                                                     // 249
        hooks.updateOffset(this);                                                                                    // 250
        updateInProgress = false;                                                                                    // 251
    }                                                                                                                // 252
}                                                                                                                    // 253
                                                                                                                     // 254
function isMoment (obj) {                                                                                            // 255
    return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);                                   // 256
}                                                                                                                    // 257
                                                                                                                     // 258
function absFloor (number) {                                                                                         // 259
    if (number < 0) {                                                                                                // 260
        // -0 -> 0                                                                                                   // 261
        return Math.ceil(number) || 0;                                                                               // 262
    } else {                                                                                                         // 263
        return Math.floor(number);                                                                                   // 264
    }                                                                                                                // 265
}                                                                                                                    // 266
                                                                                                                     // 267
function toInt(argumentForCoercion) {                                                                                // 268
    var coercedNumber = +argumentForCoercion,                                                                        // 269
        value = 0;                                                                                                   // 270
                                                                                                                     // 271
    if (coercedNumber !== 0 && isFinite(coercedNumber)) {                                                            // 272
        value = absFloor(coercedNumber);                                                                             // 273
    }                                                                                                                // 274
                                                                                                                     // 275
    return value;                                                                                                    // 276
}                                                                                                                    // 277
                                                                                                                     // 278
// compare two arrays, return the number of differences                                                              // 279
function compareArrays(array1, array2, dontConvert) {                                                                // 280
    var len = Math.min(array1.length, array2.length),                                                                // 281
        lengthDiff = Math.abs(array1.length - array2.length),                                                        // 282
        diffs = 0,                                                                                                   // 283
        i;                                                                                                           // 284
    for (i = 0; i < len; i++) {                                                                                      // 285
        if ((dontConvert && array1[i] !== array2[i]) ||                                                              // 286
            (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {                                               // 287
            diffs++;                                                                                                 // 288
        }                                                                                                            // 289
    }                                                                                                                // 290
    return diffs + lengthDiff;                                                                                       // 291
}                                                                                                                    // 292
                                                                                                                     // 293
function warn(msg) {                                                                                                 // 294
    if (hooks.suppressDeprecationWarnings === false &&                                                               // 295
            (typeof console !==  'undefined') && console.warn) {                                                     // 296
        console.warn('Deprecation warning: ' + msg);                                                                 // 297
    }                                                                                                                // 298
}                                                                                                                    // 299
                                                                                                                     // 300
function deprecate(msg, fn) {                                                                                        // 301
    var firstTime = true;                                                                                            // 302
                                                                                                                     // 303
    return extend(function () {                                                                                      // 304
        if (hooks.deprecationHandler != null) {                                                                      // 305
            hooks.deprecationHandler(null, msg);                                                                     // 306
        }                                                                                                            // 307
        if (firstTime) {                                                                                             // 308
            var args = [];                                                                                           // 309
            var arg;                                                                                                 // 310
            for (var i = 0; i < arguments.length; i++) {                                                             // 311
                arg = '';                                                                                            // 312
                if (typeof arguments[i] === 'object') {                                                              // 313
                    arg += '\n[' + i + '] ';                                                                         // 314
                    for (var key in arguments[0]) {                                                                  // 315
                        arg += key + ': ' + arguments[0][key] + ', ';                                                // 316
                    }                                                                                                // 317
                    arg = arg.slice(0, -2); // Remove trailing comma and space                                       // 318
                } else {                                                                                             // 319
                    arg = arguments[i];                                                                              // 320
                }                                                                                                    // 321
                args.push(arg);                                                                                      // 322
            }                                                                                                        // 323
            warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);    // 324
            firstTime = false;                                                                                       // 325
        }                                                                                                            // 326
        return fn.apply(this, arguments);                                                                            // 327
    }, fn);                                                                                                          // 328
}                                                                                                                    // 329
                                                                                                                     // 330
var deprecations = {};                                                                                               // 331
                                                                                                                     // 332
function deprecateSimple(name, msg) {                                                                                // 333
    if (hooks.deprecationHandler != null) {                                                                          // 334
        hooks.deprecationHandler(name, msg);                                                                         // 335
    }                                                                                                                // 336
    if (!deprecations[name]) {                                                                                       // 337
        warn(msg);                                                                                                   // 338
        deprecations[name] = true;                                                                                   // 339
    }                                                                                                                // 340
}                                                                                                                    // 341
                                                                                                                     // 342
hooks.suppressDeprecationWarnings = false;                                                                           // 343
hooks.deprecationHandler = null;                                                                                     // 344
                                                                                                                     // 345
function isFunction(input) {                                                                                         // 346
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';               // 347
}                                                                                                                    // 348
                                                                                                                     // 349
function set (config) {                                                                                              // 350
    var prop, i;                                                                                                     // 351
    for (i in config) {                                                                                              // 352
        prop = config[i];                                                                                            // 353
        if (isFunction(prop)) {                                                                                      // 354
            this[i] = prop;                                                                                          // 355
        } else {                                                                                                     // 356
            this['_' + i] = prop;                                                                                    // 357
        }                                                                                                            // 358
    }                                                                                                                // 359
    this._config = config;                                                                                           // 360
    // Lenient ordinal parsing accepts just a number in addition to                                                  // 361
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.                                                // 362
    // TODO: Remove "ordinalParse" fallback in next major release.                                                   // 363
    this._dayOfMonthOrdinalParseLenient = new RegExp(                                                                // 364
        (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +                                         // 365
            '|' + (/\d{1,2}/).source);                                                                               // 366
}                                                                                                                    // 367
                                                                                                                     // 368
function mergeConfigs(parentConfig, childConfig) {                                                                   // 369
    var res = extend({}, parentConfig), prop;                                                                        // 370
    for (prop in childConfig) {                                                                                      // 371
        if (hasOwnProp(childConfig, prop)) {                                                                         // 372
            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {                                       // 373
                res[prop] = {};                                                                                      // 374
                extend(res[prop], parentConfig[prop]);                                                               // 375
                extend(res[prop], childConfig[prop]);                                                                // 376
            } else if (childConfig[prop] != null) {                                                                  // 377
                res[prop] = childConfig[prop];                                                                       // 378
            } else {                                                                                                 // 379
                delete res[prop];                                                                                    // 380
            }                                                                                                        // 381
        }                                                                                                            // 382
    }                                                                                                                // 383
    for (prop in parentConfig) {                                                                                     // 384
        if (hasOwnProp(parentConfig, prop) &&                                                                        // 385
                !hasOwnProp(childConfig, prop) &&                                                                    // 386
                isObject(parentConfig[prop])) {                                                                      // 387
            // make sure changes to properties don't modify parent config                                            // 388
            res[prop] = extend({}, res[prop]);                                                                       // 389
        }                                                                                                            // 390
    }                                                                                                                // 391
    return res;                                                                                                      // 392
}                                                                                                                    // 393
                                                                                                                     // 394
function Locale(config) {                                                                                            // 395
    if (config != null) {                                                                                            // 396
        this.set(config);                                                                                            // 397
    }                                                                                                                // 398
}                                                                                                                    // 399
                                                                                                                     // 400
var keys;                                                                                                            // 401
                                                                                                                     // 402
if (Object.keys) {                                                                                                   // 403
    keys = Object.keys;                                                                                              // 404
} else {                                                                                                             // 405
    keys = function (obj) {                                                                                          // 406
        var i, res = [];                                                                                             // 407
        for (i in obj) {                                                                                             // 408
            if (hasOwnProp(obj, i)) {                                                                                // 409
                res.push(i);                                                                                         // 410
            }                                                                                                        // 411
        }                                                                                                            // 412
        return res;                                                                                                  // 413
    };                                                                                                               // 414
}                                                                                                                    // 415
                                                                                                                     // 416
var defaultCalendar = {                                                                                              // 417
    sameDay : '[Today at] LT',                                                                                       // 418
    nextDay : '[Tomorrow at] LT',                                                                                    // 419
    nextWeek : 'dddd [at] LT',                                                                                       // 420
    lastDay : '[Yesterday at] LT',                                                                                   // 421
    lastWeek : '[Last] dddd [at] LT',                                                                                // 422
    sameElse : 'L'                                                                                                   // 423
};                                                                                                                   // 424
                                                                                                                     // 425
function calendar (key, mom, now) {                                                                                  // 426
    var output = this._calendar[key] || this._calendar['sameElse'];                                                  // 427
    return isFunction(output) ? output.call(mom, now) : output;                                                      // 428
}                                                                                                                    // 429
                                                                                                                     // 430
var defaultLongDateFormat = {                                                                                        // 431
    LTS  : 'h:mm:ss A',                                                                                              // 432
    LT   : 'h:mm A',                                                                                                 // 433
    L    : 'MM/DD/YYYY',                                                                                             // 434
    LL   : 'MMMM D, YYYY',                                                                                           // 435
    LLL  : 'MMMM D, YYYY h:mm A',                                                                                    // 436
    LLLL : 'dddd, MMMM D, YYYY h:mm A'                                                                               // 437
};                                                                                                                   // 438
                                                                                                                     // 439
function longDateFormat (key) {                                                                                      // 440
    var format = this._longDateFormat[key],                                                                          // 441
        formatUpper = this._longDateFormat[key.toUpperCase()];                                                       // 442
                                                                                                                     // 443
    if (format || !formatUpper) {                                                                                    // 444
        return format;                                                                                               // 445
    }                                                                                                                // 446
                                                                                                                     // 447
    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {                             // 448
        return val.slice(1);                                                                                         // 449
    });                                                                                                              // 450
                                                                                                                     // 451
    return this._longDateFormat[key];                                                                                // 452
}                                                                                                                    // 453
                                                                                                                     // 454
var defaultInvalidDate = 'Invalid date';                                                                             // 455
                                                                                                                     // 456
function invalidDate () {                                                                                            // 457
    return this._invalidDate;                                                                                        // 458
}                                                                                                                    // 459
                                                                                                                     // 460
var defaultOrdinal = '%d';                                                                                           // 461
var defaultDayOfMonthOrdinalParse = /\d{1,2}/;                                                                       // 462
                                                                                                                     // 463
function ordinal (number) {                                                                                          // 464
    return this._ordinal.replace('%d', number);                                                                      // 465
}                                                                                                                    // 466
                                                                                                                     // 467
var defaultRelativeTime = {                                                                                          // 468
    future : 'in %s',                                                                                                // 469
    past   : '%s ago',                                                                                               // 470
    s  : 'a few seconds',                                                                                            // 471
    ss : '%d seconds',                                                                                               // 472
    m  : 'a minute',                                                                                                 // 473
    mm : '%d minutes',                                                                                               // 474
    h  : 'an hour',                                                                                                  // 475
    hh : '%d hours',                                                                                                 // 476
    d  : 'a day',                                                                                                    // 477
    dd : '%d days',                                                                                                  // 478
    M  : 'a month',                                                                                                  // 479
    MM : '%d months',                                                                                                // 480
    y  : 'a year',                                                                                                   // 481
    yy : '%d years'                                                                                                  // 482
};                                                                                                                   // 483
                                                                                                                     // 484
function relativeTime (number, withoutSuffix, string, isFuture) {                                                    // 485
    var output = this._relativeTime[string];                                                                         // 486
    return (isFunction(output)) ?                                                                                    // 487
        output(number, withoutSuffix, string, isFuture) :                                                            // 488
        output.replace(/%d/i, number);                                                                               // 489
}                                                                                                                    // 490
                                                                                                                     // 491
function pastFuture (diff, output) {                                                                                 // 492
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];                                                   // 493
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);                                      // 494
}                                                                                                                    // 495
                                                                                                                     // 496
var aliases = {};                                                                                                    // 497
                                                                                                                     // 498
function addUnitAlias (unit, shorthand) {                                                                            // 499
    var lowerCase = unit.toLowerCase();                                                                              // 500
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;                                       // 501
}                                                                                                                    // 502
                                                                                                                     // 503
function normalizeUnits(units) {                                                                                     // 504
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;                   // 505
}                                                                                                                    // 506
                                                                                                                     // 507
function normalizeObjectUnits(inputObject) {                                                                         // 508
    var normalizedInput = {},                                                                                        // 509
        normalizedProp,                                                                                              // 510
        prop;                                                                                                        // 511
                                                                                                                     // 512
    for (prop in inputObject) {                                                                                      // 513
        if (hasOwnProp(inputObject, prop)) {                                                                         // 514
            normalizedProp = normalizeUnits(prop);                                                                   // 515
            if (normalizedProp) {                                                                                    // 516
                normalizedInput[normalizedProp] = inputObject[prop];                                                 // 517
            }                                                                                                        // 518
        }                                                                                                            // 519
    }                                                                                                                // 520
                                                                                                                     // 521
    return normalizedInput;                                                                                          // 522
}                                                                                                                    // 523
                                                                                                                     // 524
var priorities = {};                                                                                                 // 525
                                                                                                                     // 526
function addUnitPriority(unit, priority) {                                                                           // 527
    priorities[unit] = priority;                                                                                     // 528
}                                                                                                                    // 529
                                                                                                                     // 530
function getPrioritizedUnits(unitsObj) {                                                                             // 531
    var units = [];                                                                                                  // 532
    for (var u in unitsObj) {                                                                                        // 533
        units.push({unit: u, priority: priorities[u]});                                                              // 534
    }                                                                                                                // 535
    units.sort(function (a, b) {                                                                                     // 536
        return a.priority - b.priority;                                                                              // 537
    });                                                                                                              // 538
    return units;                                                                                                    // 539
}                                                                                                                    // 540
                                                                                                                     // 541
function zeroFill(number, targetLength, forceSign) {                                                                 // 542
    var absNumber = '' + Math.abs(number),                                                                           // 543
        zerosToFill = targetLength - absNumber.length,                                                               // 544
        sign = number >= 0;                                                                                          // 545
    return (sign ? (forceSign ? '+' : '') : '-') +                                                                   // 546
        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;                                     // 547
}                                                                                                                    // 548
                                                                                                                     // 549
var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;
                                                                                                                     // 551
var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;                                            // 552
                                                                                                                     // 553
var formatFunctions = {};                                                                                            // 554
                                                                                                                     // 555
var formatTokenFunctions = {};                                                                                       // 556
                                                                                                                     // 557
// token:    'M'                                                                                                     // 558
// padded:   ['MM', 2]                                                                                               // 559
// ordinal:  'Mo'                                                                                                    // 560
// callback: function () { this.month() + 1 }                                                                        // 561
function addFormatToken (token, padded, ordinal, callback) {                                                         // 562
    var func = callback;                                                                                             // 563
    if (typeof callback === 'string') {                                                                              // 564
        func = function () {                                                                                         // 565
            return this[callback]();                                                                                 // 566
        };                                                                                                           // 567
    }                                                                                                                // 568
    if (token) {                                                                                                     // 569
        formatTokenFunctions[token] = func;                                                                          // 570
    }                                                                                                                // 571
    if (padded) {                                                                                                    // 572
        formatTokenFunctions[padded[0]] = function () {                                                              // 573
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);                                      // 574
        };                                                                                                           // 575
    }                                                                                                                // 576
    if (ordinal) {                                                                                                   // 577
        formatTokenFunctions[ordinal] = function () {                                                                // 578
            return this.localeData().ordinal(func.apply(this, arguments), token);                                    // 579
        };                                                                                                           // 580
    }                                                                                                                // 581
}                                                                                                                    // 582
                                                                                                                     // 583
function removeFormattingTokens(input) {                                                                             // 584
    if (input.match(/\[[\s\S]/)) {                                                                                   // 585
        return input.replace(/^\[|\]$/g, '');                                                                        // 586
    }                                                                                                                // 587
    return input.replace(/\\/g, '');                                                                                 // 588
}                                                                                                                    // 589
                                                                                                                     // 590
function makeFormatFunction(format) {                                                                                // 591
    var array = format.match(formattingTokens), i, length;                                                           // 592
                                                                                                                     // 593
    for (i = 0, length = array.length; i < length; i++) {                                                            // 594
        if (formatTokenFunctions[array[i]]) {                                                                        // 595
            array[i] = formatTokenFunctions[array[i]];                                                               // 596
        } else {                                                                                                     // 597
            array[i] = removeFormattingTokens(array[i]);                                                             // 598
        }                                                                                                            // 599
    }                                                                                                                // 600
                                                                                                                     // 601
    return function (mom) {                                                                                          // 602
        var output = '', i;                                                                                          // 603
        for (i = 0; i < length; i++) {                                                                               // 604
            output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];                                  // 605
        }                                                                                                            // 606
        return output;                                                                                               // 607
    };                                                                                                               // 608
}                                                                                                                    // 609
                                                                                                                     // 610
// format date using native date object                                                                              // 611
function formatMoment(m, format) {                                                                                   // 612
    if (!m.isValid()) {                                                                                              // 613
        return m.localeData().invalidDate();                                                                         // 614
    }                                                                                                                // 615
                                                                                                                     // 616
    format = expandFormat(format, m.localeData());                                                                   // 617
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);                                 // 618
                                                                                                                     // 619
    return formatFunctions[format](m);                                                                               // 620
}                                                                                                                    // 621
                                                                                                                     // 622
function expandFormat(format, locale) {                                                                              // 623
    var i = 5;                                                                                                       // 624
                                                                                                                     // 625
    function replaceLongDateFormatTokens(input) {                                                                    // 626
        return locale.longDateFormat(input) || input;                                                                // 627
    }                                                                                                                // 628
                                                                                                                     // 629
    localFormattingTokens.lastIndex = 0;                                                                             // 630
    while (i >= 0 && localFormattingTokens.test(format)) {                                                           // 631
        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);                                 // 632
        localFormattingTokens.lastIndex = 0;                                                                         // 633
        i -= 1;                                                                                                      // 634
    }                                                                                                                // 635
                                                                                                                     // 636
    return format;                                                                                                   // 637
}                                                                                                                    // 638
                                                                                                                     // 639
var match1         = /\d/;            //       0 - 9                                                                 // 640
var match2         = /\d\d/;          //      00 - 99                                                                // 641
var match3         = /\d{3}/;         //     000 - 999                                                               // 642
var match4         = /\d{4}/;         //    0000 - 9999                                                              // 643
var match6         = /[+-]?\d{6}/;    // -999999 - 999999                                                            // 644
var match1to2      = /\d\d?/;         //       0 - 99                                                                // 645
var match3to4      = /\d\d\d\d?/;     //     999 - 9999                                                              // 646
var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999                                                            // 647
var match1to3      = /\d{1,3}/;       //       0 - 999                                                               // 648
var match1to4      = /\d{1,4}/;       //       0 - 9999                                                              // 649
var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999                                                            // 650
                                                                                                                     // 651
var matchUnsigned  = /\d+/;           //       0 - inf                                                               // 652
var matchSigned    = /[+-]?\d+/;      //    -inf - inf                                                               // 653
                                                                                                                     // 654
var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z                                         // 655
var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z                          // 656
                                                                                                                     // 657
var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123                                              // 658
                                                                                                                     // 659
// any word (or two) characters or numbers including two/three word month in arabic.                                 // 660
// includes scottish gaelic two word and hyphenated months                                                           // 661
var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;
                                                                                                                     // 663
                                                                                                                     // 664
var regexes = {};                                                                                                    // 665
                                                                                                                     // 666
function addRegexToken (token, regex, strictRegex) {                                                                 // 667
    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {                                   // 668
        return (isStrict && strictRegex) ? strictRegex : regex;                                                      // 669
    };                                                                                                               // 670
}                                                                                                                    // 671
                                                                                                                     // 672
function getParseRegexForToken (token, config) {                                                                     // 673
    if (!hasOwnProp(regexes, token)) {                                                                               // 674
        return new RegExp(unescapeFormat(token));                                                                    // 675
    }                                                                                                                // 676
                                                                                                                     // 677
    return regexes[token](config._strict, config._locale);                                                           // 678
}                                                                                                                    // 679
                                                                                                                     // 680
// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript              // 681
function unescapeFormat(s) {                                                                                         // 682
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;                                                                                 // 684
    }));                                                                                                             // 685
}                                                                                                                    // 686
                                                                                                                     // 687
function regexEscape(s) {                                                                                            // 688
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');                                                              // 689
}                                                                                                                    // 690
                                                                                                                     // 691
var tokens = {};                                                                                                     // 692
                                                                                                                     // 693
function addParseToken (token, callback) {                                                                           // 694
    var i, func = callback;                                                                                          // 695
    if (typeof token === 'string') {                                                                                 // 696
        token = [token];                                                                                             // 697
    }                                                                                                                // 698
    if (isNumber(callback)) {                                                                                        // 699
        func = function (input, array) {                                                                             // 700
            array[callback] = toInt(input);                                                                          // 701
        };                                                                                                           // 702
    }                                                                                                                // 703
    for (i = 0; i < token.length; i++) {                                                                             // 704
        tokens[token[i]] = func;                                                                                     // 705
    }                                                                                                                // 706
}                                                                                                                    // 707
                                                                                                                     // 708
function addWeekParseToken (token, callback) {                                                                       // 709
    addParseToken(token, function (input, array, config, token) {                                                    // 710
        config._w = config._w || {};                                                                                 // 711
        callback(input, config._w, config, token);                                                                   // 712
    });                                                                                                              // 713
}                                                                                                                    // 714
                                                                                                                     // 715
function addTimeToArrayFromToken(token, input, config) {                                                             // 716
    if (input != null && hasOwnProp(tokens, token)) {                                                                // 717
        tokens[token](input, config._a, config, token);                                                              // 718
    }                                                                                                                // 719
}                                                                                                                    // 720
                                                                                                                     // 721
var YEAR = 0;                                                                                                        // 722
var MONTH = 1;                                                                                                       // 723
var DATE = 2;                                                                                                        // 724
var HOUR = 3;                                                                                                        // 725
var MINUTE = 4;                                                                                                      // 726
var SECOND = 5;                                                                                                      // 727
var MILLISECOND = 6;                                                                                                 // 728
var WEEK = 7;                                                                                                        // 729
var WEEKDAY = 8;                                                                                                     // 730
                                                                                                                     // 731
// FORMATTING                                                                                                        // 732
                                                                                                                     // 733
addFormatToken('Y', 0, 0, function () {                                                                              // 734
    var y = this.year();                                                                                             // 735
    return y <= 9999 ? '' + y : '+' + y;                                                                             // 736
});                                                                                                                  // 737
                                                                                                                     // 738
addFormatToken(0, ['YY', 2], 0, function () {                                                                        // 739
    return this.year() % 100;                                                                                        // 740
});                                                                                                                  // 741
                                                                                                                     // 742
addFormatToken(0, ['YYYY',   4],       0, 'year');                                                                   // 743
addFormatToken(0, ['YYYYY',  5],       0, 'year');                                                                   // 744
addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');                                                                   // 745
                                                                                                                     // 746
// ALIASES                                                                                                           // 747
                                                                                                                     // 748
addUnitAlias('year', 'y');                                                                                           // 749
                                                                                                                     // 750
// PRIORITIES                                                                                                        // 751
                                                                                                                     // 752
addUnitPriority('year', 1);                                                                                          // 753
                                                                                                                     // 754
// PARSING                                                                                                           // 755
                                                                                                                     // 756
addRegexToken('Y',      matchSigned);                                                                                // 757
addRegexToken('YY',     match1to2, match2);                                                                          // 758
addRegexToken('YYYY',   match1to4, match4);                                                                          // 759
addRegexToken('YYYYY',  match1to6, match6);                                                                          // 760
addRegexToken('YYYYYY', match1to6, match6);                                                                          // 761
                                                                                                                     // 762
addParseToken(['YYYYY', 'YYYYYY'], YEAR);                                                                            // 763
addParseToken('YYYY', function (input, array) {                                                                      // 764
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);                                // 765
});                                                                                                                  // 766
addParseToken('YY', function (input, array) {                                                                        // 767
    array[YEAR] = hooks.parseTwoDigitYear(input);                                                                    // 768
});                                                                                                                  // 769
addParseToken('Y', function (input, array) {                                                                         // 770
    array[YEAR] = parseInt(input, 10);                                                                               // 771
});                                                                                                                  // 772
                                                                                                                     // 773
// HELPERS                                                                                                           // 774
                                                                                                                     // 775
function daysInYear(year) {                                                                                          // 776
    return isLeapYear(year) ? 366 : 365;                                                                             // 777
}                                                                                                                    // 778
                                                                                                                     // 779
function isLeapYear(year) {                                                                                          // 780
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;                                                 // 781
}                                                                                                                    // 782
                                                                                                                     // 783
// HOOKS                                                                                                             // 784
                                                                                                                     // 785
hooks.parseTwoDigitYear = function (input) {                                                                         // 786
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);                                                         // 787
};                                                                                                                   // 788
                                                                                                                     // 789
// MOMENTS                                                                                                           // 790
                                                                                                                     // 791
var getSetYear = makeGetSet('FullYear', true);                                                                       // 792
                                                                                                                     // 793
function getIsLeapYear () {                                                                                          // 794
    return isLeapYear(this.year());                                                                                  // 795
}                                                                                                                    // 796
                                                                                                                     // 797
function makeGetSet (unit, keepTime) {                                                                               // 798
    return function (value) {                                                                                        // 799
        if (value != null) {                                                                                         // 800
            set$1(this, unit, value);                                                                                // 801
            hooks.updateOffset(this, keepTime);                                                                      // 802
            return this;                                                                                             // 803
        } else {                                                                                                     // 804
            return get(this, unit);                                                                                  // 805
        }                                                                                                            // 806
    };                                                                                                               // 807
}                                                                                                                    // 808
                                                                                                                     // 809
function get (mom, unit) {                                                                                           // 810
    return mom.isValid() ?                                                                                           // 811
        mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;                                                    // 812
}                                                                                                                    // 813
                                                                                                                     // 814
function set$1 (mom, unit, value) {                                                                                  // 815
    if (mom.isValid() && !isNaN(value)) {                                                                            // 816
        if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {               // 817
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));   // 818
        }                                                                                                            // 819
        else {                                                                                                       // 820
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);                                                 // 821
        }                                                                                                            // 822
    }                                                                                                                // 823
}                                                                                                                    // 824
                                                                                                                     // 825
// MOMENTS                                                                                                           // 826
                                                                                                                     // 827
function stringGet (units) {                                                                                         // 828
    units = normalizeUnits(units);                                                                                   // 829
    if (isFunction(this[units])) {                                                                                   // 830
        return this[units]();                                                                                        // 831
    }                                                                                                                // 832
    return this;                                                                                                     // 833
}                                                                                                                    // 834
                                                                                                                     // 835
                                                                                                                     // 836
function stringSet (units, value) {                                                                                  // 837
    if (typeof units === 'object') {                                                                                 // 838
        units = normalizeObjectUnits(units);                                                                         // 839
        var prioritized = getPrioritizedUnits(units);                                                                // 840
        for (var i = 0; i < prioritized.length; i++) {                                                               // 841
            this[prioritized[i].unit](units[prioritized[i].unit]);                                                   // 842
        }                                                                                                            // 843
    } else {                                                                                                         // 844
        units = normalizeUnits(units);                                                                               // 845
        if (isFunction(this[units])) {                                                                               // 846
            return this[units](value);                                                                               // 847
        }                                                                                                            // 848
    }                                                                                                                // 849
    return this;                                                                                                     // 850
}                                                                                                                    // 851
                                                                                                                     // 852
function mod(n, x) {                                                                                                 // 853
    return ((n % x) + x) % x;                                                                                        // 854
}                                                                                                                    // 855
                                                                                                                     // 856
var indexOf;                                                                                                         // 857
                                                                                                                     // 858
if (Array.prototype.indexOf) {                                                                                       // 859
    indexOf = Array.prototype.indexOf;                                                                               // 860
} else {                                                                                                             // 861
    indexOf = function (o) {                                                                                         // 862
        // I know                                                                                                    // 863
        var i;                                                                                                       // 864
        for (i = 0; i < this.length; ++i) {                                                                          // 865
            if (this[i] === o) {                                                                                     // 866
                return i;                                                                                            // 867
            }                                                                                                        // 868
        }                                                                                                            // 869
        return -1;                                                                                                   // 870
    };                                                                                                               // 871
}                                                                                                                    // 872
                                                                                                                     // 873
function daysInMonth(year, month) {                                                                                  // 874
    if (isNaN(year) || isNaN(month)) {                                                                               // 875
        return NaN;                                                                                                  // 876
    }                                                                                                                // 877
    var modMonth = mod(month, 12);                                                                                   // 878
    year += (month - modMonth) / 12;                                                                                 // 879
    return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);                                  // 880
}                                                                                                                    // 881
                                                                                                                     // 882
// FORMATTING                                                                                                        // 883
                                                                                                                     // 884
addFormatToken('M', ['MM', 2], 'Mo', function () {                                                                   // 885
    return this.month() + 1;                                                                                         // 886
});                                                                                                                  // 887
                                                                                                                     // 888
addFormatToken('MMM', 0, 0, function (format) {                                                                      // 889
    return this.localeData().monthsShort(this, format);                                                              // 890
});                                                                                                                  // 891
                                                                                                                     // 892
addFormatToken('MMMM', 0, 0, function (format) {                                                                     // 893
    return this.localeData().months(this, format);                                                                   // 894
});                                                                                                                  // 895
                                                                                                                     // 896
// ALIASES                                                                                                           // 897
                                                                                                                     // 898
addUnitAlias('month', 'M');                                                                                          // 899
                                                                                                                     // 900
// PRIORITY                                                                                                          // 901
                                                                                                                     // 902
addUnitPriority('month', 8);                                                                                         // 903
                                                                                                                     // 904
// PARSING                                                                                                           // 905
                                                                                                                     // 906
addRegexToken('M',    match1to2);                                                                                    // 907
addRegexToken('MM',   match1to2, match2);                                                                            // 908
addRegexToken('MMM',  function (isStrict, locale) {                                                                  // 909
    return locale.monthsShortRegex(isStrict);                                                                        // 910
});                                                                                                                  // 911
addRegexToken('MMMM', function (isStrict, locale) {                                                                  // 912
    return locale.monthsRegex(isStrict);                                                                             // 913
});                                                                                                                  // 914
                                                                                                                     // 915
addParseToken(['M', 'MM'], function (input, array) {                                                                 // 916
    array[MONTH] = toInt(input) - 1;                                                                                 // 917
});                                                                                                                  // 918
                                                                                                                     // 919
addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {                                              // 920
    var month = config._locale.monthsParse(input, token, config._strict);                                            // 921
    // if we didn't find a month name, mark the date as invalid.                                                     // 922
    if (month != null) {                                                                                             // 923
        array[MONTH] = month;                                                                                        // 924
    } else {                                                                                                         // 925
        getParsingFlags(config).invalidMonth = input;                                                                // 926
    }                                                                                                                // 927
});                                                                                                                  // 928
                                                                                                                     // 929
// LOCALES                                                                                                           // 930
                                                                                                                     // 931
var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;                                                              // 932
var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
function localeMonths (m, format) {                                                                                  // 934
    if (!m) {                                                                                                        // 935
        return isArray(this._months) ? this._months :                                                                // 936
            this._months['standalone'];                                                                              // 937
    }                                                                                                                // 938
    return isArray(this._months) ? this._months[m.month()] :                                                         // 939
        this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
}                                                                                                                    // 941
                                                                                                                     // 942
var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');                         // 943
function localeMonthsShort (m, format) {                                                                             // 944
    if (!m) {                                                                                                        // 945
        return isArray(this._monthsShort) ? this._monthsShort :                                                      // 946
            this._monthsShort['standalone'];                                                                         // 947
    }                                                                                                                // 948
    return isArray(this._monthsShort) ? this._monthsShort[m.month()] :                                               // 949
        this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];                       // 950
}                                                                                                                    // 951
                                                                                                                     // 952
function handleStrictParse(monthName, format, strict) {                                                              // 953
    var i, ii, mom, llc = monthName.toLocaleLowerCase();                                                             // 954
    if (!this._monthsParse) {                                                                                        // 955
        // this is not used                                                                                          // 956
        this._monthsParse = [];                                                                                      // 957
        this._longMonthsParse = [];                                                                                  // 958
        this._shortMonthsParse = [];                                                                                 // 959
        for (i = 0; i < 12; ++i) {                                                                                   // 960
            mom = createUTC([2000, i]);                                                                              // 961
            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();                               // 962
            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();                                     // 963
        }                                                                                                            // 964
    }                                                                                                                // 965
                                                                                                                     // 966
    if (strict) {                                                                                                    // 967
        if (format === 'MMM') {                                                                                      // 968
            ii = indexOf.call(this._shortMonthsParse, llc);                                                          // 969
            return ii !== -1 ? ii : null;                                                                            // 970
        } else {                                                                                                     // 971
            ii = indexOf.call(this._longMonthsParse, llc);                                                           // 972
            return ii !== -1 ? ii : null;                                                                            // 973
        }                                                                                                            // 974
    } else {                                                                                                         // 975
        if (format === 'MMM') {                                                                                      // 976
            ii = indexOf.call(this._shortMonthsParse, llc);                                                          // 977
            if (ii !== -1) {                                                                                         // 978
                return ii;                                                                                           // 979
            }                                                                                                        // 980
            ii = indexOf.call(this._longMonthsParse, llc);                                                           // 981
            return ii !== -1 ? ii : null;                                                                            // 982
        } else {                                                                                                     // 983
            ii = indexOf.call(this._longMonthsParse, llc);                                                           // 984
            if (ii !== -1) {                                                                                         // 985
                return ii;                                                                                           // 986
            }                                                                                                        // 987
            ii = indexOf.call(this._shortMonthsParse, llc);                                                          // 988
            return ii !== -1 ? ii : null;                                                                            // 989
        }                                                                                                            // 990
    }                                                                                                                // 991
}                                                                                                                    // 992
                                                                                                                     // 993
function localeMonthsParse (monthName, format, strict) {                                                             // 994
    var i, mom, regex;                                                                                               // 995
                                                                                                                     // 996
    if (this._monthsParseExact) {                                                                                    // 997
        return handleStrictParse.call(this, monthName, format, strict);                                              // 998
    }                                                                                                                // 999
                                                                                                                     // 1000
    if (!this._monthsParse) {                                                                                        // 1001
        this._monthsParse = [];                                                                                      // 1002
        this._longMonthsParse = [];                                                                                  // 1003
        this._shortMonthsParse = [];                                                                                 // 1004
    }                                                                                                                // 1005
                                                                                                                     // 1006
    // TODO: add sorting                                                                                             // 1007
    // Sorting makes sure if one month (or abbr) is a prefix of another                                              // 1008
    // see sorting in computeMonthsParse                                                                             // 1009
    for (i = 0; i < 12; i++) {                                                                                       // 1010
        // make the regex if we don't have it already                                                                // 1011
        mom = createUTC([2000, i]);                                                                                  // 1012
        if (strict && !this._longMonthsParse[i]) {                                                                   // 1013
            this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');           // 1014
            this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');     // 1015
        }                                                                                                            // 1016
        if (!strict && !this._monthsParse[i]) {                                                                      // 1017
            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');                                   // 1018
            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');                                          // 1019
        }                                                                                                            // 1020
        // test the regex                                                                                            // 1021
        if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {                               // 1022
            return i;                                                                                                // 1023
        } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {                        // 1024
            return i;                                                                                                // 1025
        } else if (!strict && this._monthsParse[i].test(monthName)) {                                                // 1026
            return i;                                                                                                // 1027
        }                                                                                                            // 1028
    }                                                                                                                // 1029
}                                                                                                                    // 1030
                                                                                                                     // 1031
// MOMENTS                                                                                                           // 1032
                                                                                                                     // 1033
function setMonth (mom, value) {                                                                                     // 1034
    var dayOfMonth;                                                                                                  // 1035
                                                                                                                     // 1036
    if (!mom.isValid()) {                                                                                            // 1037
        // No op                                                                                                     // 1038
        return mom;                                                                                                  // 1039
    }                                                                                                                // 1040
                                                                                                                     // 1041
    if (typeof value === 'string') {                                                                                 // 1042
        if (/^\d+$/.test(value)) {                                                                                   // 1043
            value = toInt(value);                                                                                    // 1044
        } else {                                                                                                     // 1045
            value = mom.localeData().monthsParse(value);                                                             // 1046
            // TODO: Another silent failure?                                                                         // 1047
            if (!isNumber(value)) {                                                                                  // 1048
                return mom;                                                                                          // 1049
            }                                                                                                        // 1050
        }                                                                                                            // 1051
    }                                                                                                                // 1052
                                                                                                                     // 1053
    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));                                               // 1054
    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);                                          // 1055
    return mom;                                                                                                      // 1056
}                                                                                                                    // 1057
                                                                                                                     // 1058
function getSetMonth (value) {                                                                                       // 1059
    if (value != null) {                                                                                             // 1060
        setMonth(this, value);                                                                                       // 1061
        hooks.updateOffset(this, true);                                                                              // 1062
        return this;                                                                                                 // 1063
    } else {                                                                                                         // 1064
        return get(this, 'Month');                                                                                   // 1065
    }                                                                                                                // 1066
}                                                                                                                    // 1067
                                                                                                                     // 1068
function getDaysInMonth () {                                                                                         // 1069
    return daysInMonth(this.year(), this.month());                                                                   // 1070
}                                                                                                                    // 1071
                                                                                                                     // 1072
var defaultMonthsShortRegex = matchWord;                                                                             // 1073
function monthsShortRegex (isStrict) {                                                                               // 1074
    if (this._monthsParseExact) {                                                                                    // 1075
        if (!hasOwnProp(this, '_monthsRegex')) {                                                                     // 1076
            computeMonthsParse.call(this);                                                                           // 1077
        }                                                                                                            // 1078
        if (isStrict) {                                                                                              // 1079
            return this._monthsShortStrictRegex;                                                                     // 1080
        } else {                                                                                                     // 1081
            return this._monthsShortRegex;                                                                           // 1082
        }                                                                                                            // 1083
    } else {                                                                                                         // 1084
        if (!hasOwnProp(this, '_monthsShortRegex')) {                                                                // 1085
            this._monthsShortRegex = defaultMonthsShortRegex;                                                        // 1086
        }                                                                                                            // 1087
        return this._monthsShortStrictRegex && isStrict ?                                                            // 1088
            this._monthsShortStrictRegex : this._monthsShortRegex;                                                   // 1089
    }                                                                                                                // 1090
}                                                                                                                    // 1091
                                                                                                                     // 1092
var defaultMonthsRegex = matchWord;                                                                                  // 1093
function monthsRegex (isStrict) {                                                                                    // 1094
    if (this._monthsParseExact) {                                                                                    // 1095
        if (!hasOwnProp(this, '_monthsRegex')) {                                                                     // 1096
            computeMonthsParse.call(this);                                                                           // 1097
        }                                                                                                            // 1098
        if (isStrict) {                                                                                              // 1099
            return this._monthsStrictRegex;                                                                          // 1100
        } else {                                                                                                     // 1101
            return this._monthsRegex;                                                                                // 1102
        }                                                                                                            // 1103
    } else {                                                                                                         // 1104
        if (!hasOwnProp(this, '_monthsRegex')) {                                                                     // 1105
            this._monthsRegex = defaultMonthsRegex;                                                                  // 1106
        }                                                                                                            // 1107
        return this._monthsStrictRegex && isStrict ?                                                                 // 1108
            this._monthsStrictRegex : this._monthsRegex;                                                             // 1109
    }                                                                                                                // 1110
}                                                                                                                    // 1111
                                                                                                                     // 1112
function computeMonthsParse () {                                                                                     // 1113
    function cmpLenRev(a, b) {                                                                                       // 1114
        return b.length - a.length;                                                                                  // 1115
    }                                                                                                                // 1116
                                                                                                                     // 1117
    var shortPieces = [], longPieces = [], mixedPieces = [],                                                         // 1118
        i, mom;                                                                                                      // 1119
    for (i = 0; i < 12; i++) {                                                                                       // 1120
        // make the regex if we don't have it already                                                                // 1121
        mom = createUTC([2000, i]);                                                                                  // 1122
        shortPieces.push(this.monthsShort(mom, ''));                                                                 // 1123
        longPieces.push(this.months(mom, ''));                                                                       // 1124
        mixedPieces.push(this.months(mom, ''));                                                                      // 1125
        mixedPieces.push(this.monthsShort(mom, ''));                                                                 // 1126
    }                                                                                                                // 1127
    // Sorting makes sure if one month (or abbr) is a prefix of another it                                           // 1128
    // will match the longer piece.                                                                                  // 1129
    shortPieces.sort(cmpLenRev);                                                                                     // 1130
    longPieces.sort(cmpLenRev);                                                                                      // 1131
    mixedPieces.sort(cmpLenRev);                                                                                     // 1132
    for (i = 0; i < 12; i++) {                                                                                       // 1133
        shortPieces[i] = regexEscape(shortPieces[i]);                                                                // 1134
        longPieces[i] = regexEscape(longPieces[i]);                                                                  // 1135
    }                                                                                                                // 1136
    for (i = 0; i < 24; i++) {                                                                                       // 1137
        mixedPieces[i] = regexEscape(mixedPieces[i]);                                                                // 1138
    }                                                                                                                // 1139
                                                                                                                     // 1140
    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');                                         // 1141
    this._monthsShortRegex = this._monthsRegex;                                                                      // 1142
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');                                    // 1143
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');                              // 1144
}                                                                                                                    // 1145
                                                                                                                     // 1146
function createDate (y, m, d, h, M, s, ms) {                                                                         // 1147
    // can't just apply() to create a date:                                                                          // 1148
    // https://stackoverflow.com/q/181348                                                                            // 1149
    var date = new Date(y, m, d, h, M, s, ms);                                                                       // 1150
                                                                                                                     // 1151
    // the date constructor remaps years 0-99 to 1900-1999                                                           // 1152
    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {                                                         // 1153
        date.setFullYear(y);                                                                                         // 1154
    }                                                                                                                // 1155
    return date;                                                                                                     // 1156
}                                                                                                                    // 1157
                                                                                                                     // 1158
function createUTCDate (y) {                                                                                         // 1159
    var date = new Date(Date.UTC.apply(null, arguments));                                                            // 1160
                                                                                                                     // 1161
    // the Date.UTC function remaps years 0-99 to 1900-1999                                                          // 1162
    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {                                                      // 1163
        date.setUTCFullYear(y);                                                                                      // 1164
    }                                                                                                                // 1165
    return date;                                                                                                     // 1166
}                                                                                                                    // 1167
                                                                                                                     // 1168
// start-of-first-week - start-of-year                                                                               // 1169
function firstWeekOffset(year, dow, doy) {                                                                           // 1170
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)                      // 1171
        fwd = 7 + dow - doy,                                                                                         // 1172
        // first-week day local weekday -- which local weekday is fwd                                                // 1173
        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;                                             // 1174
                                                                                                                     // 1175
    return -fwdlw + fwd - 1;                                                                                         // 1176
}                                                                                                                    // 1177
                                                                                                                     // 1178
// https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday          // 1179
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {                                                         // 1180
    var localWeekday = (7 + weekday - dow) % 7,                                                                      // 1181
        weekOffset = firstWeekOffset(year, dow, doy),                                                                // 1182
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,                                                  // 1183
        resYear, resDayOfYear;                                                                                       // 1184
                                                                                                                     // 1185
    if (dayOfYear <= 0) {                                                                                            // 1186
        resYear = year - 1;                                                                                          // 1187
        resDayOfYear = daysInYear(resYear) + dayOfYear;                                                              // 1188
    } else if (dayOfYear > daysInYear(year)) {                                                                       // 1189
        resYear = year + 1;                                                                                          // 1190
        resDayOfYear = dayOfYear - daysInYear(year);                                                                 // 1191
    } else {                                                                                                         // 1192
        resYear = year;                                                                                              // 1193
        resDayOfYear = dayOfYear;                                                                                    // 1194
    }                                                                                                                // 1195
                                                                                                                     // 1196
    return {                                                                                                         // 1197
        year: resYear,                                                                                               // 1198
        dayOfYear: resDayOfYear                                                                                      // 1199
    };                                                                                                               // 1200
}                                                                                                                    // 1201
                                                                                                                     // 1202
function weekOfYear(mom, dow, doy) {                                                                                 // 1203
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),                                                          // 1204
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,                                               // 1205
        resWeek, resYear;                                                                                            // 1206
                                                                                                                     // 1207
    if (week < 1) {                                                                                                  // 1208
        resYear = mom.year() - 1;                                                                                    // 1209
        resWeek = week + weeksInYear(resYear, dow, doy);                                                             // 1210
    } else if (week > weeksInYear(mom.year(), dow, doy)) {                                                           // 1211
        resWeek = week - weeksInYear(mom.year(), dow, doy);                                                          // 1212
        resYear = mom.year() + 1;                                                                                    // 1213
    } else {                                                                                                         // 1214
        resYear = mom.year();                                                                                        // 1215
        resWeek = week;                                                                                              // 1216
    }                                                                                                                // 1217
                                                                                                                     // 1218
    return {                                                                                                         // 1219
        week: resWeek,                                                                                               // 1220
        year: resYear                                                                                                // 1221
    };                                                                                                               // 1222
}                                                                                                                    // 1223
                                                                                                                     // 1224
function weeksInYear(year, dow, doy) {                                                                               // 1225
    var weekOffset = firstWeekOffset(year, dow, doy),                                                                // 1226
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);                                                        // 1227
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;                                                     // 1228
}                                                                                                                    // 1229
                                                                                                                     // 1230
// FORMATTING                                                                                                        // 1231
                                                                                                                     // 1232
addFormatToken('w', ['ww', 2], 'wo', 'week');                                                                        // 1233
addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');                                                                     // 1234
                                                                                                                     // 1235
// ALIASES                                                                                                           // 1236
                                                                                                                     // 1237
addUnitAlias('week', 'w');                                                                                           // 1238
addUnitAlias('isoWeek', 'W');                                                                                        // 1239
                                                                                                                     // 1240
// PRIORITIES                                                                                                        // 1241
                                                                                                                     // 1242
addUnitPriority('week', 5);                                                                                          // 1243
addUnitPriority('isoWeek', 5);                                                                                       // 1244
                                                                                                                     // 1245
// PARSING                                                                                                           // 1246
                                                                                                                     // 1247
addRegexToken('w',  match1to2);                                                                                      // 1248
addRegexToken('ww', match1to2, match2);                                                                              // 1249
addRegexToken('W',  match1to2);                                                                                      // 1250
addRegexToken('WW', match1to2, match2);                                                                              // 1251
                                                                                                                     // 1252
addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {                                    // 1253
    week[token.substr(0, 1)] = toInt(input);                                                                         // 1254
});                                                                                                                  // 1255
                                                                                                                     // 1256
// HELPERS                                                                                                           // 1257
                                                                                                                     // 1258
// LOCALES                                                                                                           // 1259
                                                                                                                     // 1260
function localeWeek (mom) {                                                                                          // 1261
    return weekOfYear(mom, this._week.dow, this._week.doy).week;                                                     // 1262
}                                                                                                                    // 1263
                                                                                                                     // 1264
var defaultLocaleWeek = {                                                                                            // 1265
    dow : 0, // Sunday is the first day of the week.                                                                 // 1266
    doy : 6  // The week that contains Jan 1st is the first week of the year.                                        // 1267
};                                                                                                                   // 1268
                                                                                                                     // 1269
function localeFirstDayOfWeek () {                                                                                   // 1270
    return this._week.dow;                                                                                           // 1271
}                                                                                                                    // 1272
                                                                                                                     // 1273
function localeFirstDayOfYear () {                                                                                   // 1274
    return this._week.doy;                                                                                           // 1275
}                                                                                                                    // 1276
                                                                                                                     // 1277
// MOMENTS                                                                                                           // 1278
                                                                                                                     // 1279
function getSetWeek (input) {                                                                                        // 1280
    var week = this.localeData().week(this);                                                                         // 1281
    return input == null ? week : this.add((input - week) * 7, 'd');                                                 // 1282
}                                                                                                                    // 1283
                                                                                                                     // 1284
function getSetISOWeek (input) {                                                                                     // 1285
    var week = weekOfYear(this, 1, 4).week;                                                                          // 1286
    return input == null ? week : this.add((input - week) * 7, 'd');                                                 // 1287
}                                                                                                                    // 1288
                                                                                                                     // 1289
// FORMATTING                                                                                                        // 1290
                                                                                                                     // 1291
addFormatToken('d', 0, 'do', 'day');                                                                                 // 1292
                                                                                                                     // 1293
addFormatToken('dd', 0, 0, function (format) {                                                                       // 1294
    return this.localeData().weekdaysMin(this, format);                                                              // 1295
});                                                                                                                  // 1296
                                                                                                                     // 1297
addFormatToken('ddd', 0, 0, function (format) {                                                                      // 1298
    return this.localeData().weekdaysShort(this, format);                                                            // 1299
});                                                                                                                  // 1300
                                                                                                                     // 1301
addFormatToken('dddd', 0, 0, function (format) {                                                                     // 1302
    return this.localeData().weekdays(this, format);                                                                 // 1303
});                                                                                                                  // 1304
                                                                                                                     // 1305
addFormatToken('e', 0, 0, 'weekday');                                                                                // 1306
addFormatToken('E', 0, 0, 'isoWeekday');                                                                             // 1307
                                                                                                                     // 1308
// ALIASES                                                                                                           // 1309
                                                                                                                     // 1310
addUnitAlias('day', 'd');                                                                                            // 1311
addUnitAlias('weekday', 'e');                                                                                        // 1312
addUnitAlias('isoWeekday', 'E');                                                                                     // 1313
                                                                                                                     // 1314
// PRIORITY                                                                                                          // 1315
addUnitPriority('day', 11);                                                                                          // 1316
addUnitPriority('weekday', 11);                                                                                      // 1317
addUnitPriority('isoWeekday', 11);                                                                                   // 1318
                                                                                                                     // 1319
// PARSING                                                                                                           // 1320
                                                                                                                     // 1321
addRegexToken('d',    match1to2);                                                                                    // 1322
addRegexToken('e',    match1to2);                                                                                    // 1323
addRegexToken('E',    match1to2);                                                                                    // 1324
addRegexToken('dd',   function (isStrict, locale) {                                                                  // 1325
    return locale.weekdaysMinRegex(isStrict);                                                                        // 1326
});                                                                                                                  // 1327
addRegexToken('ddd',   function (isStrict, locale) {                                                                 // 1328
    return locale.weekdaysShortRegex(isStrict);                                                                      // 1329
});                                                                                                                  // 1330
addRegexToken('dddd',   function (isStrict, locale) {                                                                // 1331
    return locale.weekdaysRegex(isStrict);                                                                           // 1332
});                                                                                                                  // 1333
                                                                                                                     // 1334
addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {                                     // 1335
    var weekday = config._locale.weekdaysParse(input, token, config._strict);                                        // 1336
    // if we didn't get a weekday name, mark the date as invalid                                                     // 1337
    if (weekday != null) {                                                                                           // 1338
        week.d = weekday;                                                                                            // 1339
    } else {                                                                                                         // 1340
        getParsingFlags(config).invalidWeekday = input;                                                              // 1341
    }                                                                                                                // 1342
});                                                                                                                  // 1343
                                                                                                                     // 1344
addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {                                           // 1345
    week[token] = toInt(input);                                                                                      // 1346
});                                                                                                                  // 1347
                                                                                                                     // 1348
// HELPERS                                                                                                           // 1349
                                                                                                                     // 1350
function parseWeekday(input, locale) {                                                                               // 1351
    if (typeof input !== 'string') {                                                                                 // 1352
        return input;                                                                                                // 1353
    }                                                                                                                // 1354
                                                                                                                     // 1355
    if (!isNaN(input)) {                                                                                             // 1356
        return parseInt(input, 10);                                                                                  // 1357
    }                                                                                                                // 1358
                                                                                                                     // 1359
    input = locale.weekdaysParse(input);                                                                             // 1360
    if (typeof input === 'number') {                                                                                 // 1361
        return input;                                                                                                // 1362
    }                                                                                                                // 1363
                                                                                                                     // 1364
    return null;                                                                                                     // 1365
}                                                                                                                    // 1366
                                                                                                                     // 1367
function parseIsoWeekday(input, locale) {                                                                            // 1368
    if (typeof input === 'string') {                                                                                 // 1369
        return locale.weekdaysParse(input) % 7 || 7;                                                                 // 1370
    }                                                                                                                // 1371
    return isNaN(input) ? null : input;                                                                              // 1372
}                                                                                                                    // 1373
                                                                                                                     // 1374
// LOCALES                                                                                                           // 1375
                                                                                                                     // 1376
var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');                   // 1377
function localeWeekdays (m, format) {                                                                                // 1378
    if (!m) {                                                                                                        // 1379
        return isArray(this._weekdays) ? this._weekdays :                                                            // 1380
            this._weekdays['standalone'];                                                                            // 1381
    }                                                                                                                // 1382
    return isArray(this._weekdays) ? this._weekdays[m.day()] :                                                       // 1383
        this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];                     // 1384
}                                                                                                                    // 1385
                                                                                                                     // 1386
var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');                                           // 1387
function localeWeekdaysShort (m) {                                                                                   // 1388
    return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;                                                 // 1389
}                                                                                                                    // 1390
                                                                                                                     // 1391
var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');                                                    // 1392
function localeWeekdaysMin (m) {                                                                                     // 1393
    return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;                                                     // 1394
}                                                                                                                    // 1395
                                                                                                                     // 1396
function handleStrictParse$1(weekdayName, format, strict) {                                                          // 1397
    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();                                                           // 1398
    if (!this._weekdaysParse) {                                                                                      // 1399
        this._weekdaysParse = [];                                                                                    // 1400
        this._shortWeekdaysParse = [];                                                                               // 1401
        this._minWeekdaysParse = [];                                                                                 // 1402
                                                                                                                     // 1403
        for (i = 0; i < 7; ++i) {                                                                                    // 1404
            mom = createUTC([2000, 1]).day(i);                                                                       // 1405
            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();                               // 1406
            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();                           // 1407
            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();                                     // 1408
        }                                                                                                            // 1409
    }                                                                                                                // 1410
                                                                                                                     // 1411
    if (strict) {                                                                                                    // 1412
        if (format === 'dddd') {                                                                                     // 1413
            ii = indexOf.call(this._weekdaysParse, llc);                                                             // 1414
            return ii !== -1 ? ii : null;                                                                            // 1415
        } else if (format === 'ddd') {                                                                               // 1416
            ii = indexOf.call(this._shortWeekdaysParse, llc);                                                        // 1417
            return ii !== -1 ? ii : null;                                                                            // 1418
        } else {                                                                                                     // 1419
            ii = indexOf.call(this._minWeekdaysParse, llc);                                                          // 1420
            return ii !== -1 ? ii : null;                                                                            // 1421
        }                                                                                                            // 1422
    } else {                                                                                                         // 1423
        if (format === 'dddd') {                                                                                     // 1424
            ii = indexOf.call(this._weekdaysParse, llc);                                                             // 1425
            if (ii !== -1) {                                                                                         // 1426
                return ii;                                                                                           // 1427
            }                                                                                                        // 1428
            ii = indexOf.call(this._shortWeekdaysParse, llc);                                                        // 1429
            if (ii !== -1) {                                                                                         // 1430
                return ii;                                                                                           // 1431
            }                                                                                                        // 1432
            ii = indexOf.call(this._minWeekdaysParse, llc);                                                          // 1433
            return ii !== -1 ? ii : null;                                                                            // 1434
        } else if (format === 'ddd') {                                                                               // 1435
            ii = indexOf.call(this._shortWeekdaysParse, llc);                                                        // 1436
            if (ii !== -1) {                                                                                         // 1437
                return ii;                                                                                           // 1438
            }                                                                                                        // 1439
            ii = indexOf.call(this._weekdaysParse, llc);                                                             // 1440
            if (ii !== -1) {                                                                                         // 1441
                return ii;                                                                                           // 1442
            }                                                                                                        // 1443
            ii = indexOf.call(this._minWeekdaysParse, llc);                                                          // 1444
            return ii !== -1 ? ii : null;                                                                            // 1445
        } else {                                                                                                     // 1446
            ii = indexOf.call(this._minWeekdaysParse, llc);                                                          // 1447
            if (ii !== -1) {                                                                                         // 1448
                return ii;                                                                                           // 1449
            }                                                                                                        // 1450
            ii = indexOf.call(this._weekdaysParse, llc);                                                             // 1451
            if (ii !== -1) {                                                                                         // 1452
                return ii;                                                                                           // 1453
            }                                                                                                        // 1454
            ii = indexOf.call(this._shortWeekdaysParse, llc);                                                        // 1455
            return ii !== -1 ? ii : null;                                                                            // 1456
        }                                                                                                            // 1457
    }                                                                                                                // 1458
}                                                                                                                    // 1459
                                                                                                                     // 1460
function localeWeekdaysParse (weekdayName, format, strict) {                                                         // 1461
    var i, mom, regex;                                                                                               // 1462
                                                                                                                     // 1463
    if (this._weekdaysParseExact) {                                                                                  // 1464
        return handleStrictParse$1.call(this, weekdayName, format, strict);                                          // 1465
    }                                                                                                                // 1466
                                                                                                                     // 1467
    if (!this._weekdaysParse) {                                                                                      // 1468
        this._weekdaysParse = [];                                                                                    // 1469
        this._minWeekdaysParse = [];                                                                                 // 1470
        this._shortWeekdaysParse = [];                                                                               // 1471
        this._fullWeekdaysParse = [];                                                                                // 1472
    }                                                                                                                // 1473
                                                                                                                     // 1474
    for (i = 0; i < 7; i++) {                                                                                        // 1475
        // make the regex if we don't have it already                                                                // 1476
                                                                                                                     // 1477
        mom = createUTC([2000, 1]).day(i);                                                                           // 1478
        if (strict && !this._fullWeekdaysParse[i]) {                                                                 // 1479
            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');    // 1480
            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');  // 1482
        }                                                                                                            // 1483
        if (!this._weekdaysParse[i]) {                                                                               // 1484
            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');                                        // 1486
        }                                                                                                            // 1487
        // test the regex                                                                                            // 1488
        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {                           // 1489
            return i;                                                                                                // 1490
        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {                    // 1491
            return i;                                                                                                // 1492
        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {                       // 1493
            return i;                                                                                                // 1494
        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {                                            // 1495
            return i;                                                                                                // 1496
        }                                                                                                            // 1497
    }                                                                                                                // 1498
}                                                                                                                    // 1499
                                                                                                                     // 1500
// MOMENTS                                                                                                           // 1501
                                                                                                                     // 1502
function getSetDayOfWeek (input) {                                                                                   // 1503
    if (!this.isValid()) {                                                                                           // 1504
        return input != null ? this : NaN;                                                                           // 1505
    }                                                                                                                // 1506
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();                                                  // 1507
    if (input != null) {                                                                                             // 1508
        input = parseWeekday(input, this.localeData());                                                              // 1509
        return this.add(input - day, 'd');                                                                           // 1510
    } else {                                                                                                         // 1511
        return day;                                                                                                  // 1512
    }                                                                                                                // 1513
}                                                                                                                    // 1514
                                                                                                                     // 1515
function getSetLocaleDayOfWeek (input) {                                                                             // 1516
    if (!this.isValid()) {                                                                                           // 1517
        return input != null ? this : NaN;                                                                           // 1518
    }                                                                                                                // 1519
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;                                                // 1520
    return input == null ? weekday : this.add(input - weekday, 'd');                                                 // 1521
}                                                                                                                    // 1522
                                                                                                                     // 1523
function getSetISODayOfWeek (input) {                                                                                // 1524
    if (!this.isValid()) {                                                                                           // 1525
        return input != null ? this : NaN;                                                                           // 1526
    }                                                                                                                // 1527
                                                                                                                     // 1528
    // behaves the same as moment#day except                                                                         // 1529
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)                                                // 1530
    // as a setter, sunday should belong to the previous week.                                                       // 1531
                                                                                                                     // 1532
    if (input != null) {                                                                                             // 1533
        var weekday = parseIsoWeekday(input, this.localeData());                                                     // 1534
        return this.day(this.day() % 7 ? weekday : weekday - 7);                                                     // 1535
    } else {                                                                                                         // 1536
        return this.day() || 7;                                                                                      // 1537
    }                                                                                                                // 1538
}                                                                                                                    // 1539
                                                                                                                     // 1540
var defaultWeekdaysRegex = matchWord;                                                                                // 1541
function weekdaysRegex (isStrict) {                                                                                  // 1542
    if (this._weekdaysParseExact) {                                                                                  // 1543
        if (!hasOwnProp(this, '_weekdaysRegex')) {                                                                   // 1544
            computeWeekdaysParse.call(this);                                                                         // 1545
        }                                                                                                            // 1546
        if (isStrict) {                                                                                              // 1547
            return this._weekdaysStrictRegex;                                                                        // 1548
        } else {                                                                                                     // 1549
            return this._weekdaysRegex;                                                                              // 1550
        }                                                                                                            // 1551
    } else {                                                                                                         // 1552
        if (!hasOwnProp(this, '_weekdaysRegex')) {                                                                   // 1553
            this._weekdaysRegex = defaultWeekdaysRegex;                                                              // 1554
        }                                                                                                            // 1555
        return this._weekdaysStrictRegex && isStrict ?                                                               // 1556
            this._weekdaysStrictRegex : this._weekdaysRegex;                                                         // 1557
    }                                                                                                                // 1558
}                                                                                                                    // 1559
                                                                                                                     // 1560
var defaultWeekdaysShortRegex = matchWord;                                                                           // 1561
function weekdaysShortRegex (isStrict) {                                                                             // 1562
    if (this._weekdaysParseExact) {                                                                                  // 1563
        if (!hasOwnProp(this, '_weekdaysRegex')) {                                                                   // 1564
            computeWeekdaysParse.call(this);                                                                         // 1565
        }                                                                                                            // 1566
        if (isStrict) {                                                                                              // 1567
            return this._weekdaysShortStrictRegex;                                                                   // 1568
        } else {                                                                                                     // 1569
            return this._weekdaysShortRegex;                                                                         // 1570
        }                                                                                                            // 1571
    } else {                                                                                                         // 1572
        if (!hasOwnProp(this, '_weekdaysShortRegex')) {                                                              // 1573
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;                                                    // 1574
        }                                                                                                            // 1575
        return this._weekdaysShortStrictRegex && isStrict ?                                                          // 1576
            this._weekdaysShortStrictRegex : this._weekdaysShortRegex;                                               // 1577
    }                                                                                                                // 1578
}                                                                                                                    // 1579
                                                                                                                     // 1580
var defaultWeekdaysMinRegex = matchWord;                                                                             // 1581
function weekdaysMinRegex (isStrict) {                                                                               // 1582
    if (this._weekdaysParseExact) {                                                                                  // 1583
        if (!hasOwnProp(this, '_weekdaysRegex')) {                                                                   // 1584
            computeWeekdaysParse.call(this);                                                                         // 1585
        }                                                                                                            // 1586
        if (isStrict) {                                                                                              // 1587
            return this._weekdaysMinStrictRegex;                                                                     // 1588
        } else {                                                                                                     // 1589
            return this._weekdaysMinRegex;                                                                           // 1590
        }                                                                                                            // 1591
    } else {                                                                                                         // 1592
        if (!hasOwnProp(this, '_weekdaysMinRegex')) {                                                                // 1593
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;                                                        // 1594
        }                                                                                                            // 1595
        return this._weekdaysMinStrictRegex && isStrict ?                                                            // 1596
            this._weekdaysMinStrictRegex : this._weekdaysMinRegex;                                                   // 1597
    }                                                                                                                // 1598
}                                                                                                                    // 1599
                                                                                                                     // 1600
                                                                                                                     // 1601
function computeWeekdaysParse () {                                                                                   // 1602
    function cmpLenRev(a, b) {                                                                                       // 1603
        return b.length - a.length;                                                                                  // 1604
    }                                                                                                                // 1605
                                                                                                                     // 1606
    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],                                         // 1607
        i, mom, minp, shortp, longp;                                                                                 // 1608
    for (i = 0; i < 7; i++) {                                                                                        // 1609
        // make the regex if we don't have it already                                                                // 1610
        mom = createUTC([2000, 1]).day(i);                                                                           // 1611
        minp = this.weekdaysMin(mom, '');                                                                            // 1612
        shortp = this.weekdaysShort(mom, '');                                                                        // 1613
        longp = this.weekdays(mom, '');                                                                              // 1614
        minPieces.push(minp);                                                                                        // 1615
        shortPieces.push(shortp);                                                                                    // 1616
        longPieces.push(longp);                                                                                      // 1617
        mixedPieces.push(minp);                                                                                      // 1618
        mixedPieces.push(shortp);                                                                                    // 1619
        mixedPieces.push(longp);                                                                                     // 1620
    }                                                                                                                // 1621
    // Sorting makes sure if one weekday (or abbr) is a prefix of another it                                         // 1622
    // will match the longer piece.                                                                                  // 1623
    minPieces.sort(cmpLenRev);                                                                                       // 1624
    shortPieces.sort(cmpLenRev);                                                                                     // 1625
    longPieces.sort(cmpLenRev);                                                                                      // 1626
    mixedPieces.sort(cmpLenRev);                                                                                     // 1627
    for (i = 0; i < 7; i++) {                                                                                        // 1628
        shortPieces[i] = regexEscape(shortPieces[i]);                                                                // 1629
        longPieces[i] = regexEscape(longPieces[i]);                                                                  // 1630
        mixedPieces[i] = regexEscape(mixedPieces[i]);                                                                // 1631
    }                                                                                                                // 1632
                                                                                                                     // 1633
    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');                                       // 1634
    this._weekdaysShortRegex = this._weekdaysRegex;                                                                  // 1635
    this._weekdaysMinRegex = this._weekdaysRegex;                                                                    // 1636
                                                                                                                     // 1637
    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');                                  // 1638
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');                            // 1639
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');                                // 1640
}                                                                                                                    // 1641
                                                                                                                     // 1642
// FORMATTING                                                                                                        // 1643
                                                                                                                     // 1644
function hFormat() {                                                                                                 // 1645
    return this.hours() % 12 || 12;                                                                                  // 1646
}                                                                                                                    // 1647
                                                                                                                     // 1648
function kFormat() {                                                                                                 // 1649
    return this.hours() || 24;                                                                                       // 1650
}                                                                                                                    // 1651
                                                                                                                     // 1652
addFormatToken('H', ['HH', 2], 0, 'hour');                                                                           // 1653
addFormatToken('h', ['hh', 2], 0, hFormat);                                                                          // 1654
addFormatToken('k', ['kk', 2], 0, kFormat);                                                                          // 1655
                                                                                                                     // 1656
addFormatToken('hmm', 0, 0, function () {                                                                            // 1657
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);                                                   // 1658
});                                                                                                                  // 1659
                                                                                                                     // 1660
addFormatToken('hmmss', 0, 0, function () {                                                                          // 1661
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +                                                  // 1662
        zeroFill(this.seconds(), 2);                                                                                 // 1663
});                                                                                                                  // 1664
                                                                                                                     // 1665
addFormatToken('Hmm', 0, 0, function () {                                                                            // 1666
    return '' + this.hours() + zeroFill(this.minutes(), 2);                                                          // 1667
});                                                                                                                  // 1668
                                                                                                                     // 1669
addFormatToken('Hmmss', 0, 0, function () {                                                                          // 1670
    return '' + this.hours() + zeroFill(this.minutes(), 2) +                                                         // 1671
        zeroFill(this.seconds(), 2);                                                                                 // 1672
});                                                                                                                  // 1673
                                                                                                                     // 1674
function meridiem (token, lowercase) {                                                                               // 1675
    addFormatToken(token, 0, 0, function () {                                                                        // 1676
        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);                                  // 1677
    });                                                                                                              // 1678
}                                                                                                                    // 1679
                                                                                                                     // 1680
meridiem('a', true);                                                                                                 // 1681
meridiem('A', false);                                                                                                // 1682
                                                                                                                     // 1683
// ALIASES                                                                                                           // 1684
                                                                                                                     // 1685
addUnitAlias('hour', 'h');                                                                                           // 1686
                                                                                                                     // 1687
// PRIORITY                                                                                                          // 1688
addUnitPriority('hour', 13);                                                                                         // 1689
                                                                                                                     // 1690
// PARSING                                                                                                           // 1691
                                                                                                                     // 1692
function matchMeridiem (isStrict, locale) {                                                                          // 1693
    return locale._meridiemParse;                                                                                    // 1694
}                                                                                                                    // 1695
                                                                                                                     // 1696
addRegexToken('a',  matchMeridiem);                                                                                  // 1697
addRegexToken('A',  matchMeridiem);                                                                                  // 1698
addRegexToken('H',  match1to2);                                                                                      // 1699
addRegexToken('h',  match1to2);                                                                                      // 1700
addRegexToken('k',  match1to2);                                                                                      // 1701
addRegexToken('HH', match1to2, match2);                                                                              // 1702
addRegexToken('hh', match1to2, match2);                                                                              // 1703
addRegexToken('kk', match1to2, match2);                                                                              // 1704
                                                                                                                     // 1705
addRegexToken('hmm', match3to4);                                                                                     // 1706
addRegexToken('hmmss', match5to6);                                                                                   // 1707
addRegexToken('Hmm', match3to4);                                                                                     // 1708
addRegexToken('Hmmss', match5to6);                                                                                   // 1709
                                                                                                                     // 1710
addParseToken(['H', 'HH'], HOUR);                                                                                    // 1711
addParseToken(['k', 'kk'], function (input, array, config) {                                                         // 1712
    var kInput = toInt(input);                                                                                       // 1713
    array[HOUR] = kInput === 24 ? 0 : kInput;                                                                        // 1714
});                                                                                                                  // 1715
addParseToken(['a', 'A'], function (input, array, config) {                                                          // 1716
    config._isPm = config._locale.isPM(input);                                                                       // 1717
    config._meridiem = input;                                                                                        // 1718
});                                                                                                                  // 1719
addParseToken(['h', 'hh'], function (input, array, config) {                                                         // 1720
    array[HOUR] = toInt(input);                                                                                      // 1721
    getParsingFlags(config).bigHour = true;                                                                          // 1722
});                                                                                                                  // 1723
addParseToken('hmm', function (input, array, config) {                                                               // 1724
    var pos = input.length - 2;                                                                                      // 1725
    array[HOUR] = toInt(input.substr(0, pos));                                                                       // 1726
    array[MINUTE] = toInt(input.substr(pos));                                                                        // 1727
    getParsingFlags(config).bigHour = true;                                                                          // 1728
});                                                                                                                  // 1729
addParseToken('hmmss', function (input, array, config) {                                                             // 1730
    var pos1 = input.length - 4;                                                                                     // 1731
    var pos2 = input.length - 2;                                                                                     // 1732
    array[HOUR] = toInt(input.substr(0, pos1));                                                                      // 1733
    array[MINUTE] = toInt(input.substr(pos1, 2));                                                                    // 1734
    array[SECOND] = toInt(input.substr(pos2));                                                                       // 1735
    getParsingFlags(config).bigHour = true;                                                                          // 1736
});                                                                                                                  // 1737
addParseToken('Hmm', function (input, array, config) {                                                               // 1738
    var pos = input.length - 2;                                                                                      // 1739
    array[HOUR] = toInt(input.substr(0, pos));                                                                       // 1740
    array[MINUTE] = toInt(input.substr(pos));                                                                        // 1741
});                                                                                                                  // 1742
addParseToken('Hmmss', function (input, array, config) {                                                             // 1743
    var pos1 = input.length - 4;                                                                                     // 1744
    var pos2 = input.length - 2;                                                                                     // 1745
    array[HOUR] = toInt(input.substr(0, pos1));                                                                      // 1746
    array[MINUTE] = toInt(input.substr(pos1, 2));                                                                    // 1747
    array[SECOND] = toInt(input.substr(pos2));                                                                       // 1748
});                                                                                                                  // 1749
                                                                                                                     // 1750
// LOCALES                                                                                                           // 1751
                                                                                                                     // 1752
function localeIsPM (input) {                                                                                        // 1753
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays                               // 1754
    // Using charAt should be more compatible.                                                                       // 1755
    return ((input + '').toLowerCase().charAt(0) === 'p');                                                           // 1756
}                                                                                                                    // 1757
                                                                                                                     // 1758
var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;                                                                    // 1759
function localeMeridiem (hours, minutes, isLower) {                                                                  // 1760
    if (hours > 11) {                                                                                                // 1761
        return isLower ? 'pm' : 'PM';                                                                                // 1762
    } else {                                                                                                         // 1763
        return isLower ? 'am' : 'AM';                                                                                // 1764
    }                                                                                                                // 1765
}                                                                                                                    // 1766
                                                                                                                     // 1767
                                                                                                                     // 1768
// MOMENTS                                                                                                           // 1769
                                                                                                                     // 1770
// Setting the hour should keep the time, because the user explicitly                                                // 1771
// specified which hour he wants. So trying to maintain the same hour (in                                            // 1772
// a new timezone) makes sense. Adding/subtracting hours does not follow                                             // 1773
// this rule.                                                                                                        // 1774
var getSetHour = makeGetSet('Hours', true);                                                                          // 1775
                                                                                                                     // 1776
// months                                                                                                            // 1777
// week                                                                                                              // 1778
// weekdays                                                                                                          // 1779
// meridiem                                                                                                          // 1780
var baseConfig = {                                                                                                   // 1781
    calendar: defaultCalendar,                                                                                       // 1782
    longDateFormat: defaultLongDateFormat,                                                                           // 1783
    invalidDate: defaultInvalidDate,                                                                                 // 1784
    ordinal: defaultOrdinal,                                                                                         // 1785
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,                                                           // 1786
    relativeTime: defaultRelativeTime,                                                                               // 1787
                                                                                                                     // 1788
    months: defaultLocaleMonths,                                                                                     // 1789
    monthsShort: defaultLocaleMonthsShort,                                                                           // 1790
                                                                                                                     // 1791
    week: defaultLocaleWeek,                                                                                         // 1792
                                                                                                                     // 1793
    weekdays: defaultLocaleWeekdays,                                                                                 // 1794
    weekdaysMin: defaultLocaleWeekdaysMin,                                                                           // 1795
    weekdaysShort: defaultLocaleWeekdaysShort,                                                                       // 1796
                                                                                                                     // 1797
    meridiemParse: defaultLocaleMeridiemParse                                                                        // 1798
};                                                                                                                   // 1799
                                                                                                                     // 1800
// internal storage for locale config files                                                                          // 1801
var locales = {};                                                                                                    // 1802
var localeFamilies = {};                                                                                             // 1803
var globalLocale;                                                                                                    // 1804
                                                                                                                     // 1805
function normalizeLocale(key) {                                                                                      // 1806
    return key ? key.toLowerCase().replace('_', '-') : key;                                                          // 1807
}                                                                                                                    // 1808
                                                                                                                     // 1809
// pick the locale from the array                                                                                    // 1810
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each                         // 1811
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
function chooseLocale(names) {                                                                                       // 1813
    var i = 0, j, next, locale, split;                                                                               // 1814
                                                                                                                     // 1815
    while (i < names.length) {                                                                                       // 1816
        split = normalizeLocale(names[i]).split('-');                                                                // 1817
        j = split.length;                                                                                            // 1818
        next = normalizeLocale(names[i + 1]);                                                                        // 1819
        next = next ? next.split('-') : null;                                                                        // 1820
        while (j > 0) {                                                                                              // 1821
            locale = loadLocale(split.slice(0, j).join('-'));                                                        // 1822
            if (locale) {                                                                                            // 1823
                return locale;                                                                                       // 1824
            }                                                                                                        // 1825
            if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {                             // 1826
                //the next array item is better than a shallower substring of this one                               // 1827
                break;                                                                                               // 1828
            }                                                                                                        // 1829
            j--;                                                                                                     // 1830
        }                                                                                                            // 1831
        i++;                                                                                                         // 1832
    }                                                                                                                // 1833
    return null;                                                                                                     // 1834
}                                                                                                                    // 1835
                                                                                                                     // 1836
function loadLocale(name) {                                                                                          // 1837
    var oldLocale = null;                                                                                            // 1838
    // TODO: Find a better way to register and load all the locales in Node                                          // 1839
    if (!locales[name] && (typeof module !== 'undefined') &&                                                         // 1840
            module && module.exports) {                                                                              // 1841
        try {                                                                                                        // 1842
            oldLocale = globalLocale._abbr;                                                                          // 1843
            var aliasedRequire = require;                                                                            // 1844
            aliasedRequire('./locale/' + name);                                                                      // 1845
            getSetGlobalLocale(oldLocale);                                                                           // 1846
        } catch (e) {}                                                                                               // 1847
    }                                                                                                                // 1848
    return locales[name];                                                                                            // 1849
}                                                                                                                    // 1850
                                                                                                                     // 1851
// This function will load locale and then set the global locale.  If                                                // 1852
// no arguments are passed in, it will simply return the current global                                              // 1853
// locale key.                                                                                                       // 1854
function getSetGlobalLocale (key, values) {                                                                          // 1855
    var data;                                                                                                        // 1856
    if (key) {                                                                                                       // 1857
        if (isUndefined(values)) {                                                                                   // 1858
            data = getLocale(key);                                                                                   // 1859
        }                                                                                                            // 1860
        else {                                                                                                       // 1861
            data = defineLocale(key, values);                                                                        // 1862
        }                                                                                                            // 1863
                                                                                                                     // 1864
        if (data) {                                                                                                  // 1865
            // moment.duration._locale = moment._locale = data;                                                      // 1866
            globalLocale = data;                                                                                     // 1867
        }                                                                                                            // 1868
    }                                                                                                                // 1869
                                                                                                                     // 1870
    return globalLocale._abbr;                                                                                       // 1871
}                                                                                                                    // 1872
                                                                                                                     // 1873
function defineLocale (name, config) {                                                                               // 1874
    if (config !== null) {                                                                                           // 1875
        var parentConfig = baseConfig;                                                                               // 1876
        config.abbr = name;                                                                                          // 1877
        if (locales[name] != null) {                                                                                 // 1878
            deprecateSimple('defineLocaleOverride',                                                                  // 1879
                    'use moment.updateLocale(localeName, config) to change ' +                                       // 1880
                    'an existing locale. moment.defineLocale(localeName, ' +                                         // 1881
                    'config) should only be used for creating a new locale ' +                                       // 1882
                    'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');                      // 1883
            parentConfig = locales[name]._config;                                                                    // 1884
        } else if (config.parentLocale != null) {                                                                    // 1885
            if (locales[config.parentLocale] != null) {                                                              // 1886
                parentConfig = locales[config.parentLocale]._config;                                                 // 1887
            } else {                                                                                                 // 1888
                if (!localeFamilies[config.parentLocale]) {                                                          // 1889
                    localeFamilies[config.parentLocale] = [];                                                        // 1890
                }                                                                                                    // 1891
                localeFamilies[config.parentLocale].push({                                                           // 1892
                    name: name,                                                                                      // 1893
                    config: config                                                                                   // 1894
                });                                                                                                  // 1895
                return null;                                                                                         // 1896
            }                                                                                                        // 1897
        }                                                                                                            // 1898
        locales[name] = new Locale(mergeConfigs(parentConfig, config));                                              // 1899
                                                                                                                     // 1900
        if (localeFamilies[name]) {                                                                                  // 1901
            localeFamilies[name].forEach(function (x) {                                                              // 1902
                defineLocale(x.name, x.config);                                                                      // 1903
            });                                                                                                      // 1904
        }                                                                                                            // 1905
                                                                                                                     // 1906
        // backwards compat for now: also set the locale                                                             // 1907
        // make sure we set the locale AFTER all child locales have been                                             // 1908
        // created, so we won't end up with the child locale set.                                                    // 1909
        getSetGlobalLocale(name);                                                                                    // 1910
                                                                                                                     // 1911
                                                                                                                     // 1912
        return locales[name];                                                                                        // 1913
    } else {                                                                                                         // 1914
        // useful for testing                                                                                        // 1915
        delete locales[name];                                                                                        // 1916
        return null;                                                                                                 // 1917
    }                                                                                                                // 1918
}                                                                                                                    // 1919
                                                                                                                     // 1920
function updateLocale(name, config) {                                                                                // 1921
    if (config != null) {                                                                                            // 1922
        var locale, tmpLocale, parentConfig = baseConfig;                                                            // 1923
        // MERGE                                                                                                     // 1924
        tmpLocale = loadLocale(name);                                                                                // 1925
        if (tmpLocale != null) {                                                                                     // 1926
            parentConfig = tmpLocale._config;                                                                        // 1927
        }                                                                                                            // 1928
        config = mergeConfigs(parentConfig, config);                                                                 // 1929
        locale = new Locale(config);                                                                                 // 1930
        locale.parentLocale = locales[name];                                                                         // 1931
        locales[name] = locale;                                                                                      // 1932
                                                                                                                     // 1933
        // backwards compat for now: also set the locale                                                             // 1934
        getSetGlobalLocale(name);                                                                                    // 1935
    } else {                                                                                                         // 1936
        // pass null for config to unupdate, useful for tests                                                        // 1937
        if (locales[name] != null) {                                                                                 // 1938
            if (locales[name].parentLocale != null) {                                                                // 1939
                locales[name] = locales[name].parentLocale;                                                          // 1940
            } else if (locales[name] != null) {                                                                      // 1941
                delete locales[name];                                                                                // 1942
            }                                                                                                        // 1943
        }                                                                                                            // 1944
    }                                                                                                                // 1945
    return locales[name];                                                                                            // 1946
}                                                                                                                    // 1947
                                                                                                                     // 1948
// returns locale data                                                                                               // 1949
function getLocale (key) {                                                                                           // 1950
    var locale;                                                                                                      // 1951
                                                                                                                     // 1952
    if (key && key._locale && key._locale._abbr) {                                                                   // 1953
        key = key._locale._abbr;                                                                                     // 1954
    }                                                                                                                // 1955
                                                                                                                     // 1956
    if (!key) {                                                                                                      // 1957
        return globalLocale;                                                                                         // 1958
    }                                                                                                                // 1959
                                                                                                                     // 1960
    if (!isArray(key)) {                                                                                             // 1961
        //short-circuit everything else                                                                              // 1962
        locale = loadLocale(key);                                                                                    // 1963
        if (locale) {                                                                                                // 1964
            return locale;                                                                                           // 1965
        }                                                                                                            // 1966
        key = [key];                                                                                                 // 1967
    }                                                                                                                // 1968
                                                                                                                     // 1969
    return chooseLocale(key);                                                                                        // 1970
}                                                                                                                    // 1971
                                                                                                                     // 1972
function listLocales() {                                                                                             // 1973
    return keys(locales);                                                                                            // 1974
}                                                                                                                    // 1975
                                                                                                                     // 1976
function checkOverflow (m) {                                                                                         // 1977
    var overflow;                                                                                                    // 1978
    var a = m._a;                                                                                                    // 1979
                                                                                                                     // 1980
    if (a && getParsingFlags(m).overflow === -2) {                                                                   // 1981
        overflow =                                                                                                   // 1982
            a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :                                                     // 1983
            a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :                           // 1984
            a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
            a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :                                                    // 1986
            a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :                                                    // 1987
            a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :                                               // 1988
            -1;                                                                                                      // 1989
                                                                                                                     // 1990
        if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {                         // 1991
            overflow = DATE;                                                                                         // 1992
        }                                                                                                            // 1993
        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {                                                  // 1994
            overflow = WEEK;                                                                                         // 1995
        }                                                                                                            // 1996
        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {                                                // 1997
            overflow = WEEKDAY;                                                                                      // 1998
        }                                                                                                            // 1999
                                                                                                                     // 2000
        getParsingFlags(m).overflow = overflow;                                                                      // 2001
    }                                                                                                                // 2002
                                                                                                                     // 2003
    return m;                                                                                                        // 2004
}                                                                                                                    // 2005
                                                                                                                     // 2006
// Pick the first defined of two or three arguments.                                                                 // 2007
function defaults(a, b, c) {                                                                                         // 2008
    if (a != null) {                                                                                                 // 2009
        return a;                                                                                                    // 2010
    }                                                                                                                // 2011
    if (b != null) {                                                                                                 // 2012
        return b;                                                                                                    // 2013
    }                                                                                                                // 2014
    return c;                                                                                                        // 2015
}                                                                                                                    // 2016
                                                                                                                     // 2017
function currentDateArray(config) {                                                                                  // 2018
    // hooks is actually the exported moment object                                                                  // 2019
    var nowValue = new Date(hooks.now());                                                                            // 2020
    if (config._useUTC) {                                                                                            // 2021
        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];                           // 2022
    }                                                                                                                // 2023
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];                                        // 2024
}                                                                                                                    // 2025
                                                                                                                     // 2026
// convert an array to a date.                                                                                       // 2027
// the array should mirror the parameters below                                                                      // 2028
// note: all values past the year are optional and will default to the lowest possible value.                        // 2029
// [year, month, day , hour, minute, second, millisecond]                                                            // 2030
function configFromArray (config) {                                                                                  // 2031
    var i, date, input = [], currentDate, expectedWeekday, yearToUse;                                                // 2032
                                                                                                                     // 2033
    if (config._d) {                                                                                                 // 2034
        return;                                                                                                      // 2035
    }                                                                                                                // 2036
                                                                                                                     // 2037
    currentDate = currentDateArray(config);                                                                          // 2038
                                                                                                                     // 2039
    //compute day of the year from weeks and weekdays                                                                // 2040
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {                                          // 2041
        dayOfYearFromWeekInfo(config);                                                                               // 2042
    }                                                                                                                // 2043
                                                                                                                     // 2044
    //if the day of the year is set, figure out what it is                                                           // 2045
    if (config._dayOfYear != null) {                                                                                 // 2046
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);                                                    // 2047
                                                                                                                     // 2048
        if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {                                  // 2049
            getParsingFlags(config)._overflowDayOfYear = true;                                                       // 2050
        }                                                                                                            // 2051
                                                                                                                     // 2052
        date = createUTCDate(yearToUse, 0, config._dayOfYear);                                                       // 2053
        config._a[MONTH] = date.getUTCMonth();                                                                       // 2054
        config._a[DATE] = date.getUTCDate();                                                                         // 2055
    }                                                                                                                // 2056
                                                                                                                     // 2057
    // Default to current date.                                                                                      // 2058
    // * if no year, month, day of month are given, default to today                                                 // 2059
    // * if day of month is given, default month and year                                                            // 2060
    // * if month is given, default only year                                                                        // 2061
    // * if year is given, don't default anything                                                                    // 2062
    for (i = 0; i < 3 && config._a[i] == null; ++i) {                                                                // 2063
        config._a[i] = input[i] = currentDate[i];                                                                    // 2064
    }                                                                                                                // 2065
                                                                                                                     // 2066
    // Zero out whatever was not defaulted, including time                                                           // 2067
    for (; i < 7; i++) {                                                                                             // 2068
        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];                         // 2069
    }                                                                                                                // 2070
                                                                                                                     // 2071
    // Check for 24:00:00.000                                                                                        // 2072
    if (config._a[HOUR] === 24 &&                                                                                    // 2073
            config._a[MINUTE] === 0 &&                                                                               // 2074
            config._a[SECOND] === 0 &&                                                                               // 2075
            config._a[MILLISECOND] === 0) {                                                                          // 2076
        config._nextDay = true;                                                                                      // 2077
        config._a[HOUR] = 0;                                                                                         // 2078
    }                                                                                                                // 2079
                                                                                                                     // 2080
    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);                                    // 2081
    expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();                                   // 2082
                                                                                                                     // 2083
    // Apply timezone offset from input. The actual utcOffset can be changed                                         // 2084
    // with parseZone.                                                                                               // 2085
    if (config._tzm != null) {                                                                                       // 2086
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);                                            // 2087
    }                                                                                                                // 2088
                                                                                                                     // 2089
    if (config._nextDay) {                                                                                           // 2090
        config._a[HOUR] = 24;                                                                                        // 2091
    }                                                                                                                // 2092
                                                                                                                     // 2093
    // check for mismatching day of week                                                                             // 2094
    if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {                        // 2095
        getParsingFlags(config).weekdayMismatch = true;                                                              // 2096
    }                                                                                                                // 2097
}                                                                                                                    // 2098
                                                                                                                     // 2099
function dayOfYearFromWeekInfo(config) {                                                                             // 2100
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;                                                 // 2101
                                                                                                                     // 2102
    w = config._w;                                                                                                   // 2103
    if (w.GG != null || w.W != null || w.E != null) {                                                                // 2104
        dow = 1;                                                                                                     // 2105
        doy = 4;                                                                                                     // 2106
                                                                                                                     // 2107
        // TODO: We need to take the current isoWeekYear, but that depends on                                        // 2108
        // how we interpret now (local, utc, fixed offset). So create                                                // 2109
        // a now version of current config (take local/utc/offset flags, and                                         // 2110
        // create now).                                                                                              // 2111
        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);                            // 2112
        week = defaults(w.W, 1);                                                                                     // 2113
        weekday = defaults(w.E, 1);                                                                                  // 2114
        if (weekday < 1 || weekday > 7) {                                                                            // 2115
            weekdayOverflow = true;                                                                                  // 2116
        }                                                                                                            // 2117
    } else {                                                                                                         // 2118
        dow = config._locale._week.dow;                                                                              // 2119
        doy = config._locale._week.doy;                                                                              // 2120
                                                                                                                     // 2121
        var curWeek = weekOfYear(createLocal(), dow, doy);                                                           // 2122
                                                                                                                     // 2123
        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);                                                    // 2124
                                                                                                                     // 2125
        // Default to current week.                                                                                  // 2126
        week = defaults(w.w, curWeek.week);                                                                          // 2127
                                                                                                                     // 2128
        if (w.d != null) {                                                                                           // 2129
            // weekday -- low day numbers are considered next week                                                   // 2130
            weekday = w.d;                                                                                           // 2131
            if (weekday < 0 || weekday > 6) {                                                                        // 2132
                weekdayOverflow = true;                                                                              // 2133
            }                                                                                                        // 2134
        } else if (w.e != null) {                                                                                    // 2135
            // local weekday -- counting starts from begining of week                                                // 2136
            weekday = w.e + dow;                                                                                     // 2137
            if (w.e < 0 || w.e > 6) {                                                                                // 2138
                weekdayOverflow = true;                                                                              // 2139
            }                                                                                                        // 2140
        } else {                                                                                                     // 2141
            // default to begining of week                                                                           // 2142
            weekday = dow;                                                                                           // 2143
        }                                                                                                            // 2144
    }                                                                                                                // 2145
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {                                                        // 2146
        getParsingFlags(config)._overflowWeeks = true;                                                               // 2147
    } else if (weekdayOverflow != null) {                                                                            // 2148
        getParsingFlags(config)._overflowWeekday = true;                                                             // 2149
    } else {                                                                                                         // 2150
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);                                                // 2151
        config._a[YEAR] = temp.year;                                                                                 // 2152
        config._dayOfYear = temp.dayOfYear;                                                                          // 2153
    }                                                                                                                // 2154
}                                                                                                                    // 2155
                                                                                                                     // 2156
// iso 8601 regex                                                                                                    // 2157
// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)         // 2158
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
                                                                                                                     // 2161
var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;                                                                               // 2162
                                                                                                                     // 2163
var isoDates = [                                                                                                     // 2164
    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],                                                                         // 2165
    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],                                                                               // 2166
    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],                                                                              // 2167
    ['GGGG-[W]WW', /\d{4}-W\d\d/, false],                                                                            // 2168
    ['YYYY-DDD', /\d{4}-\d{3}/],                                                                                     // 2169
    ['YYYY-MM', /\d{4}-\d\d/, false],                                                                                // 2170
    ['YYYYYYMMDD', /[+-]\d{10}/],                                                                                    // 2171
    ['YYYYMMDD', /\d{8}/],                                                                                           // 2172
    // YYYYMM is NOT allowed by the standard                                                                         // 2173
    ['GGGG[W]WWE', /\d{4}W\d{3}/],                                                                                   // 2174
    ['GGGG[W]WW', /\d{4}W\d{2}/, false],                                                                             // 2175
    ['YYYYDDD', /\d{7}/]                                                                                             // 2176
];                                                                                                                   // 2177
                                                                                                                     // 2178
// iso time formats and regexes                                                                                      // 2179
var isoTimes = [                                                                                                     // 2180
    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],                                                                        // 2181
    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],                                                                         // 2182
    ['HH:mm:ss', /\d\d:\d\d:\d\d/],                                                                                  // 2183
    ['HH:mm', /\d\d:\d\d/],                                                                                          // 2184
    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],                                                                            // 2185
    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],                                                                             // 2186
    ['HHmmss', /\d\d\d\d\d\d/],                                                                                      // 2187
    ['HHmm', /\d\d\d\d/],                                                                                            // 2188
    ['HH', /\d\d/]                                                                                                   // 2189
];                                                                                                                   // 2190
                                                                                                                     // 2191
var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;                                                                         // 2192
                                                                                                                     // 2193
// date from iso format                                                                                              // 2194
function configFromISO(config) {                                                                                     // 2195
    var i, l,                                                                                                        // 2196
        string = config._i,                                                                                          // 2197
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),                                         // 2198
        allowTime, dateFormat, timeFormat, tzFormat;                                                                 // 2199
                                                                                                                     // 2200
    if (match) {                                                                                                     // 2201
        getParsingFlags(config).iso = true;                                                                          // 2202
                                                                                                                     // 2203
        for (i = 0, l = isoDates.length; i < l; i++) {                                                               // 2204
            if (isoDates[i][1].exec(match[1])) {                                                                     // 2205
                dateFormat = isoDates[i][0];                                                                         // 2206
                allowTime = isoDates[i][2] !== false;                                                                // 2207
                break;                                                                                               // 2208
            }                                                                                                        // 2209
        }                                                                                                            // 2210
        if (dateFormat == null) {                                                                                    // 2211
            config._isValid = false;                                                                                 // 2212
            return;                                                                                                  // 2213
        }                                                                                                            // 2214
        if (match[3]) {                                                                                              // 2215
            for (i = 0, l = isoTimes.length; i < l; i++) {                                                           // 2216
                if (isoTimes[i][1].exec(match[3])) {                                                                 // 2217
                    // match[2] should be 'T' or space                                                               // 2218
                    timeFormat = (match[2] || ' ') + isoTimes[i][0];                                                 // 2219
                    break;                                                                                           // 2220
                }                                                                                                    // 2221
            }                                                                                                        // 2222
            if (timeFormat == null) {                                                                                // 2223
                config._isValid = false;                                                                             // 2224
                return;                                                                                              // 2225
            }                                                                                                        // 2226
        }                                                                                                            // 2227
        if (!allowTime && timeFormat != null) {                                                                      // 2228
            config._isValid = false;                                                                                 // 2229
            return;                                                                                                  // 2230
        }                                                                                                            // 2231
        if (match[4]) {                                                                                              // 2232
            if (tzRegex.exec(match[4])) {                                                                            // 2233
                tzFormat = 'Z';                                                                                      // 2234
            } else {                                                                                                 // 2235
                config._isValid = false;                                                                             // 2236
                return;                                                                                              // 2237
            }                                                                                                        // 2238
        }                                                                                                            // 2239
        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');                                              // 2240
        configFromStringAndFormat(config);                                                                           // 2241
    } else {                                                                                                         // 2242
        config._isValid = false;                                                                                     // 2243
    }                                                                                                                // 2244
}                                                                                                                    // 2245
                                                                                                                     // 2246
// RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3                                   // 2247
var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;
                                                                                                                     // 2249
function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {                       // 2250
    var result = [                                                                                                   // 2251
        untruncateYear(yearStr),                                                                                     // 2252
        defaultLocaleMonthsShort.indexOf(monthStr),                                                                  // 2253
        parseInt(dayStr, 10),                                                                                        // 2254
        parseInt(hourStr, 10),                                                                                       // 2255
        parseInt(minuteStr, 10)                                                                                      // 2256
    ];                                                                                                               // 2257
                                                                                                                     // 2258
    if (secondStr) {                                                                                                 // 2259
        result.push(parseInt(secondStr, 10));                                                                        // 2260
    }                                                                                                                // 2261
                                                                                                                     // 2262
    return result;                                                                                                   // 2263
}                                                                                                                    // 2264
                                                                                                                     // 2265
function untruncateYear(yearStr) {                                                                                   // 2266
    var year = parseInt(yearStr, 10);                                                                                // 2267
    if (year <= 49) {                                                                                                // 2268
        return 2000 + year;                                                                                          // 2269
    } else if (year <= 999) {                                                                                        // 2270
        return 1900 + year;                                                                                          // 2271
    }                                                                                                                // 2272
    return year;                                                                                                     // 2273
}                                                                                                                    // 2274
                                                                                                                     // 2275
function preprocessRFC2822(s) {                                                                                      // 2276
    // Remove comments and folding whitespace and replace multiple-spaces with a single space                        // 2277
    return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').trim();                                      // 2278
}                                                                                                                    // 2279
                                                                                                                     // 2280
function checkWeekday(weekdayStr, parsedInput, config) {                                                             // 2281
    if (weekdayStr) {                                                                                                // 2282
        // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.                           // 2283
        var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),                                        // 2284
            weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();                       // 2285
        if (weekdayProvided !== weekdayActual) {                                                                     // 2286
            getParsingFlags(config).weekdayMismatch = true;                                                          // 2287
            config._isValid = false;                                                                                 // 2288
            return false;                                                                                            // 2289
        }                                                                                                            // 2290
    }                                                                                                                // 2291
    return true;                                                                                                     // 2292
}                                                                                                                    // 2293
                                                                                                                     // 2294
var obsOffsets = {                                                                                                   // 2295
    UT: 0,                                                                                                           // 2296
    GMT: 0,                                                                                                          // 2297
    EDT: -4 * 60,                                                                                                    // 2298
    EST: -5 * 60,                                                                                                    // 2299
    CDT: -5 * 60,                                                                                                    // 2300
    CST: -6 * 60,                                                                                                    // 2301
    MDT: -6 * 60,                                                                                                    // 2302
    MST: -7 * 60,                                                                                                    // 2303
    PDT: -7 * 60,                                                                                                    // 2304
    PST: -8 * 60                                                                                                     // 2305
};                                                                                                                   // 2306
                                                                                                                     // 2307
function calculateOffset(obsOffset, militaryOffset, numOffset) {                                                     // 2308
    if (obsOffset) {                                                                                                 // 2309
        return obsOffsets[obsOffset];                                                                                // 2310
    } else if (militaryOffset) {                                                                                     // 2311
        // the only allowed military tz is Z                                                                         // 2312
        return 0;                                                                                                    // 2313
    } else {                                                                                                         // 2314
        var hm = parseInt(numOffset, 10);                                                                            // 2315
        var m = hm % 100, h = (hm - m) / 100;                                                                        // 2316
        return h * 60 + m;                                                                                           // 2317
    }                                                                                                                // 2318
}                                                                                                                    // 2319
                                                                                                                     // 2320
// date and time from ref 2822 format                                                                                // 2321
function configFromRFC2822(config) {                                                                                 // 2322
    var match = rfc2822.exec(preprocessRFC2822(config._i));                                                          // 2323
    if (match) {                                                                                                     // 2324
        var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);     // 2325
        if (!checkWeekday(match[1], parsedArray, config)) {                                                          // 2326
            return;                                                                                                  // 2327
        }                                                                                                            // 2328
                                                                                                                     // 2329
        config._a = parsedArray;                                                                                     // 2330
        config._tzm = calculateOffset(match[8], match[9], match[10]);                                                // 2331
                                                                                                                     // 2332
        config._d = createUTCDate.apply(null, config._a);                                                            // 2333
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);                                            // 2334
                                                                                                                     // 2335
        getParsingFlags(config).rfc2822 = true;                                                                      // 2336
    } else {                                                                                                         // 2337
        config._isValid = false;                                                                                     // 2338
    }                                                                                                                // 2339
}                                                                                                                    // 2340
                                                                                                                     // 2341
// date from iso format or fallback                                                                                  // 2342
function configFromString(config) {                                                                                  // 2343
    var matched = aspNetJsonRegex.exec(config._i);                                                                   // 2344
                                                                                                                     // 2345
    if (matched !== null) {                                                                                          // 2346
        config._d = new Date(+matched[1]);                                                                           // 2347
        return;                                                                                                      // 2348
    }                                                                                                                // 2349
                                                                                                                     // 2350
    configFromISO(config);                                                                                           // 2351
    if (config._isValid === false) {                                                                                 // 2352
        delete config._isValid;                                                                                      // 2353
    } else {                                                                                                         // 2354
        return;                                                                                                      // 2355
    }                                                                                                                // 2356
                                                                                                                     // 2357
    configFromRFC2822(config);                                                                                       // 2358
    if (config._isValid === false) {                                                                                 // 2359
        delete config._isValid;                                                                                      // 2360
    } else {                                                                                                         // 2361
        return;                                                                                                      // 2362
    }                                                                                                                // 2363
                                                                                                                     // 2364
    // Final attempt, use Input Fallback                                                                             // 2365
    hooks.createFromInputFallback(config);                                                                           // 2366
}                                                                                                                    // 2367
                                                                                                                     // 2368
hooks.createFromInputFallback = deprecate(                                                                           // 2369
    'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +   // 2370
    'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +                    // 2371
    'discouraged and will be removed in an upcoming major release. Please refer to ' +                               // 2372
    'http://momentjs.com/guides/#/warnings/js-date/ for more info.',                                                 // 2373
    function (config) {                                                                                              // 2374
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));                                            // 2375
    }                                                                                                                // 2376
);                                                                                                                   // 2377
                                                                                                                     // 2378
// constant that refers to the ISO standard                                                                          // 2379
hooks.ISO_8601 = function () {};                                                                                     // 2380
                                                                                                                     // 2381
// constant that refers to the RFC 2822 form                                                                         // 2382
hooks.RFC_2822 = function () {};                                                                                     // 2383
                                                                                                                     // 2384
// date from string and format string                                                                                // 2385
function configFromStringAndFormat(config) {                                                                         // 2386
    // TODO: Move this to another part of the creation flow to prevent circular deps                                 // 2387
    if (config._f === hooks.ISO_8601) {                                                                              // 2388
        configFromISO(config);                                                                                       // 2389
        return;                                                                                                      // 2390
    }                                                                                                                // 2391
    if (config._f === hooks.RFC_2822) {                                                                              // 2392
        configFromRFC2822(config);                                                                                   // 2393
        return;                                                                                                      // 2394
    }                                                                                                                // 2395
    config._a = [];                                                                                                  // 2396
    getParsingFlags(config).empty = true;                                                                            // 2397
                                                                                                                     // 2398
    // This array is used to make a Date, either with `new Date` or `Date.UTC`                                       // 2399
    var string = '' + config._i,                                                                                     // 2400
        i, parsedInput, tokens, token, skipped,                                                                      // 2401
        stringLength = string.length,                                                                                // 2402
        totalParsedInputLength = 0;                                                                                  // 2403
                                                                                                                     // 2404
    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];                                  // 2405
                                                                                                                     // 2406
    for (i = 0; i < tokens.length; i++) {                                                                            // 2407
        token = tokens[i];                                                                                           // 2408
        parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];                                 // 2409
        // console.log('token', token, 'parsedInput', parsedInput,                                                   // 2410
        //         'regex', getParseRegexForToken(token, config));                                                   // 2411
        if (parsedInput) {                                                                                           // 2412
            skipped = string.substr(0, string.indexOf(parsedInput));                                                 // 2413
            if (skipped.length > 0) {                                                                                // 2414
                getParsingFlags(config).unusedInput.push(skipped);                                                   // 2415
            }                                                                                                        // 2416
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);                                 // 2417
            totalParsedInputLength += parsedInput.length;                                                            // 2418
        }                                                                                                            // 2419
        // don't parse if it's not a known token                                                                     // 2420
        if (formatTokenFunctions[token]) {                                                                           // 2421
            if (parsedInput) {                                                                                       // 2422
                getParsingFlags(config).empty = false;                                                               // 2423
            }                                                                                                        // 2424
            else {                                                                                                   // 2425
                getParsingFlags(config).unusedTokens.push(token);                                                    // 2426
            }                                                                                                        // 2427
            addTimeToArrayFromToken(token, parsedInput, config);                                                     // 2428
        }                                                                                                            // 2429
        else if (config._strict && !parsedInput) {                                                                   // 2430
            getParsingFlags(config).unusedTokens.push(token);                                                        // 2431
        }                                                                                                            // 2432
    }                                                                                                                // 2433
                                                                                                                     // 2434
    // add remaining unparsed input length to the string                                                             // 2435
    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;                                   // 2436
    if (string.length > 0) {                                                                                         // 2437
        getParsingFlags(config).unusedInput.push(string);                                                            // 2438
    }                                                                                                                // 2439
                                                                                                                     // 2440
    // clear _12h flag if hour is <= 12                                                                              // 2441
    if (config._a[HOUR] <= 12 &&                                                                                     // 2442
        getParsingFlags(config).bigHour === true &&                                                                  // 2443
        config._a[HOUR] > 0) {                                                                                       // 2444
        getParsingFlags(config).bigHour = undefined;                                                                 // 2445
    }                                                                                                                // 2446
                                                                                                                     // 2447
    getParsingFlags(config).parsedDateParts = config._a.slice(0);                                                    // 2448
    getParsingFlags(config).meridiem = config._meridiem;                                                             // 2449
    // handle meridiem                                                                                               // 2450
    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);                            // 2451
                                                                                                                     // 2452
    configFromArray(config);                                                                                         // 2453
    checkOverflow(config);                                                                                           // 2454
}                                                                                                                    // 2455
                                                                                                                     // 2456
                                                                                                                     // 2457
function meridiemFixWrap (locale, hour, meridiem) {                                                                  // 2458
    var isPm;                                                                                                        // 2459
                                                                                                                     // 2460
    if (meridiem == null) {                                                                                          // 2461
        // nothing to do                                                                                             // 2462
        return hour;                                                                                                 // 2463
    }                                                                                                                // 2464
    if (locale.meridiemHour != null) {                                                                               // 2465
        return locale.meridiemHour(hour, meridiem);                                                                  // 2466
    } else if (locale.isPM != null) {                                                                                // 2467
        // Fallback                                                                                                  // 2468
        isPm = locale.isPM(meridiem);                                                                                // 2469
        if (isPm && hour < 12) {                                                                                     // 2470
            hour += 12;                                                                                              // 2471
        }                                                                                                            // 2472
        if (!isPm && hour === 12) {                                                                                  // 2473
            hour = 0;                                                                                                // 2474
        }                                                                                                            // 2475
        return hour;                                                                                                 // 2476
    } else {                                                                                                         // 2477
        // this is not supposed to happen                                                                            // 2478
        return hour;                                                                                                 // 2479
    }                                                                                                                // 2480
}                                                                                                                    // 2481
                                                                                                                     // 2482
// date from string and array of format strings                                                                      // 2483
function configFromStringAndArray(config) {                                                                          // 2484
    var tempConfig,                                                                                                  // 2485
        bestMoment,                                                                                                  // 2486
                                                                                                                     // 2487
        scoreToBeat,                                                                                                 // 2488
        i,                                                                                                           // 2489
        currentScore;                                                                                                // 2490
                                                                                                                     // 2491
    if (config._f.length === 0) {                                                                                    // 2492
        getParsingFlags(config).invalidFormat = true;                                                                // 2493
        config._d = new Date(NaN);                                                                                   // 2494
        return;                                                                                                      // 2495
    }                                                                                                                // 2496
                                                                                                                     // 2497
    for (i = 0; i < config._f.length; i++) {                                                                         // 2498
        currentScore = 0;                                                                                            // 2499
        tempConfig = copyConfig({}, config);                                                                         // 2500
        if (config._useUTC != null) {                                                                                // 2501
            tempConfig._useUTC = config._useUTC;                                                                     // 2502
        }                                                                                                            // 2503
        tempConfig._f = config._f[i];                                                                                // 2504
        configFromStringAndFormat(tempConfig);                                                                       // 2505
                                                                                                                     // 2506
        if (!isValid(tempConfig)) {                                                                                  // 2507
            continue;                                                                                                // 2508
        }                                                                                                            // 2509
                                                                                                                     // 2510
        // if there is any input that was not parsed add a penalty for that format                                   // 2511
        currentScore += getParsingFlags(tempConfig).charsLeftOver;                                                   // 2512
                                                                                                                     // 2513
        //or tokens                                                                                                  // 2514
        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;                                        // 2515
                                                                                                                     // 2516
        getParsingFlags(tempConfig).score = currentScore;                                                            // 2517
                                                                                                                     // 2518
        if (scoreToBeat == null || currentScore < scoreToBeat) {                                                     // 2519
            scoreToBeat = currentScore;                                                                              // 2520
            bestMoment = tempConfig;                                                                                 // 2521
        }                                                                                                            // 2522
    }                                                                                                                // 2523
                                                                                                                     // 2524
    extend(config, bestMoment || tempConfig);                                                                        // 2525
}                                                                                                                    // 2526
                                                                                                                     // 2527
function configFromObject(config) {                                                                                  // 2528
    if (config._d) {                                                                                                 // 2529
        return;                                                                                                      // 2530
    }                                                                                                                // 2531
                                                                                                                     // 2532
    var i = normalizeObjectUnits(config._i);                                                                         // 2533
    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {  // 2534
        return obj && parseInt(obj, 10);                                                                             // 2535
    });                                                                                                              // 2536
                                                                                                                     // 2537
    configFromArray(config);                                                                                         // 2538
}                                                                                                                    // 2539
                                                                                                                     // 2540
function createFromConfig (config) {                                                                                 // 2541
    var res = new Moment(checkOverflow(prepareConfig(config)));                                                      // 2542
    if (res._nextDay) {                                                                                              // 2543
        // Adding is smart enough around DST                                                                         // 2544
        res.add(1, 'd');                                                                                             // 2545
        res._nextDay = undefined;                                                                                    // 2546
    }                                                                                                                // 2547
                                                                                                                     // 2548
    return res;                                                                                                      // 2549
}                                                                                                                    // 2550
                                                                                                                     // 2551
function prepareConfig (config) {                                                                                    // 2552
    var input = config._i,                                                                                           // 2553
        format = config._f;                                                                                          // 2554
                                                                                                                     // 2555
    config._locale = config._locale || getLocale(config._l);                                                         // 2556
                                                                                                                     // 2557
    if (input === null || (format === undefined && input === '')) {                                                  // 2558
        return createInvalid({nullInput: true});                                                                     // 2559
    }                                                                                                                // 2560
                                                                                                                     // 2561
    if (typeof input === 'string') {                                                                                 // 2562
        config._i = input = config._locale.preparse(input);                                                          // 2563
    }                                                                                                                // 2564
                                                                                                                     // 2565
    if (isMoment(input)) {                                                                                           // 2566
        return new Moment(checkOverflow(input));                                                                     // 2567
    } else if (isDate(input)) {                                                                                      // 2568
        config._d = input;                                                                                           // 2569
    } else if (isArray(format)) {                                                                                    // 2570
        configFromStringAndArray(config);                                                                            // 2571
    } else if (format) {                                                                                             // 2572
        configFromStringAndFormat(config);                                                                           // 2573
    }  else {                                                                                                        // 2574
        configFromInput(config);                                                                                     // 2575
    }                                                                                                                // 2576
                                                                                                                     // 2577
    if (!isValid(config)) {                                                                                          // 2578
        config._d = null;                                                                                            // 2579
    }                                                                                                                // 2580
                                                                                                                     // 2581
    return config;                                                                                                   // 2582
}                                                                                                                    // 2583
                                                                                                                     // 2584
function configFromInput(config) {                                                                                   // 2585
    var input = config._i;                                                                                           // 2586
    if (isUndefined(input)) {                                                                                        // 2587
        config._d = new Date(hooks.now());                                                                           // 2588
    } else if (isDate(input)) {                                                                                      // 2589
        config._d = new Date(input.valueOf());                                                                       // 2590
    } else if (typeof input === 'string') {                                                                          // 2591
        configFromString(config);                                                                                    // 2592
    } else if (isArray(input)) {                                                                                     // 2593
        config._a = map(input.slice(0), function (obj) {                                                             // 2594
            return parseInt(obj, 10);                                                                                // 2595
        });                                                                                                          // 2596
        configFromArray(config);                                                                                     // 2597
    } else if (isObject(input)) {                                                                                    // 2598
        configFromObject(config);                                                                                    // 2599
    } else if (isNumber(input)) {                                                                                    // 2600
        // from milliseconds                                                                                         // 2601
        config._d = new Date(input);                                                                                 // 2602
    } else {                                                                                                         // 2603
        hooks.createFromInputFallback(config);                                                                       // 2604
    }                                                                                                                // 2605
}                                                                                                                    // 2606
                                                                                                                     // 2607
function createLocalOrUTC (input, format, locale, strict, isUTC) {                                                   // 2608
    var c = {};                                                                                                      // 2609
                                                                                                                     // 2610
    if (locale === true || locale === false) {                                                                       // 2611
        strict = locale;                                                                                             // 2612
        locale = undefined;                                                                                          // 2613
    }                                                                                                                // 2614
                                                                                                                     // 2615
    if ((isObject(input) && isObjectEmpty(input)) ||                                                                 // 2616
            (isArray(input) && input.length === 0)) {                                                                // 2617
        input = undefined;                                                                                           // 2618
    }                                                                                                                // 2619
    // object construction must be done this way.                                                                    // 2620
    // https://github.com/moment/moment/issues/1423                                                                  // 2621
    c._isAMomentObject = true;                                                                                       // 2622
    c._useUTC = c._isUTC = isUTC;                                                                                    // 2623
    c._l = locale;                                                                                                   // 2624
    c._i = input;                                                                                                    // 2625
    c._f = format;                                                                                                   // 2626
    c._strict = strict;                                                                                              // 2627
                                                                                                                     // 2628
    return createFromConfig(c);                                                                                      // 2629
}                                                                                                                    // 2630
                                                                                                                     // 2631
function createLocal (input, format, locale, strict) {                                                               // 2632
    return createLocalOrUTC(input, format, locale, strict, false);                                                   // 2633
}                                                                                                                    // 2634
                                                                                                                     // 2635
var prototypeMin = deprecate(                                                                                        // 2636
    'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',            // 2637
    function () {                                                                                                    // 2638
        var other = createLocal.apply(null, arguments);                                                              // 2639
        if (this.isValid() && other.isValid()) {                                                                     // 2640
            return other < this ? this : other;                                                                      // 2641
        } else {                                                                                                     // 2642
            return createInvalid();                                                                                  // 2643
        }                                                                                                            // 2644
    }                                                                                                                // 2645
);                                                                                                                   // 2646
                                                                                                                     // 2647
var prototypeMax = deprecate(                                                                                        // 2648
    'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',            // 2649
    function () {                                                                                                    // 2650
        var other = createLocal.apply(null, arguments);                                                              // 2651
        if (this.isValid() && other.isValid()) {                                                                     // 2652
            return other > this ? this : other;                                                                      // 2653
        } else {                                                                                                     // 2654
            return createInvalid();                                                                                  // 2655
        }                                                                                                            // 2656
    }                                                                                                                // 2657
);                                                                                                                   // 2658
                                                                                                                     // 2659
// Pick a moment m from moments so that m[fn](other) is true for all                                                 // 2660
// other. This relies on the function fn to be transitive.                                                           // 2661
//                                                                                                                   // 2662
// moments should either be an array of moment objects or an array, whose                                            // 2663
// first element is an array of moment objects.                                                                      // 2664
function pickBy(fn, moments) {                                                                                       // 2665
    var res, i;                                                                                                      // 2666
    if (moments.length === 1 && isArray(moments[0])) {                                                               // 2667
        moments = moments[0];                                                                                        // 2668
    }                                                                                                                // 2669
    if (!moments.length) {                                                                                           // 2670
        return createLocal();                                                                                        // 2671
    }                                                                                                                // 2672
    res = moments[0];                                                                                                // 2673
    for (i = 1; i < moments.length; ++i) {                                                                           // 2674
        if (!moments[i].isValid() || moments[i][fn](res)) {                                                          // 2675
            res = moments[i];                                                                                        // 2676
        }                                                                                                            // 2677
    }                                                                                                                // 2678
    return res;                                                                                                      // 2679
}                                                                                                                    // 2680
                                                                                                                     // 2681
// TODO: Use [].sort instead?                                                                                        // 2682
function min () {                                                                                                    // 2683
    var args = [].slice.call(arguments, 0);                                                                          // 2684
                                                                                                                     // 2685
    return pickBy('isBefore', args);                                                                                 // 2686
}                                                                                                                    // 2687
                                                                                                                     // 2688
function max () {                                                                                                    // 2689
    var args = [].slice.call(arguments, 0);                                                                          // 2690
                                                                                                                     // 2691
    return pickBy('isAfter', args);                                                                                  // 2692
}                                                                                                                    // 2693
                                                                                                                     // 2694
var now = function () {                                                                                              // 2695
    return Date.now ? Date.now() : +(new Date());                                                                    // 2696
};                                                                                                                   // 2697
                                                                                                                     // 2698
var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];               // 2699
                                                                                                                     // 2700
function isDurationValid(m) {                                                                                        // 2701
    for (var key in m) {                                                                                             // 2702
        if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {                           // 2703
            return false;                                                                                            // 2704
        }                                                                                                            // 2705
    }                                                                                                                // 2706
                                                                                                                     // 2707
    var unitHasDecimal = false;                                                                                      // 2708
    for (var i = 0; i < ordering.length; ++i) {                                                                      // 2709
        if (m[ordering[i]]) {                                                                                        // 2710
            if (unitHasDecimal) {                                                                                    // 2711
                return false; // only allow non-integers for smallest unit                                           // 2712
            }                                                                                                        // 2713
            if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {                                              // 2714
                unitHasDecimal = true;                                                                               // 2715
            }                                                                                                        // 2716
        }                                                                                                            // 2717
    }                                                                                                                // 2718
                                                                                                                     // 2719
    return true;                                                                                                     // 2720
}                                                                                                                    // 2721
                                                                                                                     // 2722
function isValid$1() {                                                                                               // 2723
    return this._isValid;                                                                                            // 2724
}                                                                                                                    // 2725
                                                                                                                     // 2726
function createInvalid$1() {                                                                                         // 2727
    return createDuration(NaN);                                                                                      // 2728
}                                                                                                                    // 2729
                                                                                                                     // 2730
function Duration (duration) {                                                                                       // 2731
    var normalizedInput = normalizeObjectUnits(duration),                                                            // 2732
        years = normalizedInput.year || 0,                                                                           // 2733
        quarters = normalizedInput.quarter || 0,                                                                     // 2734
        months = normalizedInput.month || 0,                                                                         // 2735
        weeks = normalizedInput.week || 0,                                                                           // 2736
        days = normalizedInput.day || 0,                                                                             // 2737
        hours = normalizedInput.hour || 0,                                                                           // 2738
        minutes = normalizedInput.minute || 0,                                                                       // 2739
        seconds = normalizedInput.second || 0,                                                                       // 2740
        milliseconds = normalizedInput.millisecond || 0;                                                             // 2741
                                                                                                                     // 2742
    this._isValid = isDurationValid(normalizedInput);                                                                // 2743
                                                                                                                     // 2744
    // representation for dateAddRemove                                                                              // 2745
    this._milliseconds = +milliseconds +                                                                             // 2746
        seconds * 1e3 + // 1000                                                                                      // 2747
        minutes * 6e4 + // 1000 * 60                                                                                 // 2748
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a                                                  // 2750
    // day when working around DST, we need to store them separately                                                 // 2751
    this._days = +days +                                                                                             // 2752
        weeks * 7;                                                                                                   // 2753
    // It is impossible to translate months into days without knowing                                                // 2754
    // which months you are are talking about, so we have to store                                                   // 2755
    // it separately.                                                                                                // 2756
    this._months = +months +                                                                                         // 2757
        quarters * 3 +                                                                                               // 2758
        years * 12;                                                                                                  // 2759
                                                                                                                     // 2760
    this._data = {};                                                                                                 // 2761
                                                                                                                     // 2762
    this._locale = getLocale();                                                                                      // 2763
                                                                                                                     // 2764
    this._bubble();                                                                                                  // 2765
}                                                                                                                    // 2766
                                                                                                                     // 2767
function isDuration (obj) {                                                                                          // 2768
    return obj instanceof Duration;                                                                                  // 2769
}                                                                                                                    // 2770
                                                                                                                     // 2771
function absRound (number) {                                                                                         // 2772
    if (number < 0) {                                                                                                // 2773
        return Math.round(-1 * number) * -1;                                                                         // 2774
    } else {                                                                                                         // 2775
        return Math.round(number);                                                                                   // 2776
    }                                                                                                                // 2777
}                                                                                                                    // 2778
                                                                                                                     // 2779
// FORMATTING                                                                                                        // 2780
                                                                                                                     // 2781
function offset (token, separator) {                                                                                 // 2782
    addFormatToken(token, 0, 0, function () {                                                                        // 2783
        var offset = this.utcOffset();                                                                               // 2784
        var sign = '+';                                                                                              // 2785
        if (offset < 0) {                                                                                            // 2786
            offset = -offset;                                                                                        // 2787
            sign = '-';                                                                                              // 2788
        }                                                                                                            // 2789
        return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);                       // 2790
    });                                                                                                              // 2791
}                                                                                                                    // 2792
                                                                                                                     // 2793
offset('Z', ':');                                                                                                    // 2794
offset('ZZ', '');                                                                                                    // 2795
                                                                                                                     // 2796
// PARSING                                                                                                           // 2797
                                                                                                                     // 2798
addRegexToken('Z',  matchShortOffset);                                                                               // 2799
addRegexToken('ZZ', matchShortOffset);                                                                               // 2800
addParseToken(['Z', 'ZZ'], function (input, array, config) {                                                         // 2801
    config._useUTC = true;                                                                                           // 2802
    config._tzm = offsetFromString(matchShortOffset, input);                                                         // 2803
});                                                                                                                  // 2804
                                                                                                                     // 2805
// HELPERS                                                                                                           // 2806
                                                                                                                     // 2807
// timezone chunker                                                                                                  // 2808
// '+10:00' > ['10',  '00']                                                                                          // 2809
// '-1530'  > ['-15', '30']                                                                                          // 2810
var chunkOffset = /([\+\-]|\d\d)/gi;                                                                                 // 2811
                                                                                                                     // 2812
function offsetFromString(matcher, string) {                                                                         // 2813
    var matches = (string || '').match(matcher);                                                                     // 2814
                                                                                                                     // 2815
    if (matches === null) {                                                                                          // 2816
        return null;                                                                                                 // 2817
    }                                                                                                                // 2818
                                                                                                                     // 2819
    var chunk   = matches[matches.length - 1] || [];                                                                 // 2820
    var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];                                                    // 2821
    var minutes = +(parts[1] * 60) + toInt(parts[2]);                                                                // 2822
                                                                                                                     // 2823
    return minutes === 0 ?                                                                                           // 2824
      0 :                                                                                                            // 2825
      parts[0] === '+' ? minutes : -minutes;                                                                         // 2826
}                                                                                                                    // 2827
                                                                                                                     // 2828
// Return a moment from input, that is local/utc/zone equivalent to model.                                           // 2829
function cloneWithOffset(input, model) {                                                                             // 2830
    var res, diff;                                                                                                   // 2831
    if (model._isUTC) {                                                                                              // 2832
        res = model.clone();                                                                                         // 2833
        diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();  // 2834
        // Use low-level api, because this fn is low-level api.                                                      // 2835
        res._d.setTime(res._d.valueOf() + diff);                                                                     // 2836
        hooks.updateOffset(res, false);                                                                              // 2837
        return res;                                                                                                  // 2838
    } else {                                                                                                         // 2839
        return createLocal(input).local();                                                                           // 2840
    }                                                                                                                // 2841
}                                                                                                                    // 2842
                                                                                                                     // 2843
function getDateOffset (m) {                                                                                         // 2844
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.                                                // 2845
    // https://github.com/moment/moment/pull/1871                                                                    // 2846
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;                                                          // 2847
}                                                                                                                    // 2848
                                                                                                                     // 2849
// HOOKS                                                                                                             // 2850
                                                                                                                     // 2851
// This function will be called whenever a moment is mutated.                                                        // 2852
// It is intended to keep the offset in sync with the timezone.                                                      // 2853
hooks.updateOffset = function () {};                                                                                 // 2854
                                                                                                                     // 2855
// MOMENTS                                                                                                           // 2856
                                                                                                                     // 2857
// keepLocalTime = true means only change the timezone, without                                                      // 2858
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->                                              // 2859
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset                                               // 2860
// +0200, so we adjust the time as needed, to be valid.                                                              // 2861
//                                                                                                                   // 2862
// Keeping the time actually adds/subtracts (one hour)                                                               // 2863
// from the actual represented time. That is why we call updateOffset                                                // 2864
// a second time. In case it wants us to change the offset again                                                     // 2865
// _changeInProgress == true case, then we have to adjust, because                                                   // 2866
// there is no such time in the given timezone.                                                                      // 2867
function getSetOffset (input, keepLocalTime, keepMinutes) {                                                          // 2868
    var offset = this._offset || 0,                                                                                  // 2869
        localAdjust;                                                                                                 // 2870
    if (!this.isValid()) {                                                                                           // 2871
        return input != null ? this : NaN;                                                                           // 2872
    }                                                                                                                // 2873
    if (input != null) {                                                                                             // 2874
        if (typeof input === 'string') {                                                                             // 2875
            input = offsetFromString(matchShortOffset, input);                                                       // 2876
            if (input === null) {                                                                                    // 2877
                return this;                                                                                         // 2878
            }                                                                                                        // 2879
        } else if (Math.abs(input) < 16 && !keepMinutes) {                                                           // 2880
            input = input * 60;                                                                                      // 2881
        }                                                                                                            // 2882
        if (!this._isUTC && keepLocalTime) {                                                                         // 2883
            localAdjust = getDateOffset(this);                                                                       // 2884
        }                                                                                                            // 2885
        this._offset = input;                                                                                        // 2886
        this._isUTC = true;                                                                                          // 2887
        if (localAdjust != null) {                                                                                   // 2888
            this.add(localAdjust, 'm');                                                                              // 2889
        }                                                                                                            // 2890
        if (offset !== input) {                                                                                      // 2891
            if (!keepLocalTime || this._changeInProgress) {                                                          // 2892
                addSubtract(this, createDuration(input - offset, 'm'), 1, false);                                    // 2893
            } else if (!this._changeInProgress) {                                                                    // 2894
                this._changeInProgress = true;                                                                       // 2895
                hooks.updateOffset(this, true);                                                                      // 2896
                this._changeInProgress = null;                                                                       // 2897
            }                                                                                                        // 2898
        }                                                                                                            // 2899
        return this;                                                                                                 // 2900
    } else {                                                                                                         // 2901
        return this._isUTC ? offset : getDateOffset(this);                                                           // 2902
    }                                                                                                                // 2903
}                                                                                                                    // 2904
                                                                                                                     // 2905
function getSetZone (input, keepLocalTime) {                                                                         // 2906
    if (input != null) {                                                                                             // 2907
        if (typeof input !== 'string') {                                                                             // 2908
            input = -input;                                                                                          // 2909
        }                                                                                                            // 2910
                                                                                                                     // 2911
        this.utcOffset(input, keepLocalTime);                                                                        // 2912
                                                                                                                     // 2913
        return this;                                                                                                 // 2914
    } else {                                                                                                         // 2915
        return -this.utcOffset();                                                                                    // 2916
    }                                                                                                                // 2917
}                                                                                                                    // 2918
                                                                                                                     // 2919
function setOffsetToUTC (keepLocalTime) {                                                                            // 2920
    return this.utcOffset(0, keepLocalTime);                                                                         // 2921
}                                                                                                                    // 2922
                                                                                                                     // 2923
function setOffsetToLocal (keepLocalTime) {                                                                          // 2924
    if (this._isUTC) {                                                                                               // 2925
        this.utcOffset(0, keepLocalTime);                                                                            // 2926
        this._isUTC = false;                                                                                         // 2927
                                                                                                                     // 2928
        if (keepLocalTime) {                                                                                         // 2929
            this.subtract(getDateOffset(this), 'm');                                                                 // 2930
        }                                                                                                            // 2931
    }                                                                                                                // 2932
    return this;                                                                                                     // 2933
}                                                                                                                    // 2934
                                                                                                                     // 2935
function setOffsetToParsedOffset () {                                                                                // 2936
    if (this._tzm != null) {                                                                                         // 2937
        this.utcOffset(this._tzm, false, true);                                                                      // 2938
    } else if (typeof this._i === 'string') {                                                                        // 2939
        var tZone = offsetFromString(matchOffset, this._i);                                                          // 2940
        if (tZone != null) {                                                                                         // 2941
            this.utcOffset(tZone);                                                                                   // 2942
        }                                                                                                            // 2943
        else {                                                                                                       // 2944
            this.utcOffset(0, true);                                                                                 // 2945
        }                                                                                                            // 2946
    }                                                                                                                // 2947
    return this;                                                                                                     // 2948
}                                                                                                                    // 2949
                                                                                                                     // 2950
function hasAlignedHourOffset (input) {                                                                              // 2951
    if (!this.isValid()) {                                                                                           // 2952
        return false;                                                                                                // 2953
    }                                                                                                                // 2954
    input = input ? createLocal(input).utcOffset() : 0;                                                              // 2955
                                                                                                                     // 2956
    return (this.utcOffset() - input) % 60 === 0;                                                                    // 2957
}                                                                                                                    // 2958
                                                                                                                     // 2959
function isDaylightSavingTime () {                                                                                   // 2960
    return (                                                                                                         // 2961
        this.utcOffset() > this.clone().month(0).utcOffset() ||                                                      // 2962
        this.utcOffset() > this.clone().month(5).utcOffset()                                                         // 2963
    );                                                                                                               // 2964
}                                                                                                                    // 2965
                                                                                                                     // 2966
function isDaylightSavingTimeShifted () {                                                                            // 2967
    if (!isUndefined(this._isDSTShifted)) {                                                                          // 2968
        return this._isDSTShifted;                                                                                   // 2969
    }                                                                                                                // 2970
                                                                                                                     // 2971
    var c = {};                                                                                                      // 2972
                                                                                                                     // 2973
    copyConfig(c, this);                                                                                             // 2974
    c = prepareConfig(c);                                                                                            // 2975
                                                                                                                     // 2976
    if (c._a) {                                                                                                      // 2977
        var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);                                                  // 2978
        this._isDSTShifted = this.isValid() &&                                                                       // 2979
            compareArrays(c._a, other.toArray()) > 0;                                                                // 2980
    } else {                                                                                                         // 2981
        this._isDSTShifted = false;                                                                                  // 2982
    }                                                                                                                // 2983
                                                                                                                     // 2984
    return this._isDSTShifted;                                                                                       // 2985
}                                                                                                                    // 2986
                                                                                                                     // 2987
function isLocal () {                                                                                                // 2988
    return this.isValid() ? !this._isUTC : false;                                                                    // 2989
}                                                                                                                    // 2990
                                                                                                                     // 2991
function isUtcOffset () {                                                                                            // 2992
    return this.isValid() ? this._isUTC : false;                                                                     // 2993
}                                                                                                                    // 2994
                                                                                                                     // 2995
function isUtc () {                                                                                                  // 2996
    return this.isValid() ? this._isUTC && this._offset === 0 : false;                                               // 2997
}                                                                                                                    // 2998
                                                                                                                     // 2999
// ASP.NET json date format regex                                                                                    // 3000
var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;                                        // 3001
                                                                                                                     // 3002
// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html                         // 3003
// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere                                         // 3004
// and further modified to allow for strings containing both week and day                                            // 3005
var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
                                                                                                                     // 3007
function createDuration (input, key) {                                                                               // 3008
    var duration = input,                                                                                            // 3009
        // matching against regexp is expensive, do it on demand                                                     // 3010
        match = null,                                                                                                // 3011
        sign,                                                                                                        // 3012
        ret,                                                                                                         // 3013
        diffRes;                                                                                                     // 3014
                                                                                                                     // 3015
    if (isDuration(input)) {                                                                                         // 3016
        duration = {                                                                                                 // 3017
            ms : input._milliseconds,                                                                                // 3018
            d  : input._days,                                                                                        // 3019
            M  : input._months                                                                                       // 3020
        };                                                                                                           // 3021
    } else if (isNumber(input)) {                                                                                    // 3022
        duration = {};                                                                                               // 3023
        if (key) {                                                                                                   // 3024
            duration[key] = input;                                                                                   // 3025
        } else {                                                                                                     // 3026
            duration.milliseconds = input;                                                                           // 3027
        }                                                                                                            // 3028
    } else if (!!(match = aspNetRegex.exec(input))) {                                                                // 3029
        sign = (match[1] === '-') ? -1 : 1;                                                                          // 3030
        duration = {                                                                                                 // 3031
            y  : 0,                                                                                                  // 3032
            d  : toInt(match[DATE])                         * sign,                                                  // 3033
            h  : toInt(match[HOUR])                         * sign,                                                  // 3034
            m  : toInt(match[MINUTE])                       * sign,                                                  // 3035
            s  : toInt(match[SECOND])                       * sign,                                                  // 3036
            ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
        };                                                                                                           // 3038
    } else if (!!(match = isoRegex.exec(input))) {                                                                   // 3039
        sign = (match[1] === '-') ? -1 : (match[1] === '+') ? 1 : 1;                                                 // 3040
        duration = {                                                                                                 // 3041
            y : parseIso(match[2], sign),                                                                            // 3042
            M : parseIso(match[3], sign),                                                                            // 3043
            w : parseIso(match[4], sign),                                                                            // 3044
            d : parseIso(match[5], sign),                                                                            // 3045
            h : parseIso(match[6], sign),                                                                            // 3046
            m : parseIso(match[7], sign),                                                                            // 3047
            s : parseIso(match[8], sign)                                                                             // 3048
        };                                                                                                           // 3049
    } else if (duration == null) {// checks for null or undefined                                                    // 3050
        duration = {};                                                                                               // 3051
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {                           // 3052
        diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));                           // 3053
                                                                                                                     // 3054
        duration = {};                                                                                               // 3055
        duration.ms = diffRes.milliseconds;                                                                          // 3056
        duration.M = diffRes.months;                                                                                 // 3057
    }                                                                                                                // 3058
                                                                                                                     // 3059
    ret = new Duration(duration);                                                                                    // 3060
                                                                                                                     // 3061
    if (isDuration(input) && hasOwnProp(input, '_locale')) {                                                         // 3062
        ret._locale = input._locale;                                                                                 // 3063
    }                                                                                                                // 3064
                                                                                                                     // 3065
    return ret;                                                                                                      // 3066
}                                                                                                                    // 3067
                                                                                                                     // 3068
createDuration.fn = Duration.prototype;                                                                              // 3069
createDuration.invalid = createInvalid$1;                                                                            // 3070
                                                                                                                     // 3071
function parseIso (inp, sign) {                                                                                      // 3072
    // We'd normally use ~~inp for this, but unfortunately it also                                                   // 3073
    // converts floats to ints.                                                                                      // 3074
    // inp may be undefined, so careful calling replace on it.                                                       // 3075
    var res = inp && parseFloat(inp.replace(',', '.'));                                                              // 3076
    // apply sign while we're at it                                                                                  // 3077
    return (isNaN(res) ? 0 : res) * sign;                                                                            // 3078
}                                                                                                                    // 3079
                                                                                                                     // 3080
function positiveMomentsDifference(base, other) {                                                                    // 3081
    var res = {milliseconds: 0, months: 0};                                                                          // 3082
                                                                                                                     // 3083
    res.months = other.month() - base.month() +                                                                      // 3084
        (other.year() - base.year()) * 12;                                                                           // 3085
    if (base.clone().add(res.months, 'M').isAfter(other)) {                                                          // 3086
        --res.months;                                                                                                // 3087
    }                                                                                                                // 3088
                                                                                                                     // 3089
    res.milliseconds = +other - +(base.clone().add(res.months, 'M'));                                                // 3090
                                                                                                                     // 3091
    return res;                                                                                                      // 3092
}                                                                                                                    // 3093
                                                                                                                     // 3094
function momentsDifference(base, other) {                                                                            // 3095
    var res;                                                                                                         // 3096
    if (!(base.isValid() && other.isValid())) {                                                                      // 3097
        return {milliseconds: 0, months: 0};                                                                         // 3098
    }                                                                                                                // 3099
                                                                                                                     // 3100
    other = cloneWithOffset(other, base);                                                                            // 3101
    if (base.isBefore(other)) {                                                                                      // 3102
        res = positiveMomentsDifference(base, other);                                                                // 3103
    } else {                                                                                                         // 3104
        res = positiveMomentsDifference(other, base);                                                                // 3105
        res.milliseconds = -res.milliseconds;                                                                        // 3106
        res.months = -res.months;                                                                                    // 3107
    }                                                                                                                // 3108
                                                                                                                     // 3109
    return res;                                                                                                      // 3110
}                                                                                                                    // 3111
                                                                                                                     // 3112
// TODO: remove 'name' arg after deprecation is removed                                                              // 3113
function createAdder(direction, name) {                                                                              // 3114
    return function (val, period) {                                                                                  // 3115
        var dur, tmp;                                                                                                // 3116
        //invert the arguments, but complain about it                                                                // 3117
        if (period !== null && !isNaN(+period)) {                                                                    // 3118
            deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');                         // 3120
            tmp = val; val = period; period = tmp;                                                                   // 3121
        }                                                                                                            // 3122
                                                                                                                     // 3123
        val = typeof val === 'string' ? +val : val;                                                                  // 3124
        dur = createDuration(val, period);                                                                           // 3125
        addSubtract(this, dur, direction);                                                                           // 3126
        return this;                                                                                                 // 3127
    };                                                                                                               // 3128
}                                                                                                                    // 3129
                                                                                                                     // 3130
function addSubtract (mom, duration, isAdding, updateOffset) {                                                       // 3131
    var milliseconds = duration._milliseconds,                                                                       // 3132
        days = absRound(duration._days),                                                                             // 3133
        months = absRound(duration._months);                                                                         // 3134
                                                                                                                     // 3135
    if (!mom.isValid()) {                                                                                            // 3136
        // No op                                                                                                     // 3137
        return;                                                                                                      // 3138
    }                                                                                                                // 3139
                                                                                                                     // 3140
    updateOffset = updateOffset == null ? true : updateOffset;                                                       // 3141
                                                                                                                     // 3142
    if (months) {                                                                                                    // 3143
        setMonth(mom, get(mom, 'Month') + months * isAdding);                                                        // 3144
    }                                                                                                                // 3145
    if (days) {                                                                                                      // 3146
        set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);                                                      // 3147
    }                                                                                                                // 3148
    if (milliseconds) {                                                                                              // 3149
        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);                                                  // 3150
    }                                                                                                                // 3151
    if (updateOffset) {                                                                                              // 3152
        hooks.updateOffset(mom, days || months);                                                                     // 3153
    }                                                                                                                // 3154
}                                                                                                                    // 3155
                                                                                                                     // 3156
var add      = createAdder(1, 'add');                                                                                // 3157
var subtract = createAdder(-1, 'subtract');                                                                          // 3158
                                                                                                                     // 3159
function getCalendarFormat(myMoment, now) {                                                                          // 3160
    var diff = myMoment.diff(now, 'days', true);                                                                     // 3161
    return diff < -6 ? 'sameElse' :                                                                                  // 3162
            diff < -1 ? 'lastWeek' :                                                                                 // 3163
            diff < 0 ? 'lastDay' :                                                                                   // 3164
            diff < 1 ? 'sameDay' :                                                                                   // 3165
            diff < 2 ? 'nextDay' :                                                                                   // 3166
            diff < 7 ? 'nextWeek' : 'sameElse';                                                                      // 3167
}                                                                                                                    // 3168
                                                                                                                     // 3169
function calendar$1 (time, formats) {                                                                                // 3170
    // We want to compare the start of today, vs this.                                                               // 3171
    // Getting start-of-today depends on whether we're local/utc/offset or not.                                      // 3172
    var now = time || createLocal(),                                                                                 // 3173
        sod = cloneWithOffset(now, this).startOf('day'),                                                             // 3174
        format = hooks.calendarFormat(this, sod) || 'sameElse';                                                      // 3175
                                                                                                                     // 3176
    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);       // 3177
                                                                                                                     // 3178
    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));                        // 3179
}                                                                                                                    // 3180
                                                                                                                     // 3181
function clone () {                                                                                                  // 3182
    return new Moment(this);                                                                                         // 3183
}                                                                                                                    // 3184
                                                                                                                     // 3185
function isAfter (input, units) {                                                                                    // 3186
    var localInput = isMoment(input) ? input : createLocal(input);                                                   // 3187
    if (!(this.isValid() && localInput.isValid())) {                                                                 // 3188
        return false;                                                                                                // 3189
    }                                                                                                                // 3190
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');                                             // 3191
    if (units === 'millisecond') {                                                                                   // 3192
        return this.valueOf() > localInput.valueOf();                                                                // 3193
    } else {                                                                                                         // 3194
        return localInput.valueOf() < this.clone().startOf(units).valueOf();                                         // 3195
    }                                                                                                                // 3196
}                                                                                                                    // 3197
                                                                                                                     // 3198
function isBefore (input, units) {                                                                                   // 3199
    var localInput = isMoment(input) ? input : createLocal(input);                                                   // 3200
    if (!(this.isValid() && localInput.isValid())) {                                                                 // 3201
        return false;                                                                                                // 3202
    }                                                                                                                // 3203
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');                                             // 3204
    if (units === 'millisecond') {                                                                                   // 3205
        return this.valueOf() < localInput.valueOf();                                                                // 3206
    } else {                                                                                                         // 3207
        return this.clone().endOf(units).valueOf() < localInput.valueOf();                                           // 3208
    }                                                                                                                // 3209
}                                                                                                                    // 3210
                                                                                                                     // 3211
function isBetween (from, to, units, inclusivity) {                                                                  // 3212
    inclusivity = inclusivity || '()';                                                                               // 3213
    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&                     // 3214
        (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));                              // 3215
}                                                                                                                    // 3216
                                                                                                                     // 3217
function isSame (input, units) {                                                                                     // 3218
    var localInput = isMoment(input) ? input : createLocal(input),                                                   // 3219
        inputMs;                                                                                                     // 3220
    if (!(this.isValid() && localInput.isValid())) {                                                                 // 3221
        return false;                                                                                                // 3222
    }                                                                                                                // 3223
    units = normalizeUnits(units || 'millisecond');                                                                  // 3224
    if (units === 'millisecond') {                                                                                   // 3225
        return this.valueOf() === localInput.valueOf();                                                              // 3226
    } else {                                                                                                         // 3227
        inputMs = localInput.valueOf();                                                                              // 3228
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();   // 3229
    }                                                                                                                // 3230
}                                                                                                                    // 3231
                                                                                                                     // 3232
function isSameOrAfter (input, units) {                                                                              // 3233
    return this.isSame(input, units) || this.isAfter(input,units);                                                   // 3234
}                                                                                                                    // 3235
                                                                                                                     // 3236
function isSameOrBefore (input, units) {                                                                             // 3237
    return this.isSame(input, units) || this.isBefore(input,units);                                                  // 3238
}                                                                                                                    // 3239
                                                                                                                     // 3240
function diff (input, units, asFloat) {                                                                              // 3241
    var that,                                                                                                        // 3242
        zoneDelta,                                                                                                   // 3243
        delta, output;                                                                                               // 3244
                                                                                                                     // 3245
    if (!this.isValid()) {                                                                                           // 3246
        return NaN;                                                                                                  // 3247
    }                                                                                                                // 3248
                                                                                                                     // 3249
    that = cloneWithOffset(input, this);                                                                             // 3250
                                                                                                                     // 3251
    if (!that.isValid()) {                                                                                           // 3252
        return NaN;                                                                                                  // 3253
    }                                                                                                                // 3254
                                                                                                                     // 3255
    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;                                                         // 3256
                                                                                                                     // 3257
    units = normalizeUnits(units);                                                                                   // 3258
                                                                                                                     // 3259
    switch (units) {                                                                                                 // 3260
        case 'year': output = monthDiff(this, that) / 12; break;                                                     // 3261
        case 'month': output = monthDiff(this, that); break;                                                         // 3262
        case 'quarter': output = monthDiff(this, that) / 3; break;                                                   // 3263
        case 'second': output = (this - that) / 1e3; break; // 1000                                                  // 3264
        case 'minute': output = (this - that) / 6e4; break; // 1000 * 60                                             // 3265
        case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60                                         // 3266
        case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst            // 3267
        case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst      // 3268
        default: output = this - that;                                                                               // 3269
    }                                                                                                                // 3270
                                                                                                                     // 3271
    return asFloat ? output : absFloor(output);                                                                      // 3272
}                                                                                                                    // 3273
                                                                                                                     // 3274
function monthDiff (a, b) {                                                                                          // 3275
    // difference in months                                                                                          // 3276
    var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),                                     // 3277
        // b is in (anchor - 1 month, anchor + 1 month)                                                              // 3278
        anchor = a.clone().add(wholeMonthDiff, 'months'),                                                            // 3279
        anchor2, adjust;                                                                                             // 3280
                                                                                                                     // 3281
    if (b - anchor < 0) {                                                                                            // 3282
        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');                                                       // 3283
        // linear across the month                                                                                   // 3284
        adjust = (b - anchor) / (anchor - anchor2);                                                                  // 3285
    } else {                                                                                                         // 3286
        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');                                                       // 3287
        // linear across the month                                                                                   // 3288
        adjust = (b - anchor) / (anchor2 - anchor);                                                                  // 3289
    }                                                                                                                // 3290
                                                                                                                     // 3291
    //check for negative zero, return zero if negative zero                                                          // 3292
    return -(wholeMonthDiff + adjust) || 0;                                                                          // 3293
}                                                                                                                    // 3294
                                                                                                                     // 3295
hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';                                                                        // 3296
hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';                                                                   // 3297
                                                                                                                     // 3298
function toString () {                                                                                               // 3299
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');                                     // 3300
}                                                                                                                    // 3301
                                                                                                                     // 3302
function toISOString(keepOffset) {                                                                                   // 3303
    if (!this.isValid()) {                                                                                           // 3304
        return null;                                                                                                 // 3305
    }                                                                                                                // 3306
    var utc = keepOffset !== true;                                                                                   // 3307
    var m = utc ? this.clone().utc() : this;                                                                         // 3308
    if (m.year() < 0 || m.year() > 9999) {                                                                           // 3309
        return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');             // 3310
    }                                                                                                                // 3311
    if (isFunction(Date.prototype.toISOString)) {                                                                    // 3312
        // native implementation is ~50x faster, use it when we can                                                  // 3313
        if (utc) {                                                                                                   // 3314
            return this.toDate().toISOString();                                                                      // 3315
        } else {                                                                                                     // 3316
            return new Date(this._d.valueOf()).toISOString().replace('Z', formatMoment(m, 'Z'));                     // 3317
        }                                                                                                            // 3318
    }                                                                                                                // 3319
    return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');                     // 3320
}                                                                                                                    // 3321
                                                                                                                     // 3322
/**                                                                                                                  // 3323
 * Return a human readable representation of a moment that can                                                       // 3324
 * also be evaluated to get a new moment which is the same                                                           // 3325
 *                                                                                                                   // 3326
 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects                   // 3327
 */                                                                                                                  // 3328
function inspect () {                                                                                                // 3329
    if (!this.isValid()) {                                                                                           // 3330
        return 'moment.invalid(/* ' + this._i + ' */)';                                                              // 3331
    }                                                                                                                // 3332
    var func = 'moment';                                                                                             // 3333
    var zone = '';                                                                                                   // 3334
    if (!this.isLocal()) {                                                                                           // 3335
        func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';                                           // 3336
        zone = 'Z';                                                                                                  // 3337
    }                                                                                                                // 3338
    var prefix = '[' + func + '("]';                                                                                 // 3339
    var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';                                        // 3340
    var datetime = '-MM-DD[T]HH:mm:ss.SSS';                                                                          // 3341
    var suffix = zone + '[")]';                                                                                      // 3342
                                                                                                                     // 3343
    return this.format(prefix + year + datetime + suffix);                                                           // 3344
}                                                                                                                    // 3345
                                                                                                                     // 3346
function format (inputString) {                                                                                      // 3347
    if (!inputString) {                                                                                              // 3348
        inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;                                   // 3349
    }                                                                                                                // 3350
    var output = formatMoment(this, inputString);                                                                    // 3351
    return this.localeData().postformat(output);                                                                     // 3352
}                                                                                                                    // 3353
                                                                                                                     // 3354
function from (time, withoutSuffix) {                                                                                // 3355
    if (this.isValid() &&                                                                                            // 3356
            ((isMoment(time) && time.isValid()) ||                                                                   // 3357
             createLocal(time).isValid())) {                                                                         // 3358
        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);                // 3359
    } else {                                                                                                         // 3360
        return this.localeData().invalidDate();                                                                      // 3361
    }                                                                                                                // 3362
}                                                                                                                    // 3363
                                                                                                                     // 3364
function fromNow (withoutSuffix) {                                                                                   // 3365
    return this.from(createLocal(), withoutSuffix);                                                                  // 3366
}                                                                                                                    // 3367
                                                                                                                     // 3368
function to (time, withoutSuffix) {                                                                                  // 3369
    if (this.isValid() &&                                                                                            // 3370
            ((isMoment(time) && time.isValid()) ||                                                                   // 3371
             createLocal(time).isValid())) {                                                                         // 3372
        return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);                // 3373
    } else {                                                                                                         // 3374
        return this.localeData().invalidDate();                                                                      // 3375
    }                                                                                                                // 3376
}                                                                                                                    // 3377
                                                                                                                     // 3378
function toNow (withoutSuffix) {                                                                                     // 3379
    return this.to(createLocal(), withoutSuffix);                                                                    // 3380
}                                                                                                                    // 3381
                                                                                                                     // 3382
// If passed a locale key, it will set the locale for this                                                           // 3383
// instance.  Otherwise, it will return the locale configuration                                                     // 3384
// variables for this instance.                                                                                      // 3385
function locale (key) {                                                                                              // 3386
    var newLocaleData;                                                                                               // 3387
                                                                                                                     // 3388
    if (key === undefined) {                                                                                         // 3389
        return this._locale._abbr;                                                                                   // 3390
    } else {                                                                                                         // 3391
        newLocaleData = getLocale(key);                                                                              // 3392
        if (newLocaleData != null) {                                                                                 // 3393
            this._locale = newLocaleData;                                                                            // 3394
        }                                                                                                            // 3395
        return this;                                                                                                 // 3396
    }                                                                                                                // 3397
}                                                                                                                    // 3398
                                                                                                                     // 3399
var lang = deprecate(                                                                                                // 3400
    'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
    function (key) {                                                                                                 // 3402
        if (key === undefined) {                                                                                     // 3403
            return this.localeData();                                                                                // 3404
        } else {                                                                                                     // 3405
            return this.locale(key);                                                                                 // 3406
        }                                                                                                            // 3407
    }                                                                                                                // 3408
);                                                                                                                   // 3409
                                                                                                                     // 3410
function localeData () {                                                                                             // 3411
    return this._locale;                                                                                             // 3412
}                                                                                                                    // 3413
                                                                                                                     // 3414
function startOf (units) {                                                                                           // 3415
    units = normalizeUnits(units);                                                                                   // 3416
    // the following switch intentionally omits break keywords                                                       // 3417
    // to utilize falling through the cases.                                                                         // 3418
    switch (units) {                                                                                                 // 3419
        case 'year':                                                                                                 // 3420
            this.month(0);                                                                                           // 3421
            /* falls through */                                                                                      // 3422
        case 'quarter':                                                                                              // 3423
        case 'month':                                                                                                // 3424
            this.date(1);                                                                                            // 3425
            /* falls through */                                                                                      // 3426
        case 'week':                                                                                                 // 3427
        case 'isoWeek':                                                                                              // 3428
        case 'day':                                                                                                  // 3429
        case 'date':                                                                                                 // 3430
            this.hours(0);                                                                                           // 3431
            /* falls through */                                                                                      // 3432
        case 'hour':                                                                                                 // 3433
            this.minutes(0);                                                                                         // 3434
            /* falls through */                                                                                      // 3435
        case 'minute':                                                                                               // 3436
            this.seconds(0);                                                                                         // 3437
            /* falls through */                                                                                      // 3438
        case 'second':                                                                                               // 3439
            this.milliseconds(0);                                                                                    // 3440
    }                                                                                                                // 3441
                                                                                                                     // 3442
    // weeks are a special case                                                                                      // 3443
    if (units === 'week') {                                                                                          // 3444
        this.weekday(0);                                                                                             // 3445
    }                                                                                                                // 3446
    if (units === 'isoWeek') {                                                                                       // 3447
        this.isoWeekday(1);                                                                                          // 3448
    }                                                                                                                // 3449
                                                                                                                     // 3450
    // quarters are also special                                                                                     // 3451
    if (units === 'quarter') {                                                                                       // 3452
        this.month(Math.floor(this.month() / 3) * 3);                                                                // 3453
    }                                                                                                                // 3454
                                                                                                                     // 3455
    return this;                                                                                                     // 3456
}                                                                                                                    // 3457
                                                                                                                     // 3458
function endOf (units) {                                                                                             // 3459
    units = normalizeUnits(units);                                                                                   // 3460
    if (units === undefined || units === 'millisecond') {                                                            // 3461
        return this;                                                                                                 // 3462
    }                                                                                                                // 3463
                                                                                                                     // 3464
    // 'date' is an alias for 'day', so it should be considered as such.                                             // 3465
    if (units === 'date') {                                                                                          // 3466
        units = 'day';                                                                                               // 3467
    }                                                                                                                // 3468
                                                                                                                     // 3469
    return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');                     // 3470
}                                                                                                                    // 3471
                                                                                                                     // 3472
function valueOf () {                                                                                                // 3473
    return this._d.valueOf() - ((this._offset || 0) * 60000);                                                        // 3474
}                                                                                                                    // 3475
                                                                                                                     // 3476
function unix () {                                                                                                   // 3477
    return Math.floor(this.valueOf() / 1000);                                                                        // 3478
}                                                                                                                    // 3479
                                                                                                                     // 3480
function toDate () {                                                                                                 // 3481
    return new Date(this.valueOf());                                                                                 // 3482
}                                                                                                                    // 3483
                                                                                                                     // 3484
function toArray () {                                                                                                // 3485
    var m = this;                                                                                                    // 3486
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];                       // 3487
}                                                                                                                    // 3488
                                                                                                                     // 3489
function toObject () {                                                                                               // 3490
    var m = this;                                                                                                    // 3491
    return {                                                                                                         // 3492
        years: m.year(),                                                                                             // 3493
        months: m.month(),                                                                                           // 3494
        date: m.date(),                                                                                              // 3495
        hours: m.hours(),                                                                                            // 3496
        minutes: m.minutes(),                                                                                        // 3497
        seconds: m.seconds(),                                                                                        // 3498
        milliseconds: m.milliseconds()                                                                               // 3499
    };                                                                                                               // 3500
}                                                                                                                    // 3501
                                                                                                                     // 3502
function toJSON () {                                                                                                 // 3503
    // new Date(NaN).toJSON() === null                                                                               // 3504
    return this.isValid() ? this.toISOString() : null;                                                               // 3505
}                                                                                                                    // 3506
                                                                                                                     // 3507
function isValid$2 () {                                                                                              // 3508
    return isValid(this);                                                                                            // 3509
}                                                                                                                    // 3510
                                                                                                                     // 3511
function parsingFlags () {                                                                                           // 3512
    return extend({}, getParsingFlags(this));                                                                        // 3513
}                                                                                                                    // 3514
                                                                                                                     // 3515
function invalidAt () {                                                                                              // 3516
    return getParsingFlags(this).overflow;                                                                           // 3517
}                                                                                                                    // 3518
                                                                                                                     // 3519
function creationData() {                                                                                            // 3520
    return {                                                                                                         // 3521
        input: this._i,                                                                                              // 3522
        format: this._f,                                                                                             // 3523
        locale: this._locale,                                                                                        // 3524
        isUTC: this._isUTC,                                                                                          // 3525
        strict: this._strict                                                                                         // 3526
    };                                                                                                               // 3527
}                                                                                                                    // 3528
                                                                                                                     // 3529
// FORMATTING                                                                                                        // 3530
                                                                                                                     // 3531
addFormatToken(0, ['gg', 2], 0, function () {                                                                        // 3532
    return this.weekYear() % 100;                                                                                    // 3533
});                                                                                                                  // 3534
                                                                                                                     // 3535
addFormatToken(0, ['GG', 2], 0, function () {                                                                        // 3536
    return this.isoWeekYear() % 100;                                                                                 // 3537
});                                                                                                                  // 3538
                                                                                                                     // 3539
function addWeekYearFormatToken (token, getter) {                                                                    // 3540
    addFormatToken(0, [token, token.length], 0, getter);                                                             // 3541
}                                                                                                                    // 3542
                                                                                                                     // 3543
addWeekYearFormatToken('gggg',     'weekYear');                                                                      // 3544
addWeekYearFormatToken('ggggg',    'weekYear');                                                                      // 3545
addWeekYearFormatToken('GGGG',  'isoWeekYear');                                                                      // 3546
addWeekYearFormatToken('GGGGG', 'isoWeekYear');                                                                      // 3547
                                                                                                                     // 3548
// ALIASES                                                                                                           // 3549
                                                                                                                     // 3550
addUnitAlias('weekYear', 'gg');                                                                                      // 3551
addUnitAlias('isoWeekYear', 'GG');                                                                                   // 3552
                                                                                                                     // 3553
// PRIORITY                                                                                                          // 3554
                                                                                                                     // 3555
addUnitPriority('weekYear', 1);                                                                                      // 3556
addUnitPriority('isoWeekYear', 1);                                                                                   // 3557
                                                                                                                     // 3558
                                                                                                                     // 3559
// PARSING                                                                                                           // 3560
                                                                                                                     // 3561
addRegexToken('G',      matchSigned);                                                                                // 3562
addRegexToken('g',      matchSigned);                                                                                // 3563
addRegexToken('GG',     match1to2, match2);                                                                          // 3564
addRegexToken('gg',     match1to2, match2);                                                                          // 3565
addRegexToken('GGGG',   match1to4, match4);                                                                          // 3566
addRegexToken('gggg',   match1to4, match4);                                                                          // 3567
addRegexToken('GGGGG',  match1to6, match6);                                                                          // 3568
addRegexToken('ggggg',  match1to6, match6);                                                                          // 3569
                                                                                                                     // 3570
addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {                        // 3571
    week[token.substr(0, 2)] = toInt(input);                                                                         // 3572
});                                                                                                                  // 3573
                                                                                                                     // 3574
addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {                                              // 3575
    week[token] = hooks.parseTwoDigitYear(input);                                                                    // 3576
});                                                                                                                  // 3577
                                                                                                                     // 3578
// MOMENTS                                                                                                           // 3579
                                                                                                                     // 3580
function getSetWeekYear (input) {                                                                                    // 3581
    return getSetWeekYearHelper.call(this,                                                                           // 3582
            input,                                                                                                   // 3583
            this.week(),                                                                                             // 3584
            this.weekday(),                                                                                          // 3585
            this.localeData()._week.dow,                                                                             // 3586
            this.localeData()._week.doy);                                                                            // 3587
}                                                                                                                    // 3588
                                                                                                                     // 3589
function getSetISOWeekYear (input) {                                                                                 // 3590
    return getSetWeekYearHelper.call(this,                                                                           // 3591
            input, this.isoWeek(), this.isoWeekday(), 1, 4);                                                         // 3592
}                                                                                                                    // 3593
                                                                                                                     // 3594
function getISOWeeksInYear () {                                                                                      // 3595
    return weeksInYear(this.year(), 1, 4);                                                                           // 3596
}                                                                                                                    // 3597
                                                                                                                     // 3598
function getWeeksInYear () {                                                                                         // 3599
    var weekInfo = this.localeData()._week;                                                                          // 3600
    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);                                                     // 3601
}                                                                                                                    // 3602
                                                                                                                     // 3603
function getSetWeekYearHelper(input, week, weekday, dow, doy) {                                                      // 3604
    var weeksTarget;                                                                                                 // 3605
    if (input == null) {                                                                                             // 3606
        return weekOfYear(this, dow, doy).year;                                                                      // 3607
    } else {                                                                                                         // 3608
        weeksTarget = weeksInYear(input, dow, doy);                                                                  // 3609
        if (week > weeksTarget) {                                                                                    // 3610
            week = weeksTarget;                                                                                      // 3611
        }                                                                                                            // 3612
        return setWeekAll.call(this, input, week, weekday, dow, doy);                                                // 3613
    }                                                                                                                // 3614
}                                                                                                                    // 3615
                                                                                                                     // 3616
function setWeekAll(weekYear, week, weekday, dow, doy) {                                                             // 3617
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),                                       // 3618
        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);                                        // 3619
                                                                                                                     // 3620
    this.year(date.getUTCFullYear());                                                                                // 3621
    this.month(date.getUTCMonth());                                                                                  // 3622
    this.date(date.getUTCDate());                                                                                    // 3623
    return this;                                                                                                     // 3624
}                                                                                                                    // 3625
                                                                                                                     // 3626
// FORMATTING                                                                                                        // 3627
                                                                                                                     // 3628
addFormatToken('Q', 0, 'Qo', 'quarter');                                                                             // 3629
                                                                                                                     // 3630
// ALIASES                                                                                                           // 3631
                                                                                                                     // 3632
addUnitAlias('quarter', 'Q');                                                                                        // 3633
                                                                                                                     // 3634
// PRIORITY                                                                                                          // 3635
                                                                                                                     // 3636
addUnitPriority('quarter', 7);                                                                                       // 3637
                                                                                                                     // 3638
// PARSING                                                                                                           // 3639
                                                                                                                     // 3640
addRegexToken('Q', match1);                                                                                          // 3641
addParseToken('Q', function (input, array) {                                                                         // 3642
    array[MONTH] = (toInt(input) - 1) * 3;                                                                           // 3643
});                                                                                                                  // 3644
                                                                                                                     // 3645
// MOMENTS                                                                                                           // 3646
                                                                                                                     // 3647
function getSetQuarter (input) {                                                                                     // 3648
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);       // 3649
}                                                                                                                    // 3650
                                                                                                                     // 3651
// FORMATTING                                                                                                        // 3652
                                                                                                                     // 3653
addFormatToken('D', ['DD', 2], 'Do', 'date');                                                                        // 3654
                                                                                                                     // 3655
// ALIASES                                                                                                           // 3656
                                                                                                                     // 3657
addUnitAlias('date', 'D');                                                                                           // 3658
                                                                                                                     // 3659
// PRIOROITY                                                                                                         // 3660
addUnitPriority('date', 9);                                                                                          // 3661
                                                                                                                     // 3662
// PARSING                                                                                                           // 3663
                                                                                                                     // 3664
addRegexToken('D',  match1to2);                                                                                      // 3665
addRegexToken('DD', match1to2, match2);                                                                              // 3666
addRegexToken('Do', function (isStrict, locale) {                                                                    // 3667
    // TODO: Remove "ordinalParse" fallback in next major release.                                                   // 3668
    return isStrict ?                                                                                                // 3669
      (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :                                                     // 3670
      locale._dayOfMonthOrdinalParseLenient;                                                                         // 3671
});                                                                                                                  // 3672
                                                                                                                     // 3673
addParseToken(['D', 'DD'], DATE);                                                                                    // 3674
addParseToken('Do', function (input, array) {                                                                        // 3675
    array[DATE] = toInt(input.match(match1to2)[0]);                                                                  // 3676
});                                                                                                                  // 3677
                                                                                                                     // 3678
// MOMENTS                                                                                                           // 3679
                                                                                                                     // 3680
var getSetDayOfMonth = makeGetSet('Date', true);                                                                     // 3681
                                                                                                                     // 3682
// FORMATTING                                                                                                        // 3683
                                                                                                                     // 3684
addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');                                                             // 3685
                                                                                                                     // 3686
// ALIASES                                                                                                           // 3687
                                                                                                                     // 3688
addUnitAlias('dayOfYear', 'DDD');                                                                                    // 3689
                                                                                                                     // 3690
// PRIORITY                                                                                                          // 3691
addUnitPriority('dayOfYear', 4);                                                                                     // 3692
                                                                                                                     // 3693
// PARSING                                                                                                           // 3694
                                                                                                                     // 3695
addRegexToken('DDD',  match1to3);                                                                                    // 3696
addRegexToken('DDDD', match3);                                                                                       // 3697
addParseToken(['DDD', 'DDDD'], function (input, array, config) {                                                     // 3698
    config._dayOfYear = toInt(input);                                                                                // 3699
});                                                                                                                  // 3700
                                                                                                                     // 3701
// HELPERS                                                                                                           // 3702
                                                                                                                     // 3703
// MOMENTS                                                                                                           // 3704
                                                                                                                     // 3705
function getSetDayOfYear (input) {                                                                                   // 3706
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;            // 3707
    return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');                                           // 3708
}                                                                                                                    // 3709
                                                                                                                     // 3710
// FORMATTING                                                                                                        // 3711
                                                                                                                     // 3712
addFormatToken('m', ['mm', 2], 0, 'minute');                                                                         // 3713
                                                                                                                     // 3714
// ALIASES                                                                                                           // 3715
                                                                                                                     // 3716
addUnitAlias('minute', 'm');                                                                                         // 3717
                                                                                                                     // 3718
// PRIORITY                                                                                                          // 3719
                                                                                                                     // 3720
addUnitPriority('minute', 14);                                                                                       // 3721
                                                                                                                     // 3722
// PARSING                                                                                                           // 3723
                                                                                                                     // 3724
addRegexToken('m',  match1to2);                                                                                      // 3725
addRegexToken('mm', match1to2, match2);                                                                              // 3726
addParseToken(['m', 'mm'], MINUTE);                                                                                  // 3727
                                                                                                                     // 3728
// MOMENTS                                                                                                           // 3729
                                                                                                                     // 3730
var getSetMinute = makeGetSet('Minutes', false);                                                                     // 3731
                                                                                                                     // 3732
// FORMATTING                                                                                                        // 3733
                                                                                                                     // 3734
addFormatToken('s', ['ss', 2], 0, 'second');                                                                         // 3735
                                                                                                                     // 3736
// ALIASES                                                                                                           // 3737
                                                                                                                     // 3738
addUnitAlias('second', 's');                                                                                         // 3739
                                                                                                                     // 3740
// PRIORITY                                                                                                          // 3741
                                                                                                                     // 3742
addUnitPriority('second', 15);                                                                                       // 3743
                                                                                                                     // 3744
// PARSING                                                                                                           // 3745
                                                                                                                     // 3746
addRegexToken('s',  match1to2);                                                                                      // 3747
addRegexToken('ss', match1to2, match2);                                                                              // 3748
addParseToken(['s', 'ss'], SECOND);                                                                                  // 3749
                                                                                                                     // 3750
// MOMENTS                                                                                                           // 3751
                                                                                                                     // 3752
var getSetSecond = makeGetSet('Seconds', false);                                                                     // 3753
                                                                                                                     // 3754
// FORMATTING                                                                                                        // 3755
                                                                                                                     // 3756
addFormatToken('S', 0, 0, function () {                                                                              // 3757
    return ~~(this.millisecond() / 100);                                                                             // 3758
});                                                                                                                  // 3759
                                                                                                                     // 3760
addFormatToken(0, ['SS', 2], 0, function () {                                                                        // 3761
    return ~~(this.millisecond() / 10);                                                                              // 3762
});                                                                                                                  // 3763
                                                                                                                     // 3764
addFormatToken(0, ['SSS', 3], 0, 'millisecond');                                                                     // 3765
addFormatToken(0, ['SSSS', 4], 0, function () {                                                                      // 3766
    return this.millisecond() * 10;                                                                                  // 3767
});                                                                                                                  // 3768
addFormatToken(0, ['SSSSS', 5], 0, function () {                                                                     // 3769
    return this.millisecond() * 100;                                                                                 // 3770
});                                                                                                                  // 3771
addFormatToken(0, ['SSSSSS', 6], 0, function () {                                                                    // 3772
    return this.millisecond() * 1000;                                                                                // 3773
});                                                                                                                  // 3774
addFormatToken(0, ['SSSSSSS', 7], 0, function () {                                                                   // 3775
    return this.millisecond() * 10000;                                                                               // 3776
});                                                                                                                  // 3777
addFormatToken(0, ['SSSSSSSS', 8], 0, function () {                                                                  // 3778
    return this.millisecond() * 100000;                                                                              // 3779
});                                                                                                                  // 3780
addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {                                                                 // 3781
    return this.millisecond() * 1000000;                                                                             // 3782
});                                                                                                                  // 3783
                                                                                                                     // 3784
                                                                                                                     // 3785
// ALIASES                                                                                                           // 3786
                                                                                                                     // 3787
addUnitAlias('millisecond', 'ms');                                                                                   // 3788
                                                                                                                     // 3789
// PRIORITY                                                                                                          // 3790
                                                                                                                     // 3791
addUnitPriority('millisecond', 16);                                                                                  // 3792
                                                                                                                     // 3793
// PARSING                                                                                                           // 3794
                                                                                                                     // 3795
addRegexToken('S',    match1to3, match1);                                                                            // 3796
addRegexToken('SS',   match1to3, match2);                                                                            // 3797
addRegexToken('SSS',  match1to3, match3);                                                                            // 3798
                                                                                                                     // 3799
var token;                                                                                                           // 3800
for (token = 'SSSS'; token.length <= 9; token += 'S') {                                                              // 3801
    addRegexToken(token, matchUnsigned);                                                                             // 3802
}                                                                                                                    // 3803
                                                                                                                     // 3804
function parseMs(input, array) {                                                                                     // 3805
    array[MILLISECOND] = toInt(('0.' + input) * 1000);                                                               // 3806
}                                                                                                                    // 3807
                                                                                                                     // 3808
for (token = 'S'; token.length <= 9; token += 'S') {                                                                 // 3809
    addParseToken(token, parseMs);                                                                                   // 3810
}                                                                                                                    // 3811
// MOMENTS                                                                                                           // 3812
                                                                                                                     // 3813
var getSetMillisecond = makeGetSet('Milliseconds', false);                                                           // 3814
                                                                                                                     // 3815
// FORMATTING                                                                                                        // 3816
                                                                                                                     // 3817
addFormatToken('z',  0, 0, 'zoneAbbr');                                                                              // 3818
addFormatToken('zz', 0, 0, 'zoneName');                                                                              // 3819
                                                                                                                     // 3820
// MOMENTS                                                                                                           // 3821
                                                                                                                     // 3822
function getZoneAbbr () {                                                                                            // 3823
    return this._isUTC ? 'UTC' : '';                                                                                 // 3824
}                                                                                                                    // 3825
                                                                                                                     // 3826
function getZoneName () {                                                                                            // 3827
    return this._isUTC ? 'Coordinated Universal Time' : '';                                                          // 3828
}                                                                                                                    // 3829
                                                                                                                     // 3830
var proto = Moment.prototype;                                                                                        // 3831
                                                                                                                     // 3832
proto.add               = add;                                                                                       // 3833
proto.calendar          = calendar$1;                                                                                // 3834
proto.clone             = clone;                                                                                     // 3835
proto.diff              = diff;                                                                                      // 3836
proto.endOf             = endOf;                                                                                     // 3837
proto.format            = format;                                                                                    // 3838
proto.from              = from;                                                                                      // 3839
proto.fromNow           = fromNow;                                                                                   // 3840
proto.to                = to;                                                                                        // 3841
proto.toNow             = toNow;                                                                                     // 3842
proto.get               = stringGet;                                                                                 // 3843
proto.invalidAt         = invalidAt;                                                                                 // 3844
proto.isAfter           = isAfter;                                                                                   // 3845
proto.isBefore          = isBefore;                                                                                  // 3846
proto.isBetween         = isBetween;                                                                                 // 3847
proto.isSame            = isSame;                                                                                    // 3848
proto.isSameOrAfter     = isSameOrAfter;                                                                             // 3849
proto.isSameOrBefore    = isSameOrBefore;                                                                            // 3850
proto.isValid           = isValid$2;                                                                                 // 3851
proto.lang              = lang;                                                                                      // 3852
proto.locale            = locale;                                                                                    // 3853
proto.localeData        = localeData;                                                                                // 3854
proto.max               = prototypeMax;                                                                              // 3855
proto.min               = prototypeMin;                                                                              // 3856
proto.parsingFlags      = parsingFlags;                                                                              // 3857
proto.set               = stringSet;                                                                                 // 3858
proto.startOf           = startOf;                                                                                   // 3859
proto.subtract          = subtract;                                                                                  // 3860
proto.toArray           = toArray;                                                                                   // 3861
proto.toObject          = toObject;                                                                                  // 3862
proto.toDate            = toDate;                                                                                    // 3863
proto.toISOString       = toISOString;                                                                               // 3864
proto.inspect           = inspect;                                                                                   // 3865
proto.toJSON            = toJSON;                                                                                    // 3866
proto.toString          = toString;                                                                                  // 3867
proto.unix              = unix;                                                                                      // 3868
proto.valueOf           = valueOf;                                                                                   // 3869
proto.creationData      = creationData;                                                                              // 3870
                                                                                                                     // 3871
// Year                                                                                                              // 3872
proto.year       = getSetYear;                                                                                       // 3873
proto.isLeapYear = getIsLeapYear;                                                                                    // 3874
                                                                                                                     // 3875
// Week Year                                                                                                         // 3876
proto.weekYear    = getSetWeekYear;                                                                                  // 3877
proto.isoWeekYear = getSetISOWeekYear;                                                                               // 3878
                                                                                                                     // 3879
// Quarter                                                                                                           // 3880
proto.quarter = proto.quarters = getSetQuarter;                                                                      // 3881
                                                                                                                     // 3882
// Month                                                                                                             // 3883
proto.month       = getSetMonth;                                                                                     // 3884
proto.daysInMonth = getDaysInMonth;                                                                                  // 3885
                                                                                                                     // 3886
// Week                                                                                                              // 3887
proto.week           = proto.weeks        = getSetWeek;                                                              // 3888
proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;                                                           // 3889
proto.weeksInYear    = getWeeksInYear;                                                                               // 3890
proto.isoWeeksInYear = getISOWeeksInYear;                                                                            // 3891
                                                                                                                     // 3892
// Day                                                                                                               // 3893
proto.date       = getSetDayOfMonth;                                                                                 // 3894
proto.day        = proto.days             = getSetDayOfWeek;                                                         // 3895
proto.weekday    = getSetLocaleDayOfWeek;                                                                            // 3896
proto.isoWeekday = getSetISODayOfWeek;                                                                               // 3897
proto.dayOfYear  = getSetDayOfYear;                                                                                  // 3898
                                                                                                                     // 3899
// Hour                                                                                                              // 3900
proto.hour = proto.hours = getSetHour;                                                                               // 3901
                                                                                                                     // 3902
// Minute                                                                                                            // 3903
proto.minute = proto.minutes = getSetMinute;                                                                         // 3904
                                                                                                                     // 3905
// Second                                                                                                            // 3906
proto.second = proto.seconds = getSetSecond;                                                                         // 3907
                                                                                                                     // 3908
// Millisecond                                                                                                       // 3909
proto.millisecond = proto.milliseconds = getSetMillisecond;                                                          // 3910
                                                                                                                     // 3911
// Offset                                                                                                            // 3912
proto.utcOffset            = getSetOffset;                                                                           // 3913
proto.utc                  = setOffsetToUTC;                                                                         // 3914
proto.local                = setOffsetToLocal;                                                                       // 3915
proto.parseZone            = setOffsetToParsedOffset;                                                                // 3916
proto.hasAlignedHourOffset = hasAlignedHourOffset;                                                                   // 3917
proto.isDST                = isDaylightSavingTime;                                                                   // 3918
proto.isLocal              = isLocal;                                                                                // 3919
proto.isUtcOffset          = isUtcOffset;                                                                            // 3920
proto.isUtc                = isUtc;                                                                                  // 3921
proto.isUTC                = isUtc;                                                                                  // 3922
                                                                                                                     // 3923
// Timezone                                                                                                          // 3924
proto.zoneAbbr = getZoneAbbr;                                                                                        // 3925
proto.zoneName = getZoneName;                                                                                        // 3926
                                                                                                                     // 3927
// Deprecations                                                                                                      // 3928
proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);                       // 3929
proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);                           // 3930
proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);                              // 3931
proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);
                                                                                                                     // 3934
function createUnix (input) {                                                                                        // 3935
    return createLocal(input * 1000);                                                                                // 3936
}                                                                                                                    // 3937
                                                                                                                     // 3938
function createInZone () {                                                                                           // 3939
    return createLocal.apply(null, arguments).parseZone();                                                           // 3940
}                                                                                                                    // 3941
                                                                                                                     // 3942
function preParsePostFormat (string) {                                                                               // 3943
    return string;                                                                                                   // 3944
}                                                                                                                    // 3945
                                                                                                                     // 3946
var proto$1 = Locale.prototype;                                                                                      // 3947
                                                                                                                     // 3948
proto$1.calendar        = calendar;                                                                                  // 3949
proto$1.longDateFormat  = longDateFormat;                                                                            // 3950
proto$1.invalidDate     = invalidDate;                                                                               // 3951
proto$1.ordinal         = ordinal;                                                                                   // 3952
proto$1.preparse        = preParsePostFormat;                                                                        // 3953
proto$1.postformat      = preParsePostFormat;                                                                        // 3954
proto$1.relativeTime    = relativeTime;                                                                              // 3955
proto$1.pastFuture      = pastFuture;                                                                                // 3956
proto$1.set             = set;                                                                                       // 3957
                                                                                                                     // 3958
// Month                                                                                                             // 3959
proto$1.months            =        localeMonths;                                                                     // 3960
proto$1.monthsShort       =        localeMonthsShort;                                                                // 3961
proto$1.monthsParse       =        localeMonthsParse;                                                                // 3962
proto$1.monthsRegex       = monthsRegex;                                                                             // 3963
proto$1.monthsShortRegex  = monthsShortRegex;                                                                        // 3964
                                                                                                                     // 3965
// Week                                                                                                              // 3966
proto$1.week = localeWeek;                                                                                           // 3967
proto$1.firstDayOfYear = localeFirstDayOfYear;                                                                       // 3968
proto$1.firstDayOfWeek = localeFirstDayOfWeek;                                                                       // 3969
                                                                                                                     // 3970
// Day of Week                                                                                                       // 3971
proto$1.weekdays       =        localeWeekdays;                                                                      // 3972
proto$1.weekdaysMin    =        localeWeekdaysMin;                                                                   // 3973
proto$1.weekdaysShort  =        localeWeekdaysShort;                                                                 // 3974
proto$1.weekdaysParse  =        localeWeekdaysParse;                                                                 // 3975
                                                                                                                     // 3976
proto$1.weekdaysRegex       =        weekdaysRegex;                                                                  // 3977
proto$1.weekdaysShortRegex  =        weekdaysShortRegex;                                                             // 3978
proto$1.weekdaysMinRegex    =        weekdaysMinRegex;                                                               // 3979
                                                                                                                     // 3980
// Hours                                                                                                             // 3981
proto$1.isPM = localeIsPM;                                                                                           // 3982
proto$1.meridiem = localeMeridiem;                                                                                   // 3983
                                                                                                                     // 3984
function get$1 (format, index, field, setter) {                                                                      // 3985
    var locale = getLocale();                                                                                        // 3986
    var utc = createUTC().set(setter, index);                                                                        // 3987
    return locale[field](utc, format);                                                                               // 3988
}                                                                                                                    // 3989
                                                                                                                     // 3990
function listMonthsImpl (format, index, field) {                                                                     // 3991
    if (isNumber(format)) {                                                                                          // 3992
        index = format;                                                                                              // 3993
        format = undefined;                                                                                          // 3994
    }                                                                                                                // 3995
                                                                                                                     // 3996
    format = format || '';                                                                                           // 3997
                                                                                                                     // 3998
    if (index != null) {                                                                                             // 3999
        return get$1(format, index, field, 'month');                                                                 // 4000
    }                                                                                                                // 4001
                                                                                                                     // 4002
    var i;                                                                                                           // 4003
    var out = [];                                                                                                    // 4004
    for (i = 0; i < 12; i++) {                                                                                       // 4005
        out[i] = get$1(format, i, field, 'month');                                                                   // 4006
    }                                                                                                                // 4007
    return out;                                                                                                      // 4008
}                                                                                                                    // 4009
                                                                                                                     // 4010
// ()                                                                                                                // 4011
// (5)                                                                                                               // 4012
// (fmt, 5)                                                                                                          // 4013
// (fmt)                                                                                                             // 4014
// (true)                                                                                                            // 4015
// (true, 5)                                                                                                         // 4016
// (true, fmt, 5)                                                                                                    // 4017
// (true, fmt)                                                                                                       // 4018
function listWeekdaysImpl (localeSorted, format, index, field) {                                                     // 4019
    if (typeof localeSorted === 'boolean') {                                                                         // 4020
        if (isNumber(format)) {                                                                                      // 4021
            index = format;                                                                                          // 4022
            format = undefined;                                                                                      // 4023
        }                                                                                                            // 4024
                                                                                                                     // 4025
        format = format || '';                                                                                       // 4026
    } else {                                                                                                         // 4027
        format = localeSorted;                                                                                       // 4028
        index = format;                                                                                              // 4029
        localeSorted = false;                                                                                        // 4030
                                                                                                                     // 4031
        if (isNumber(format)) {                                                                                      // 4032
            index = format;                                                                                          // 4033
            format = undefined;                                                                                      // 4034
        }                                                                                                            // 4035
                                                                                                                     // 4036
        format = format || '';                                                                                       // 4037
    }                                                                                                                // 4038
                                                                                                                     // 4039
    var locale = getLocale(),                                                                                        // 4040
        shift = localeSorted ? locale._week.dow : 0;                                                                 // 4041
                                                                                                                     // 4042
    if (index != null) {                                                                                             // 4043
        return get$1(format, (index + shift) % 7, field, 'day');                                                     // 4044
    }                                                                                                                // 4045
                                                                                                                     // 4046
    var i;                                                                                                           // 4047
    var out = [];                                                                                                    // 4048
    for (i = 0; i < 7; i++) {                                                                                        // 4049
        out[i] = get$1(format, (i + shift) % 7, field, 'day');                                                       // 4050
    }                                                                                                                // 4051
    return out;                                                                                                      // 4052
}                                                                                                                    // 4053
                                                                                                                     // 4054
function listMonths (format, index) {                                                                                // 4055
    return listMonthsImpl(format, index, 'months');                                                                  // 4056
}                                                                                                                    // 4057
                                                                                                                     // 4058
function listMonthsShort (format, index) {                                                                           // 4059
    return listMonthsImpl(format, index, 'monthsShort');                                                             // 4060
}                                                                                                                    // 4061
                                                                                                                     // 4062
function listWeekdays (localeSorted, format, index) {                                                                // 4063
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');                                                // 4064
}                                                                                                                    // 4065
                                                                                                                     // 4066
function listWeekdaysShort (localeSorted, format, index) {                                                           // 4067
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');                                           // 4068
}                                                                                                                    // 4069
                                                                                                                     // 4070
function listWeekdaysMin (localeSorted, format, index) {                                                             // 4071
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');                                             // 4072
}                                                                                                                    // 4073
                                                                                                                     // 4074
getSetGlobalLocale('en', {                                                                                           // 4075
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,                                                                  // 4076
    ordinal : function (number) {                                                                                    // 4077
        var b = number % 10,                                                                                         // 4078
            output = (toInt(number % 100 / 10) === 1) ? 'th' :                                                       // 4079
            (b === 1) ? 'st' :                                                                                       // 4080
            (b === 2) ? 'nd' :                                                                                       // 4081
            (b === 3) ? 'rd' : 'th';                                                                                 // 4082
        return number + output;                                                                                      // 4083
    }                                                                                                                // 4084
});                                                                                                                  // 4085
                                                                                                                     // 4086
// Side effect imports                                                                                               // 4087
hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);                 // 4088
hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);              // 4089
                                                                                                                     // 4090
var mathAbs = Math.abs;                                                                                              // 4091
                                                                                                                     // 4092
function abs () {                                                                                                    // 4093
    var data           = this._data;                                                                                 // 4094
                                                                                                                     // 4095
    this._milliseconds = mathAbs(this._milliseconds);                                                                // 4096
    this._days         = mathAbs(this._days);                                                                        // 4097
    this._months       = mathAbs(this._months);                                                                      // 4098
                                                                                                                     // 4099
    data.milliseconds  = mathAbs(data.milliseconds);                                                                 // 4100
    data.seconds       = mathAbs(data.seconds);                                                                      // 4101
    data.minutes       = mathAbs(data.minutes);                                                                      // 4102
    data.hours         = mathAbs(data.hours);                                                                        // 4103
    data.months        = mathAbs(data.months);                                                                       // 4104
    data.years         = mathAbs(data.years);                                                                        // 4105
                                                                                                                     // 4106
    return this;                                                                                                     // 4107
}                                                                                                                    // 4108
                                                                                                                     // 4109
function addSubtract$1 (duration, input, value, direction) {                                                         // 4110
    var other = createDuration(input, value);                                                                        // 4111
                                                                                                                     // 4112
    duration._milliseconds += direction * other._milliseconds;                                                       // 4113
    duration._days         += direction * other._days;                                                               // 4114
    duration._months       += direction * other._months;                                                             // 4115
                                                                                                                     // 4116
    return duration._bubble();                                                                                       // 4117
}                                                                                                                    // 4118
                                                                                                                     // 4119
// supports only 2.0-style add(1, 's') or add(duration)                                                              // 4120
function add$1 (input, value) {                                                                                      // 4121
    return addSubtract$1(this, input, value, 1);                                                                     // 4122
}                                                                                                                    // 4123
                                                                                                                     // 4124
// supports only 2.0-style subtract(1, 's') or subtract(duration)                                                    // 4125
function subtract$1 (input, value) {                                                                                 // 4126
    return addSubtract$1(this, input, value, -1);                                                                    // 4127
}                                                                                                                    // 4128
                                                                                                                     // 4129
function absCeil (number) {                                                                                          // 4130
    if (number < 0) {                                                                                                // 4131
        return Math.floor(number);                                                                                   // 4132
    } else {                                                                                                         // 4133
        return Math.ceil(number);                                                                                    // 4134
    }                                                                                                                // 4135
}                                                                                                                    // 4136
                                                                                                                     // 4137
function bubble () {                                                                                                 // 4138
    var milliseconds = this._milliseconds;                                                                           // 4139
    var days         = this._days;                                                                                   // 4140
    var months       = this._months;                                                                                 // 4141
    var data         = this._data;                                                                                   // 4142
    var seconds, minutes, hours, years, monthsFromDays;                                                              // 4143
                                                                                                                     // 4144
    // if we have a mix of positive and negative values, bubble down first                                           // 4145
    // check: https://github.com/moment/moment/issues/2166                                                           // 4146
    if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||                                                         // 4147
            (milliseconds <= 0 && days <= 0 && months <= 0))) {                                                      // 4148
        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;                                                // 4149
        days = 0;                                                                                                    // 4150
        months = 0;                                                                                                  // 4151
    }                                                                                                                // 4152
                                                                                                                     // 4153
    // The following code bubbles up values, see the tests for                                                       // 4154
    // examples of what that means.                                                                                  // 4155
    data.milliseconds = milliseconds % 1000;                                                                         // 4156
                                                                                                                     // 4157
    seconds           = absFloor(milliseconds / 1000);                                                               // 4158
    data.seconds      = seconds % 60;                                                                                // 4159
                                                                                                                     // 4160
    minutes           = absFloor(seconds / 60);                                                                      // 4161
    data.minutes      = minutes % 60;                                                                                // 4162
                                                                                                                     // 4163
    hours             = absFloor(minutes / 60);                                                                      // 4164
    data.hours        = hours % 24;                                                                                  // 4165
                                                                                                                     // 4166
    days += absFloor(hours / 24);                                                                                    // 4167
                                                                                                                     // 4168
    // convert days to months                                                                                        // 4169
    monthsFromDays = absFloor(daysToMonths(days));                                                                   // 4170
    months += monthsFromDays;                                                                                        // 4171
    days -= absCeil(monthsToDays(monthsFromDays));                                                                   // 4172
                                                                                                                     // 4173
    // 12 months -> 1 year                                                                                           // 4174
    years = absFloor(months / 12);                                                                                   // 4175
    months %= 12;                                                                                                    // 4176
                                                                                                                     // 4177
    data.days   = days;                                                                                              // 4178
    data.months = months;                                                                                            // 4179
    data.years  = years;                                                                                             // 4180
                                                                                                                     // 4181
    return this;                                                                                                     // 4182
}                                                                                                                    // 4183
                                                                                                                     // 4184
function daysToMonths (days) {                                                                                       // 4185
    // 400 years have 146097 days (taking into account leap year rules)                                              // 4186
    // 400 years have 12 months === 4800                                                                             // 4187
    return days * 4800 / 146097;                                                                                     // 4188
}                                                                                                                    // 4189
                                                                                                                     // 4190
function monthsToDays (months) {                                                                                     // 4191
    // the reverse of daysToMonths                                                                                   // 4192
    return months * 146097 / 4800;                                                                                   // 4193
}                                                                                                                    // 4194
                                                                                                                     // 4195
function as (units) {                                                                                                // 4196
    if (!this.isValid()) {                                                                                           // 4197
        return NaN;                                                                                                  // 4198
    }                                                                                                                // 4199
    var days;                                                                                                        // 4200
    var months;                                                                                                      // 4201
    var milliseconds = this._milliseconds;                                                                           // 4202
                                                                                                                     // 4203
    units = normalizeUnits(units);                                                                                   // 4204
                                                                                                                     // 4205
    if (units === 'month' || units === 'year') {                                                                     // 4206
        days   = this._days   + milliseconds / 864e5;                                                                // 4207
        months = this._months + daysToMonths(days);                                                                  // 4208
        return units === 'month' ? months : months / 12;                                                             // 4209
    } else {                                                                                                         // 4210
        // handle milliseconds separately because of floating point math errors (issue #1867)                        // 4211
        days = this._days + Math.round(monthsToDays(this._months));                                                  // 4212
        switch (units) {                                                                                             // 4213
            case 'week'   : return days / 7     + milliseconds / 6048e5;                                             // 4214
            case 'day'    : return days         + milliseconds / 864e5;                                              // 4215
            case 'hour'   : return days * 24    + milliseconds / 36e5;                                               // 4216
            case 'minute' : return days * 1440  + milliseconds / 6e4;                                                // 4217
            case 'second' : return days * 86400 + milliseconds / 1000;                                               // 4218
            // Math.floor prevents floating point math errors here                                                   // 4219
            case 'millisecond': return Math.floor(days * 864e5) + milliseconds;                                      // 4220
            default: throw new Error('Unknown unit ' + units);                                                       // 4221
        }                                                                                                            // 4222
    }                                                                                                                // 4223
}                                                                                                                    // 4224
                                                                                                                     // 4225
// TODO: Use this.as('ms')?                                                                                          // 4226
function valueOf$1 () {                                                                                              // 4227
    if (!this.isValid()) {                                                                                           // 4228
        return NaN;                                                                                                  // 4229
    }                                                                                                                // 4230
    return (                                                                                                         // 4231
        this._milliseconds +                                                                                         // 4232
        this._days * 864e5 +                                                                                         // 4233
        (this._months % 12) * 2592e6 +                                                                               // 4234
        toInt(this._months / 12) * 31536e6                                                                           // 4235
    );                                                                                                               // 4236
}                                                                                                                    // 4237
                                                                                                                     // 4238
function makeAs (alias) {                                                                                            // 4239
    return function () {                                                                                             // 4240
        return this.as(alias);                                                                                       // 4241
    };                                                                                                               // 4242
}                                                                                                                    // 4243
                                                                                                                     // 4244
var asMilliseconds = makeAs('ms');                                                                                   // 4245
var asSeconds      = makeAs('s');                                                                                    // 4246
var asMinutes      = makeAs('m');                                                                                    // 4247
var asHours        = makeAs('h');                                                                                    // 4248
var asDays         = makeAs('d');                                                                                    // 4249
var asWeeks        = makeAs('w');                                                                                    // 4250
var asMonths       = makeAs('M');                                                                                    // 4251
var asYears        = makeAs('y');                                                                                    // 4252
                                                                                                                     // 4253
function clone$1 () {                                                                                                // 4254
    return createDuration(this);                                                                                     // 4255
}                                                                                                                    // 4256
                                                                                                                     // 4257
function get$2 (units) {                                                                                             // 4258
    units = normalizeUnits(units);                                                                                   // 4259
    return this.isValid() ? this[units + 's']() : NaN;                                                               // 4260
}                                                                                                                    // 4261
                                                                                                                     // 4262
function makeGetter(name) {                                                                                          // 4263
    return function () {                                                                                             // 4264
        return this.isValid() ? this._data[name] : NaN;                                                              // 4265
    };                                                                                                               // 4266
}                                                                                                                    // 4267
                                                                                                                     // 4268
var milliseconds = makeGetter('milliseconds');                                                                       // 4269
var seconds      = makeGetter('seconds');                                                                            // 4270
var minutes      = makeGetter('minutes');                                                                            // 4271
var hours        = makeGetter('hours');                                                                              // 4272
var days         = makeGetter('days');                                                                               // 4273
var months       = makeGetter('months');                                                                             // 4274
var years        = makeGetter('years');                                                                              // 4275
                                                                                                                     // 4276
function weeks () {                                                                                                  // 4277
    return absFloor(this.days() / 7);                                                                                // 4278
}                                                                                                                    // 4279
                                                                                                                     // 4280
var round = Math.round;                                                                                              // 4281
var thresholds = {                                                                                                   // 4282
    ss: 44,         // a few seconds to seconds                                                                      // 4283
    s : 45,         // seconds to minute                                                                             // 4284
    m : 45,         // minutes to hour                                                                               // 4285
    h : 22,         // hours to day                                                                                  // 4286
    d : 26,         // days to month                                                                                 // 4287
    M : 11          // months to year                                                                                // 4288
};                                                                                                                   // 4289
                                                                                                                     // 4290
// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize                            // 4291
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {                                        // 4292
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);                                      // 4293
}                                                                                                                    // 4294
                                                                                                                     // 4295
function relativeTime$1 (posNegDuration, withoutSuffix, locale) {                                                    // 4296
    var duration = createDuration(posNegDuration).abs();                                                             // 4297
    var seconds  = round(duration.as('s'));                                                                          // 4298
    var minutes  = round(duration.as('m'));                                                                          // 4299
    var hours    = round(duration.as('h'));                                                                          // 4300
    var days     = round(duration.as('d'));                                                                          // 4301
    var months   = round(duration.as('M'));                                                                          // 4302
    var years    = round(duration.as('y'));                                                                          // 4303
                                                                                                                     // 4304
    var a = seconds <= thresholds.ss && ['s', seconds]  ||                                                           // 4305
            seconds < thresholds.s   && ['ss', seconds] ||                                                           // 4306
            minutes <= 1             && ['m']           ||                                                           // 4307
            minutes < thresholds.m   && ['mm', minutes] ||                                                           // 4308
            hours   <= 1             && ['h']           ||                                                           // 4309
            hours   < thresholds.h   && ['hh', hours]   ||                                                           // 4310
            days    <= 1             && ['d']           ||                                                           // 4311
            days    < thresholds.d   && ['dd', days]    ||                                                           // 4312
            months  <= 1             && ['M']           ||                                                           // 4313
            months  < thresholds.M   && ['MM', months]  ||                                                           // 4314
            years   <= 1             && ['y']           || ['yy', years];                                            // 4315
                                                                                                                     // 4316
    a[2] = withoutSuffix;                                                                                            // 4317
    a[3] = +posNegDuration > 0;                                                                                      // 4318
    a[4] = locale;                                                                                                   // 4319
    return substituteTimeAgo.apply(null, a);                                                                         // 4320
}                                                                                                                    // 4321
                                                                                                                     // 4322
// This function allows you to set the rounding function for relative time strings                                   // 4323
function getSetRelativeTimeRounding (roundingFunction) {                                                             // 4324
    if (roundingFunction === undefined) {                                                                            // 4325
        return round;                                                                                                // 4326
    }                                                                                                                // 4327
    if (typeof(roundingFunction) === 'function') {                                                                   // 4328
        round = roundingFunction;                                                                                    // 4329
        return true;                                                                                                 // 4330
    }                                                                                                                // 4331
    return false;                                                                                                    // 4332
}                                                                                                                    // 4333
                                                                                                                     // 4334
// This function allows you to set a threshold for relative time strings                                             // 4335
function getSetRelativeTimeThreshold (threshold, limit) {                                                            // 4336
    if (thresholds[threshold] === undefined) {                                                                       // 4337
        return false;                                                                                                // 4338
    }                                                                                                                // 4339
    if (limit === undefined) {                                                                                       // 4340
        return thresholds[threshold];                                                                                // 4341
    }                                                                                                                // 4342
    thresholds[threshold] = limit;                                                                                   // 4343
    if (threshold === 's') {                                                                                         // 4344
        thresholds.ss = limit - 1;                                                                                   // 4345
    }                                                                                                                // 4346
    return true;                                                                                                     // 4347
}                                                                                                                    // 4348
                                                                                                                     // 4349
function humanize (withSuffix) {                                                                                     // 4350
    if (!this.isValid()) {                                                                                           // 4351
        return this.localeData().invalidDate();                                                                      // 4352
    }                                                                                                                // 4353
                                                                                                                     // 4354
    var locale = this.localeData();                                                                                  // 4355
    var output = relativeTime$1(this, !withSuffix, locale);                                                          // 4356
                                                                                                                     // 4357
    if (withSuffix) {                                                                                                // 4358
        output = locale.pastFuture(+this, output);                                                                   // 4359
    }                                                                                                                // 4360
                                                                                                                     // 4361
    return locale.postformat(output);                                                                                // 4362
}                                                                                                                    // 4363
                                                                                                                     // 4364
var abs$1 = Math.abs;                                                                                                // 4365
                                                                                                                     // 4366
function sign(x) {                                                                                                   // 4367
    return ((x > 0) - (x < 0)) || +x;                                                                                // 4368
}                                                                                                                    // 4369
                                                                                                                     // 4370
function toISOString$1() {                                                                                           // 4371
    // for ISO strings we do not use the normal bubbling rules:                                                      // 4372
    //  * milliseconds bubble up until they become hours                                                             // 4373
    //  * days do not bubble at all                                                                                  // 4374
    //  * months bubble up until they become years                                                                   // 4375
    // This is because there is no context-free conversion between hours and days                                    // 4376
    // (think of clock changes)                                                                                      // 4377
    // and also not between days and months (28-31 days per month)                                                   // 4378
    if (!this.isValid()) {                                                                                           // 4379
        return this.localeData().invalidDate();                                                                      // 4380
    }                                                                                                                // 4381
                                                                                                                     // 4382
    var seconds = abs$1(this._milliseconds) / 1000;                                                                  // 4383
    var days         = abs$1(this._days);                                                                            // 4384
    var months       = abs$1(this._months);                                                                          // 4385
    var minutes, hours, years;                                                                                       // 4386
                                                                                                                     // 4387
    // 3600 seconds -> 60 minutes -> 1 hour                                                                          // 4388
    minutes           = absFloor(seconds / 60);                                                                      // 4389
    hours             = absFloor(minutes / 60);                                                                      // 4390
    seconds %= 60;                                                                                                   // 4391
    minutes %= 60;                                                                                                   // 4392
                                                                                                                     // 4393
    // 12 months -> 1 year                                                                                           // 4394
    years  = absFloor(months / 12);                                                                                  // 4395
    months %= 12;                                                                                                    // 4396
                                                                                                                     // 4397
                                                                                                                     // 4398
    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js                  // 4399
    var Y = years;                                                                                                   // 4400
    var M = months;                                                                                                  // 4401
    var D = days;                                                                                                    // 4402
    var h = hours;                                                                                                   // 4403
    var m = minutes;                                                                                                 // 4404
    var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';                                                 // 4405
    var total = this.asSeconds();                                                                                    // 4406
                                                                                                                     // 4407
    if (!total) {                                                                                                    // 4408
        // this is the same as C#'s (Noda) and python (isodate)...                                                   // 4409
        // but not other JS (goog.date)                                                                              // 4410
        return 'P0D';                                                                                                // 4411
    }                                                                                                                // 4412
                                                                                                                     // 4413
    var totalSign = total < 0 ? '-' : '';                                                                            // 4414
    var ymSign = sign(this._months) !== sign(total) ? '-' : '';                                                      // 4415
    var daysSign = sign(this._days) !== sign(total) ? '-' : '';                                                      // 4416
    var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';                                               // 4417
                                                                                                                     // 4418
    return totalSign + 'P' +                                                                                         // 4419
        (Y ? ymSign + Y + 'Y' : '') +                                                                                // 4420
        (M ? ymSign + M + 'M' : '') +                                                                                // 4421
        (D ? daysSign + D + 'D' : '') +                                                                              // 4422
        ((h || m || s) ? 'T' : '') +                                                                                 // 4423
        (h ? hmsSign + h + 'H' : '') +                                                                               // 4424
        (m ? hmsSign + m + 'M' : '') +                                                                               // 4425
        (s ? hmsSign + s + 'S' : '');                                                                                // 4426
}                                                                                                                    // 4427
                                                                                                                     // 4428
var proto$2 = Duration.prototype;                                                                                    // 4429
                                                                                                                     // 4430
proto$2.isValid        = isValid$1;                                                                                  // 4431
proto$2.abs            = abs;                                                                                        // 4432
proto$2.add            = add$1;                                                                                      // 4433
proto$2.subtract       = subtract$1;                                                                                 // 4434
proto$2.as             = as;                                                                                         // 4435
proto$2.asMilliseconds = asMilliseconds;                                                                             // 4436
proto$2.asSeconds      = asSeconds;                                                                                  // 4437
proto$2.asMinutes      = asMinutes;                                                                                  // 4438
proto$2.asHours        = asHours;                                                                                    // 4439
proto$2.asDays         = asDays;                                                                                     // 4440
proto$2.asWeeks        = asWeeks;                                                                                    // 4441
proto$2.asMonths       = asMonths;                                                                                   // 4442
proto$2.asYears        = asYears;                                                                                    // 4443
proto$2.valueOf        = valueOf$1;                                                                                  // 4444
proto$2._bubble        = bubble;                                                                                     // 4445
proto$2.clone          = clone$1;                                                                                    // 4446
proto$2.get            = get$2;                                                                                      // 4447
proto$2.milliseconds   = milliseconds;                                                                               // 4448
proto$2.seconds        = seconds;                                                                                    // 4449
proto$2.minutes        = minutes;                                                                                    // 4450
proto$2.hours          = hours;                                                                                      // 4451
proto$2.days           = days;                                                                                       // 4452
proto$2.weeks          = weeks;                                                                                      // 4453
proto$2.months         = months;                                                                                     // 4454
proto$2.years          = years;                                                                                      // 4455
proto$2.humanize       = humanize;                                                                                   // 4456
proto$2.toISOString    = toISOString$1;                                                                              // 4457
proto$2.toString       = toISOString$1;                                                                              // 4458
proto$2.toJSON         = toISOString$1;                                                                              // 4459
proto$2.locale         = locale;                                                                                     // 4460
proto$2.localeData     = localeData;                                                                                 // 4461
                                                                                                                     // 4462
// Deprecations                                                                                                      // 4463
proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
proto$2.lang = lang;                                                                                                 // 4465
                                                                                                                     // 4466
// Side effect imports                                                                                               // 4467
                                                                                                                     // 4468
// FORMATTING                                                                                                        // 4469
                                                                                                                     // 4470
addFormatToken('X', 0, 0, 'unix');                                                                                   // 4471
addFormatToken('x', 0, 0, 'valueOf');                                                                                // 4472
                                                                                                                     // 4473
// PARSING                                                                                                           // 4474
                                                                                                                     // 4475
addRegexToken('x', matchSigned);                                                                                     // 4476
addRegexToken('X', matchTimestamp);                                                                                  // 4477
addParseToken('X', function (input, array, config) {                                                                 // 4478
    config._d = new Date(parseFloat(input, 10) * 1000);                                                              // 4479
});                                                                                                                  // 4480
addParseToken('x', function (input, array, config) {                                                                 // 4481
    config._d = new Date(toInt(input));                                                                              // 4482
});                                                                                                                  // 4483
                                                                                                                     // 4484
// Side effect imports                                                                                               // 4485
                                                                                                                     // 4486
                                                                                                                     // 4487
hooks.version = '2.20.1';                                                                                            // 4488
                                                                                                                     // 4489
setHookCallback(createLocal);                                                                                        // 4490
                                                                                                                     // 4491
hooks.fn                    = proto;                                                                                 // 4492
hooks.min                   = min;                                                                                   // 4493
hooks.max                   = max;                                                                                   // 4494
hooks.now                   = now;                                                                                   // 4495
hooks.utc                   = createUTC;                                                                             // 4496
hooks.unix                  = createUnix;                                                                            // 4497
hooks.months                = listMonths;                                                                            // 4498
hooks.isDate                = isDate;                                                                                // 4499
hooks.locale                = getSetGlobalLocale;                                                                    // 4500
hooks.invalid               = createInvalid;                                                                         // 4501
hooks.duration              = createDuration;                                                                        // 4502
hooks.isMoment              = isMoment;                                                                              // 4503
hooks.weekdays              = listWeekdays;                                                                          // 4504
hooks.parseZone             = createInZone;                                                                          // 4505
hooks.localeData            = getLocale;                                                                             // 4506
hooks.isDuration            = isDuration;                                                                            // 4507
hooks.monthsShort           = listMonthsShort;                                                                       // 4508
hooks.weekdaysMin           = listWeekdaysMin;                                                                       // 4509
hooks.defineLocale          = defineLocale;                                                                          // 4510
hooks.updateLocale          = updateLocale;                                                                          // 4511
hooks.locales               = listLocales;                                                                           // 4512
hooks.weekdaysShort         = listWeekdaysShort;                                                                     // 4513
hooks.normalizeUnits        = normalizeUnits;                                                                        // 4514
hooks.relativeTimeRounding  = getSetRelativeTimeRounding;                                                            // 4515
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;                                                           // 4516
hooks.calendarFormat        = getCalendarFormat;                                                                     // 4517
hooks.prototype             = proto;                                                                                 // 4518
                                                                                                                     // 4519
// currently HTML5 input type only supports 24-hour formats                                                          // 4520
hooks.HTML5_FMT = {                                                                                                  // 4521
    DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',             // <input type="datetime-local" />                               // 4522
    DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',  // <input type="datetime-local" step="1" />                      // 4523
    DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',   // <input type="datetime-local" step="0.001" />                  // 4524
    DATE: 'YYYY-MM-DD',                             // <input type="date" />                                         // 4525
    TIME: 'HH:mm',                                  // <input type="time" />                                         // 4526
    TIME_SECONDS: 'HH:mm:ss',                       // <input type="time" step="1" />                                // 4527
    TIME_MS: 'HH:mm:ss.SSS',                        // <input type="time" step="0.001" />                            // 4528
    WEEK: 'YYYY-[W]WW',                             // <input type="week" />                                         // 4529
    MONTH: 'YYYY-MM'                                // <input type="month" />                                        // 4530
};                                                                                                                   // 4531
                                                                                                                     // 4532
return hooks;                                                                                                        // 4533
                                                                                                                     // 4534
})));                                                                                                                // 4535
                                                                                                                     // 4536
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/momentjs_moment/export.js                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// moment.js makes `moment` global on the window (or global) object, while Meteor expects a file-scoped global variable
moment = this.moment;                                                                                                // 2
try {                                                                                                                // 3
    delete this.moment;                                                                                              // 4
} catch (e) {                                                                                                        // 5
}                                                                                                                    // 6
                                                                                                                     // 7
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['momentjs:moment'] = {}, {
  moment: moment
});

})();
