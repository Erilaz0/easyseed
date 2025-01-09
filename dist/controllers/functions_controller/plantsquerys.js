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
exports.handleSpecies = handleSpecies;
exports.handleLight = handleLight;
exports.handleSort = handleSort;
exports.handlePrice = handlePrice;
exports.handlePagination = handlePagination;
exports.handleWater = handleWater;
const plants_service_1 = require("../../services/plants.service");
function handleSpecies(log, species, res, page, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        log.debug(`Looking for species : ${species}`);
        let query = { species: species };
        const getBySpecies = yield plants_service_1.plantsService.plantByQuery(query, page, limit);
        if (!getBySpecies || getBySpecies.length === 0) {
            log.debug("Cannot get species");
            res.status(400).json({ error: `Cannot get plant by species: ${species} ` });
        }
        else {
            log.debug("Species founded");
            res.status(200).send(getBySpecies);
        }
    });
}
function handleLight(log, light, res, page, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        log.debug(`Getting plants with ${light}`);
        let query = { light: light };
        const getByLight = yield plants_service_1.plantsService.plantByQuery(query, page, limit);
        if (!getByLight || getByLight.length === 0) {
            log.debug(`Invalid type of light`);
            res.status(400).json({ error: `Invalid type of light` });
        }
        else {
            log.debug(`Sending plants with ${light} light`);
            res.status(200).send(getByLight);
        }
    });
}
function handleSort(sort, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sortPlants = yield plants_service_1.plantsService.sortPlants(sort);
        if (!sortPlants) {
            res.status(400).json({ error: "Cannot get plants by price" });
        }
        else {
            res.status(200).send(sortPlants);
        }
    });
}
function handlePagination(page, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const plantsPaginate = yield plants_service_1.plantsService.plantPaginate(page);
        if (!plantsPaginate) {
            res.status(400).json({ error: "Cannot get plants by price" });
        }
        else {
            res.status(200).send(plantsPaginate);
        }
    });
}
function handleWater(water, page, limit, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = { water: water };
        const plantsByWater = yield plants_service_1.plantsService.plantByQuery(query, page, limit);
        if (!plantsByWater) {
            res.status(400).json({ error: "Cannot get plants by price" });
        }
        else {
            res.status(200).send(plantsByWater);
        }
    });
}
function handlePrice(price, page, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const plantsByPrice = yield plants_service_1.plantsService.plantsByPrice(price, page);
        if (!plantsByPrice) {
            res.status(400).json({ error: "Cannot get plant by this price" });
        }
        else {
            res.status(200).send(plantsByPrice);
        }
    });
}
