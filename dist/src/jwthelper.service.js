"use strict";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// tslint:disable:no-bitwise
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var jwtoptions_token_1 = require("./jwtoptions.token");
var JwtHelperService = /** @class */ (function () {
    function JwtHelperService(config) {
        if (config === void 0) { config = null; }
        this.tokenGetter = config && config.tokenGetter || function () { };
    }
    /**
     * @param {?} str
     * @return {?}
     */
    JwtHelperService.prototype.urlBase64Decode = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        /** @type {?} */
        var output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0: {
                break;
            }
            case 2: {
                output += '==';
                break;
            }
            case 3: {
                output += '=';
                break;
            }
            default: {
                throw 'Illegal base64url string!';
            }
        }
        return this.b64DecodeUnicode(output);
    };
    /**
     * @param {?} str
     * @return {?}
     */
    JwtHelperService.prototype.b64decode = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        /** @type {?} */
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        /** @type {?} */
        var output = '';
        str = String(str).replace(/=+$/, '');
        if (str.length % 4 === 1) {
            throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
        }
        for (
        // initialize result and counters
        var bc = 0, bs = void 0, buffer = void 0, idx = 0; 
        // get next character
        (buffer = str.charAt(idx++)); 
        // character found in table? initialize bit storage and add its ascii value;
        ~buffer &&
            ((bs = bc % 4 ? bs * 64 + buffer : buffer),
                // and if not first of each 4 characters,
                // convert the first 8 bits to one ascii character
                bc++ % 4)
            ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
            : 0) {
            // try to find character in table (0-63, not found => -1)
            buffer = chars.indexOf(buffer);
        }
        return output;
    };
    /**
     * @param {?} str
     * @return {?}
     */
    JwtHelperService.prototype.b64DecodeUnicode = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return decodeURIComponent(Array.prototype.map
            .call(this.b64decode(str), function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
            .join(''));
    };
    /**
     * @param {?=} token
     * @return {?}
     */
    JwtHelperService.prototype.decodeToken = /**
     * @param {?=} token
     * @return {?}
     */
    function (token) {
        if (token === void 0) { token = this.tokenGetter(); }
        if (token === null) {
            return null;
        }
        /** @type {?} */
        var parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('The inspected token doesn\'t appear to be a JWT. Check to make sure it has three parts and see https://jwt.io for more.');
        }
        /** @type {?} */
        var decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error('Cannot decode the token.');
        }
        return JSON.parse(decoded);
    };
    /**
     * @param {?=} token
     * @return {?}
     */
    JwtHelperService.prototype.getTokenExpirationDate = /**
     * @param {?=} token
     * @return {?}
     */
    function (token) {
        if (token === void 0) { token = this.tokenGetter(); }
        /** @type {?} */
        var decoded;
        decoded = this.decodeToken(token);
        if (!decoded.hasOwnProperty('exp')) {
            return null;
        }
        /** @type {?} */
        var date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    };
    /**
     * @param {?=} token
     * @param {?=} offsetSeconds
     * @return {?}
     */
    JwtHelperService.prototype.isTokenExpired = /**
     * @param {?=} token
     * @param {?=} offsetSeconds
     * @return {?}
     */
    function (token, offsetSeconds) {
        if (token === void 0) { token = this.tokenGetter(); }
        if (token === null || token === '') {
            return true;
        }
        /** @type {?} */
        var date = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;
        if (date === null) {
            return true;
        }
        return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
    };
    JwtHelperService.decorators = [
        { type: core_1.Injectable }
    ];
    /** @nocollapse */
    JwtHelperService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Inject, args: [jwtoptions_token_1.JWT_OPTIONS,] }] }
    ]; };
    return JwtHelperService;
}());
exports.JwtHelperService = JwtHelperService;
if (false) {
    /** @type {?} */
    JwtHelperService.prototype.tokenGetter;
}
