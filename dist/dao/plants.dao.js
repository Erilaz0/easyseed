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
exports.plantsDao = void 0;
const plantsModel = require("../dao/models/plants.model");
class plantsDao {
    constructor() { }
    createPlant(newPlant) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield plantsModel.create(newPlant);
        });
    }
    getPlants() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield plantsModel.find({}).lean();
        });
    }
    getPlantById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield plantsModel.find({ _id: id });
        });
    }
    plantByQuery(query, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield plantsModel.paginate(query, page, limit);
        });
    }
    putPlants(id, plant) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield plantsModel.updateOne({ _id: id }, plant);
        });
    }
    deletePlant(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield plantsModel.deleteOne({ _id: id });
        });
    }
    plantPaginate(page) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield plantsModel.paginate({}, { page: page, limit: 10, lean: true });
        });
    }
    sortPlants(sort) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield plantsModel.aggregate([{ $sort: { price: sort } }]);
        });
    }
    plantsByPrice(price, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                page: page,
                limit: 10,
                lean: true
            };
            const query = {
                price: { $lt: price }
            };
            return yield plantsModel.paginate(query, options);
        });
    }
}
exports.plantsDao = plantsDao;
