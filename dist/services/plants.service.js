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
exports.plantsService = void 0;
const plants_dao_1 = require("../dao/plants.dao");
class plantService {
    constructor(dao) {
        this.dao = dao;
    }
    createPlant(newPlant) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dao.createPlant(newPlant);
        });
    }
    getPlants() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dao.getPlants();
        });
    }
    getPlantById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dao.getPlantById(id);
        });
    }
    plantByQuery(query, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dao.plantByQuery(query, page, limit);
        });
    }
    putPlants(id, plant) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dao.putPlants(id, plant);
        });
    }
    deletePlant(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dao.deletePlant(id);
        });
    }
    plantPaginate(page) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dao.plantPaginate(page);
        });
    }
    sortPlants(sort) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dao.sortPlants(sort);
        });
    }
    plantsByPrice(price, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dao.plantsByPrice(price, page);
        });
    }
}
const daoPlants = new plants_dao_1.plantsDao();
const plantsService = new plantService(daoPlants);
exports.plantsService = plantsService;
