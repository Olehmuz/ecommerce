"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKENS = void 0;
const brandi_1 = require("brandi");
exports.TOKENS = {
    app: (0, brandi_1.token)('app'),
    loggerService: (0, brandi_1.token)('loggerService'),
    configService: (0, brandi_1.token)('configService'),
    authController: (0, brandi_1.token)('authController'),
    authPrefix: (0, brandi_1.token)('authPrefix'),
    exceptionFilter: (0, brandi_1.token)('exception'),
    databaseService: (0, brandi_1.token)('databaseService'),
    categoriesPrefix: (0, brandi_1.token)('categoriesPrefix'),
    categoriesRepository: (0, brandi_1.token)('categoriesRepository'),
    categoriesController: (0, brandi_1.token)('categoriesController'),
    categoriesService: (0, brandi_1.token)('categoriesService'),
    brandsPrefix: (0, brandi_1.token)('brandsPrefix'),
    brandsRepository: (0, brandi_1.token)('brandsRepository'),
    brandsController: (0, brandi_1.token)('brandsController'),
    brandsService: (0, brandi_1.token)('brandsService')
};
