"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
    JwtInterceptor.prototype.isWhitelistedDomain = function (request) {
        var requestUrl = url_1.parse(request.url, false, true);
        var requestHost = requestUrl.host || (typeof location === 'object' && location.host);
        return (requestHost === undefined ||
            this.whitelistedDomains.findIndex(function (domain) {
                return typeof domain === 'string'
                    ? domain === requestHost
                    : domain instanceof RegExp
                        ? domain.test(requestHost)
                        : false;
            }) > -1);
    };
    JwtInterceptor.prototype.isBlacklistedRoute = function (request) {
        var url = request.url;
        return (this.blacklistedRoutes.findIndex(function (route) {
            return typeof route === 'string'
                ? route === url
                : route instanceof RegExp
                    ? route.test(url)
                    : false;
        }) > -1);
    };
    JwtInterceptor.prototype.handleInterception = function (token, request, next) {
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
        var _a;
    };
    JwtInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        var token = this.tokenGetter();
        if (token instanceof Promise) {
            return from_1.from(token).pipe(operators_1.mergeMap(function (asyncToken) {
                // @ts-ignore
                return _this.handleInterception(asyncToken, request, next);
            }));
        }
        else {
            return this.handleInterception(token, request, next);
        }
    };
    JwtInterceptor = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(jwtoptions_token_1.JWT_OPTIONS)),
        __metadata("design:paramtypes", [Object, jwthelper_service_1.JwtHelperService])
    ], JwtInterceptor);
    return JwtInterceptor;
}());
exports.JwtInterceptor = JwtInterceptor;
