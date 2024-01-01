"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = require("dotenv");
class ConfigService {
    constructor(loggerService) {
        this.loggerService = loggerService;
        const { error, parsed } = (0, dotenv_1.config)({ path: path_1.default.resolve('.env') });
        if (error instanceof Error)
            throw new Error('[CONFIG SERVICE] .env is required');
        if (!parsed)
            throw new Error('[CONFIG SERVICE] .env is empty');
        this.config = parsed;
        this.loggerService.info('[CONFIG SERVICE] initialize config service');
    }
    get(key) {
        const result = this.config[key];
        if (!result)
            throw new Error('[CONFIG SERVICE] The key doesn\'t exist');
        return result;
    }
}
exports.ConfigService = ConfigService;
