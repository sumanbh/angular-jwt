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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var jwt_interceptor_1 = require("./src/jwt.interceptor");
var jwthelper_service_1 = require("./src/jwthelper.service");
var http_1 = require("@angular/common/http");
var jwtoptions_token_1 = require("./src/jwtoptions.token");
__export(require("./src/jwt.interceptor"));
__export(require("./src/jwthelper.service"));
__export(require("./src/jwtoptions.token"));
var JwtModule = /** @class */ (function () {
    function JwtModule(parentModule) {
        if (parentModule) {
            throw new Error('JwtModule is already loaded. It should only be imported in your application\'s main module.');
        }
    }
    JwtModule_1 = JwtModule;
    JwtModule.forRoot = function (options) {
        return {
            ngModule: JwtModule_1,
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
    JwtModule = JwtModule_1 = __decorate([
        core_1.NgModule(),
        __param(0, core_1.Optional()), __param(0, core_1.SkipSelf()),
        __metadata("design:paramtypes", [JwtModule])
    ], JwtModule);
    return JwtModule;
    var JwtModule_1;
}());
exports.JwtModule = JwtModule;
