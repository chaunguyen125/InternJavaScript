"use strict";
// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/authentication-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTAuthenticationComponent = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const core_1 = require("@loopback/core");
const keys_1 = require("./keys");
const repositories_1 = require("./repositories");
const user_service_1 = require("./services/user.service");
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const jwt_service_1 = require("./services/jwt.service");
// import {SecuritySpecEnhancer} from './services/security.spec.enhancer';
let JWTAuthenticationComponent = class JWTAuthenticationComponent {
    constructor(app) {
        this.bindings = [
            // token bindings
            core_1.Binding.bind(keys_1.TokenServiceBindings.TOKEN_SECRET).to(keys_1.TokenServiceConstants.TOKEN_SECRET_VALUE),
            core_1.Binding.bind(keys_1.TokenServiceBindings.TOKEN_EXPIRES_IN).to(keys_1.TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE),
            core_1.Binding.bind(keys_1.TokenServiceBindings.TOKEN_SERVICE).toClass(jwt_service_1.JWTService),
            // user bindings
            core_1.Binding.bind(keys_1.UserServiceBindings.USER_SERVICE).toClass(user_service_1.MyUserService),
            core_1.Binding.bind(keys_1.UserServiceBindings.USER_REPOSITORY).toClass(repositories_1.UserRepository),
            core_1.Binding.bind(keys_1.UserServiceBindings.USER_CREDENTIALS_REPOSITORY).toClass(repositories_1.UserCredentialsRepository),
            (0, core_1.createBindingFromClass)(authentication_jwt_1.SecuritySpecEnhancer),
            ///refresh bindings
            core_1.Binding.bind(keys_1.RefreshTokenServiceBindings.REFRESH_TOKEN_SERVICE).toClass(authentication_jwt_1.RefreshtokenService),
            //  Refresh token bindings
            core_1.Binding.bind(keys_1.RefreshTokenServiceBindings.REFRESH_SECRET).to(keys_1.RefreshTokenConstants.REFRESH_SECRET_VALUE),
            core_1.Binding.bind(keys_1.RefreshTokenServiceBindings.REFRESH_EXPIRES_IN).to(keys_1.RefreshTokenConstants.REFRESH_EXPIRES_IN_VALUE),
            core_1.Binding.bind(keys_1.RefreshTokenServiceBindings.REFRESH_ISSUER).to(keys_1.RefreshTokenConstants.REFRESH_ISSUER_VALUE),
            //refresh token repository binding
            core_1.Binding.bind(keys_1.RefreshTokenServiceBindings.REFRESH_REPOSITORY).toClass(authentication_jwt_1.RefreshTokenRepository),
        ];
        (0, authentication_1.registerAuthenticationStrategy)(app, authentication_jwt_1.JWTAuthenticationStrategy);
    }
};
JWTAuthenticationComponent = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)(core_1.CoreBindings.APPLICATION_INSTANCE)),
    tslib_1.__metadata("design:paramtypes", [core_1.Application])
], JWTAuthenticationComponent);
exports.JWTAuthenticationComponent = JWTAuthenticationComponent;
//# sourceMappingURL=jwt-authentication-component.js.map