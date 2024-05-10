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
exports.deletePlant = exports.putPlants = exports.getPlantById = exports.postPlants = exports.getPlants = void 0;
const plants_service_1 = require("../services/plants.service");
const Validator_1 = require("../validators/Validator");
const utils_1 = require("../utils");
const plantsquerys_1 = require("./functions_controller/plantsquerys");
function getPlants(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("plaaaaants");
        console.log(req.path);
        const log = req.logger;
        const species = req.query.species;
        const light = req.query.light;
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        let sort = parseInt(req.query.sort);
        let price = parseInt(req.query.price);
        let water = req.query.water;
        if (species && typeof species === "string" && page && typeof page === "number" && limit && typeof limit === "number") {
            (0, plantsquerys_1.handleSpecies)(log, species, res, page, limit);
        }
        else if (light && typeof light === "string" && page && typeof page === "number" && limit && typeof limit === "number") {
            (0, plantsquerys_1.handleLight)(log, light, res, page, limit);
        }
        else if (sort && typeof sort === "number") {
            (0, plantsquerys_1.handleSort)(sort, res);
        }
        else if (water && typeof water === "string" && water === "Daily" || water === "Frequently" || water === "Infrequently" && limit) {
            (0, plantsquerys_1.handleWater)(water, page, limit, res);
        }
        else if (price && typeof price === "number") {
            (0, plantsquerys_1.handlePrice)(price, page, res);
        }
        else if (page && typeof page === "number") {
            (0, plantsquerys_1.handlePagination)(page, res);
        }
        else {
            log.debug("Getting all plants from DB");
            const plants = yield plants_service_1.plantsService.getPlants();
            if (!plants) {
                log.debug("Cannot get plants");
                res.status(400).json({ message: "cannot get plants" });
            }
            else {
                log.debug("Sending all plants as JSON data");
                res.status(200).send(plants);
            }
        }
    });
}
exports.getPlants = getPlants;
function getPlantById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const log = req.logger;
        const id = req.params.pid;
        if (!utils_1.mongoose.Types.ObjectId.isValid(id)) {
            log.debug("Not valid PID");
            res.status(400).json({ message: `Not valid PID` });
        }
        else {
            try {
                log.debug(`Getting plant with ID: ${id}`);
                const plantsById = yield plants_service_1.plantsService.getPlantById(id);
                if (!plantsById) {
                    log.debug(`Cannot find plant with id: ${id}`);
                    res.status(400).json({ message: `Cannot find plant with id: ${id}` });
                }
                else {
                    log.debug(`Plant with ID: ${id} was founded , sending...`);
                    res.status(200).send(plantsById);
                }
            }
            catch (error) {
                log.debug(error);
                res.status(400).json({ error: error });
            }
        }
    });
}
exports.getPlantById = getPlantById;
function postPlants(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const log = req.logger;
        const { common_name, scientific_name, thumbnail, species, life_time, price, light, water, special_needs, stock } = req.body;
        let { created_at } = req.body;
        console.log(req.body);
        console.log("post");
        if (!common_name || !scientific_name || !thumbnail || !species || !life_time || !price || !light || !water || !special_needs || !stock) {
            log.debug("Complete all required fields");
            return res.status(400).json({ message: "Complete all required fields" });
        }
        else {
            created_at = JSON.stringify(new Date());
            let newPlant = { common_name, scientific_name, thumbnail, species, life_time, price, light, water, special_needs, stock, created_at };
            const validateNewPlant = (0, Validator_1.validatePlant)(newPlant);
            log.debug("Starting new plant validation");
            if (validateNewPlant === true) {
                try {
                    log.debug(`Plant data was validated, starting creation of: ${newPlant} `);
                    const createPlant = yield plants_service_1.plantsService.createPlant(newPlant);
                    if (!createPlant) {
                        log.debug("Plant cannot be created");
                        res.status(400).json({ error: "Plant cannot be created" });
                    }
                    else {
                        log.debug(`Plant created`);
                        res.status(200).json({ message: "Plant Created" });
                    }
                }
                catch (error) {
                    log.debug(error);
                    res.status(400).json({ error: error });
                }
            }
            else {
                log.debug("Fail in plant data");
                res.status(400).json({ error: "Fail in plant data" });
            }
        }
    });
}
exports.postPlants = postPlants;
function putPlants(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const log = req.logger;
        const id = req.params.pid;
        const { plant } = req.body;
        if (!utils_1.mongoose.Types.ObjectId.isValid(id)) {
            log.debug("Not valid pid");
            res.status(400).json({ error: "Not valid pid" });
        }
        else if (utils_1.mongoose.Types.ObjectId.isValid(id) && typeof plant === "object") {
            if ((plant.price && typeof plant.price != "number" || typeof plant.price === "object") || (plant.life_time && typeof plant.life_time != "number" || typeof plant.life_time === "object")) {
                log.debug("Invalid data, a number is needed");
                res.status(400).json({ error: "Invalid data, a number is needed" });
            }
            else {
                try {
                    log.debug("Starting plant update...");
                    const updatePlant = yield plants_service_1.plantsService.putPlants(id, plant);
                    if (!updatePlant) {
                        log.debug("Plant cannot be updated");
                        res.status(400).json({ error: "Plant cannot be updated" });
                    }
                    else {
                        log.debug("Plant updated");
                        res.status(200).json({ message: "Plant Updated" });
                    }
                }
                catch (_a) {
                    log.debug("Plant cannot be updated , invalid data");
                    res.status(200).json({ message: "Plant cannot be updated , invalid data" });
                }
            }
        }
        else {
            log.debug("Invalid data");
            res.status(400).json({ error: "Invalid data" });
        }
    });
}
exports.putPlants = putPlants;
function deletePlant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const log = req.logger;
        const id = req.params.pid;
        if (!utils_1.mongoose.Types.ObjectId.isValid(id)) {
            log.debug("Not valid PID");
            res.status(400).json({ error: "Not valid PID" });
        }
        else {
            log.debug(`Starting plant with ID: ${id} elimination`);
            const deletePlant = plants_service_1.plantsService.deletePlant(id);
            if (!deletePlant) {
                log.debug(`Cannot delete plant by id: ${id}`);
                res.status(400).json({ error: `Cannot delete plant by id: ${id}` });
            }
            else {
                log.debug(`Plant with ID: ${id} has been deleted correctly`);
                res.status(200).json({ message: `Plant with id ${id} has been deleted correctly` });
            }
        }
    });
}
exports.deletePlant = deletePlant;
