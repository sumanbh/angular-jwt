"use strict";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var jwt_interceptor_1 = require("./src/jwt.interceptor");
var jwthelper_service_1 = require("./src/jwthelper.service");
var http_1 = require("@angular/common/http");
var jwtoptions_token_1 = require("./src/jwtoptions.token");
var jwt_interceptor_2 = require("./src/jwt.interceptor");
exports.JwtInterceptor = jwt_interceptor_2.JwtInterceptor;
var jwthelper_service_2 = require("./src/jwthelper.service");
exports.JwtHelperService = jwthelper_service_2.JwtHelperService;
var jwtoptions_token_2 = require("./src/jwtoptions.token");
exports.JWT_OPTIONS = jwtoptions_token_2.JWT_OPTIONS;
/**
 * @record
 */
function JwtModuleOptions() { }
exports.JwtModuleOptions = JwtModuleOptions;
/** @type {?|undefined} */
JwtModuleOptions.prototype.jwtOptionsProvider;
/** @type {?|undefined} */
JwtModuleOptions.prototype.config;
var JwtModule = /** @class */ (function () {
    function JwtModule(parentModule) {
        if (parentModule) {
            throw new Error('JwtModule is already loaded. It should only be imported in your application\'s main module.');
        }
    }
    /**
     * @param {?} options
     * @return {?}
     */
    JwtModule.forRoot = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        return {
            ngModule: JwtModule,
            providers: [
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: jwt_interceptor_1.JwtInterceptor,
                    multi: true
                },
                options.jwtOptionsProvider ||
                    {
                        provide: jwtoptions_token_1.JWT_OPTIONS,
                        useValue: options.config
                    },
                jwthelper_service_1.JwtHelperService
            ]
        };
    };
    JwtModule.decorators = [
        { type: core_1.NgModule }
    ];
    /** @nocollapse */
    JwtModule.ctorParameters = function () { return [
        { type: JwtModule, decorators: [{ type: core_1.Optional }, { type: core_1.SkipSelf }] }
    ]; };
    return JwtModule;
}());
exports.JwtModule = JwtModule;
