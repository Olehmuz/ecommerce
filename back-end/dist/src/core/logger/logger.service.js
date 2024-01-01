"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const pino_1 = __importDefault(require("pino"));
class LoggerService {
    constructor() {
        var _a;
        this.logger = (0, pino_1.default)({
            level: (_a = process.env.PINO_LOG_LEVEL) !== null && _a !== void 0 ? _a : 'info',
            timestamp: pino_1.default.stdTimeFunctions.isoTime
        });
    }
    info(message) {
        this.logger.info(message);
    }
    error(message) {
        this.logger.error(message);
    }
    warn(message) {
        this.logger.warn(message);
    }
}
exports.LoggerService = LoggerService;
