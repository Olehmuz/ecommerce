"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const base_controller_1 = require("../core/common/base.controller");
class AuthController extends base_controller_1.BaseController {
    constructor(prefix, loggerService) {
        super(prefix, loggerService);
        this.prefix = prefix;
        this.loggerService = loggerService;
        this.bindRoutes([
            {
                path: '/sayHi',
                func: this.hi,
                method: 'get'
            },
            {
                path: '/foo',
                func: this.foo,
                method: 'post'
            }
        ], prefix);
    }
    hi(req, res, next) {
        console.log(req.body);
        // throw new HttpError(404, 'Method not implemented.')
        this.ok(res, req.body);
    }
    foo(req, res, next) {
        this.ok(res, 'foo');
    }
}
exports.AuthController = AuthController;
