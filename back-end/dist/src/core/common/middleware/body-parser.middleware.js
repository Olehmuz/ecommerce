"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyParserMiddleware = void 0;
const body_parser_1 = require("body-parser");
class BodyParserMiddleware {
    constructor() {
        this.execute = (0, body_parser_1.json)();
    }
}
exports.BodyParserMiddleware = BodyParserMiddleware;
