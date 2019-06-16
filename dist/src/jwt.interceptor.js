"use strict";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var jwthelper_service_1 = require("./jwthelper.service");
var jwtoptions_token_1 = require("./jwtoptions.token");
var from_1 = require("rxjs/internal/observable/from");
var operators_1 = require("rxjs/operators");
var url_1 = require("url");
var JwtInterceptor = /** @class */ (function () {
    function JwtInterceptor(config, jwtHelper) {
        this.jwtHelper = jwtHelper;
        this.tokenGetter = config.tokenGetter;
        this.headerName = config.headerName || 'Authorization';
        this.authScheme =
            config.authScheme || config.authScheme === ''
                ? config.authScheme
                : 'Bearer ';
        this.whitelistedDomains = config.whitelistedDomains || [];
        this.blacklistedRoutes = config.blacklistedRoutes || [];
        this.throwNoTokenError = config.throwNoTokenError || false;
        this.skipWhenExpired = config.skipWhenExpired;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    JwtInterceptor.prototype.isWhitelistedDomain = /**
     * @param {?} request
     * @return {?}
     */
    function (request) {
        /** @type {?} */
        var requestUrl = url_1.parse(request.url, false, true);
        /** @type {?} */
        var requestHost = requestUrl.host || (typeof location === 'object' && location.host);
        return (requestHost === undefined ||
            this.whitelistedDomains.findIndex((/**
             * @param {?} domain
             * @return {?}
             */
            function (domain) {
                return typeof domain === 'string'
                    ? domain === requestHost
                    : domain instanceof RegExp
                        ? domain.test(requestHost)
                        : false;
            })) > -1);
    };
    /**
     * @param {?} request
     * @return {?}
     */
    JwtInterceptor.prototype.isBlacklistedRoute = /**
     * @param {?} request
     * @return {?}
     */
    function (request) {
        /** @type {?} */
        var url = request.url;
        return (this.blacklistedRoutes.findIndex((/**
         * @param {?} route
         * @return {?}
         */
        function (route) {
            return typeof route === 'string'
                ? route === url
                : route instanceof RegExp
                    ? route.test(url)
                    : false;
        })) > -1);
    };
    /**
     * @param {?} token
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    JwtInterceptor.prototype.handleInterception = /**
     * @param {?} token
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    function (token, request, next) {
        var _a;
        /** @type {?} */
        var tokenIsExpired = false;
        if (!token && this.throwNoTokenError) {
            throw new Error('Could not get token from tokenGetter function.');
        }
        if (this.skipWhenExpired) {
            tokenIsExpired = token ? this.jwtHelper.isTokenExpired(token) : true;
        }
        if (token && tokenIsExpired && this.skipWhenExpired) {
            request = request.clone();
        }
        else if (token &&
            this.isWhitelistedDomain(request) &&
            !this.isBlacklistedRoute(request)) {
            request = request.clone({
                setHeaders: (_a = {},
                    _a[this.headerName] = "" + this.authScheme + token,
                    _a)
            });
        }
        return next.handle(request);
    };
    /**
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    JwtInterceptor.prototype.intercept = /**
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    function (request, next) {
        var _this = this;
        /** @type {?} */
        var token = this.tokenGetter();
        if (token instanceof Promise) {
            return from_1.from(token).pipe(operators_1.mergeMap((/**
             * @param {?} asyncToken
             * @return {?}
             */
            function (asyncToken) {
                // @ts-ignore
                return _this.handleInterception(asyncToken, request, next);
            })));
        }
        else {
            return this.handleInterception(token, request, next);
        }
    };
    JwtInterceptor.decorators = [
        { type: core_1.Injectable }
    ];
    /** @nocollapse */
    JwtInterceptor.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Inject, args: [jwtoptions_token_1.JWT_OPTIONS,] }] },
        { type: jwthelper_service_1.JwtHelperService }
    ]; };
    return JwtInterceptor;
}());
exports.JwtInterceptor = JwtInterceptor;
if (false) {
    /** @type {?} */
    JwtInterceptor.prototype.tokenGetter;
    /** @type {?} */
    JwtInterceptor.prototype.headerName;
    /** @type {?} */
    JwtInterceptor.prototype.authScheme;
    /** @type {?} */
    JwtInterceptor.prototype.whitelistedDomains;
    /** @type {?} */
    JwtInterceptor.prototype.blacklistedRoutes;
    /** @type {?} */
    JwtInterceptor.prototype.throwNoTokenError;
    /** @type {?} */
    JwtInterceptor.prototype.skipWhenExpired;
    /** @type {?} */
    JwtInterceptor.prototype.jwtHelper;
}
