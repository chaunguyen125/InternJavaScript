"use strict";
// Copyright IBM Corp. and LoopBack contributors 2018,2020. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListApplication = void 0;
const tslib_1 = require("tslib");
// import {AuthenticationComponent} from '@loopback/authentication';
// import {
//   JWTAuthenticationComponent,
//   SECURITY_SCHEME_SPEC,
//   UserServiceBindings,
// } from '@loopback/authentication-jwt';
// import {DbDataSource} from './datasources';
// import {BootMixin} from '@loopback/boot';
// import {ApplicationConfig} from '@loopback/core';
// import {RepositoryMixin} from '@loopback/repository';
// import {Request, Response, RestApplication} from '@loopback/rest';
// import {
//   RestExplorerBindings,
//   RestExplorerComponent,
// } from '@loopback/rest-explorer';
// import {ServiceMixin} from '@loopback/service-proxy';
// import morgan from 'morgan';
// import path from 'path';
// import {MySequence} from './sequence';
// export {ApplicationConfig};
// export class TodoListApplication extends BootMixin(
//   ServiceMixin(RepositoryMixin(RestApplication)),
// ) {
//   constructor(options: ApplicationConfig = {}) {
//     super(options);
//     // Set up the custom sequence
//     this.sequence(MySequence);
//     // Set up default home page
//     this.static('/', path.join(__dirname, '../public'));
//     // Customize @loopback/rest-explorer configuration here
//     this.configure(RestExplorerBindings.COMPONENT).to({
//       path: '/explorer',
//     });
//     this.component(RestExplorerComponent);
//     this.projectRoot = __dirname;
//     // Customize @loopback/boot Booter Conventions here
//     this.bootOptions = {
//       controllers: {
//         // Customize ControllerBooter Conventions here
//         dirs: ['controllers'],
//         extensions: ['.controller.js'],
//         nested: true,
//       },
//     };
//     this.setupLogging();
//   }
//   private setupLogging() {
//     // Register `morgan` express middleware
//     // Create a middleware factory wrapper for `morgan(format, options)`
//     const morganFactory = (config?: morgan.Options<Request, Response>) => {
//       this.debug('Morgan configuration', config);
//       return morgan('combined', config);
//     };
//     // Print out logs using `debug`
//     const defaultConfig: morgan.Options<Request, Response> = {
//       stream: {
//         write: str => {
//           this._debug(str);
//         },
//       },
//     };
//     this.expressMiddleware(morganFactory, defaultConfig, {
//       injectConfiguration: 'watch',
//       key: 'middleware.morgan',
//     });
//   }
// }
// console.log('abc')
const authentication_1 = require("@loopback/authentication");
const jwt_authentication_component_1 = require("./jwt-authentication-component");
const boot_1 = require("@loopback/boot");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const rest_explorer_1 = require("@loopback/rest-explorer");
const service_proxy_1 = require("@loopback/service-proxy");
const path_1 = tslib_1.__importDefault(require("path"));
const datasources_1 = require("./datasources");
const sequence_1 = require("./sequence");
const keys_1 = require("./keys");
const authorization_1 = require("@loopback/authorization");
class TodoListApplication extends (0, boot_1.BootMixin)((0, service_proxy_1.ServiceMixin)((0, repository_1.RepositoryMixin)(rest_1.RestApplication))) {
    constructor(options = {}) {
        super(options);
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        // Set up default home page
        this.static('/', path_1.default.join(__dirname, '../public'));
        // Customize @loopback/rest-explorer configuration here
        this.configure(rest_explorer_1.RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });
        this.component(rest_explorer_1.RestExplorerComponent);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
        this.component(authentication_1.AuthenticationComponent);
        // Mount jwt component
        this.component(jwt_authentication_component_1.JWTAuthenticationComponent);
        this.component(authorization_1.AuthorizationComponent);
        // Bind datasource
        this.dataSource(datasources_1.DbDataSource, keys_1.UserServiceBindings.DATASOURCE_NAME);
        //Authorize
    }
}
exports.TodoListApplication = TodoListApplication;
//# sourceMappingURL=application.js.map