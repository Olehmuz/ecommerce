"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const brandi_1 = require("brandi");
const auth_module_1 = require("../../auth/auth.module");
const app_1 = require("../app");
const database_service_1 = require("../common/database/database.service");
const exception_filter_1 = require("../common/errors/exception-filter");
const config_service_1 = require("../config/config.service");
const logger_service_1 = require("../logger/logger.service");
const tokens_1 = require("./tokens");
exports.container = new brandi_1.Container();
// Auth module dependencies
exports.container.use(tokens_1.TOKENS.authController).from(auth_module_1.AuthModule);
// Core dependencies
exports.container.bind(tokens_1.TOKENS.app).toInstance(app_1.App).inSingletonScope();
exports.container.bind(tokens_1.TOKENS.loggerService).toInstance(logger_service_1.LoggerService).inSingletonScope();
exports.container.bind(tokens_1.TOKENS.configService).toInstance(config_service_1.ConfigService).inSingletonScope();
exports.container.bind(tokens_1.TOKENS.exceptionFilter).toInstance(exception_filter_1.ExceptionFilter).inSingletonScope();
exports.container.bind(tokens_1.TOKENS.databaseService).toInstance(database_service_1.DatabaseService).inSingletonScope();
(0, brandi_1.injected)(config_service_1.ConfigService, tokens_1.TOKENS.loggerService);
(0, brandi_1.injected)(exception_filter_1.ExceptionFilter, tokens_1.TOKENS.loggerService);
(0, brandi_1.injected)(database_service_1.DatabaseService, tokens_1.TOKENS.loggerService);
(0, brandi_1.injected)(app_1.App, tokens_1.TOKENS.loggerService, tokens_1.TOKENS.configService, tokens_1.TOKENS.authController, tokens_1.TOKENS.exceptionFilter, tokens_1.TOKENS.databaseService);
