"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    getMany(where) {
        return this.delegate.findMany({ where });
    }
    getOne(where) {
        return this.delegate.findFirst({ where });
    }
    create(data) {
        return this.delegate.create({ data });
    }
    update(id, data) {
        return this.delegate.update({ data, where: { id } });
    }
    delete(id) {
        return this.delegate.delete({ where: { id } });
    }
}
exports.BaseRepository = BaseRepository;
