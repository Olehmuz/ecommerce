"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const client_1 = require("@prisma/client");
class DatabaseService {
    constructor(logger) {
        this.logger = logger;
        const prisma = new client_1.PrismaClient();
        this.client = prisma;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.$connect();
                this.logger.info('[DATABASE SERVICE] client is connected.');
            }
            catch (e) {
                if (e instanceof Error) {
                    this.logger.error(`[DATABASE SERVICE] client isn't connected. Error: ${e.message}`);
                }
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.$disconnect();
            this.logger.info('[DATABASE SERVICE] client is disconnected.');
        });
    }
}
exports.DatabaseService = DatabaseService;
