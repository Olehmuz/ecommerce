"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionFilter = void 0;
const http_error_1 = require("./http.error");
class ExceptionFilter {
    constructor(logger) {
        this.logger = logger;
    }
    catch(err, req, res, next) {
        if (err instanceof http_error_1.HttpError) {
            this.logger.error(`[EXCEPTION] code: ${err.code}, message: ${err.message}`);
            res.status(err.code).send({
                err: err.message,
                code: err.code
            });
        }
        else {
            this.logger.error(`[EXCEPTION] message: ${err.message}]`);
            res.status(500).send({
                err: err.message
            });
        }
    }
}
exports.ExceptionFilter = ExceptionFilter;
