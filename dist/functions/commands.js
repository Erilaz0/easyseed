"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYSTEM = SYSTEM;
const commander_1 = require("commander");
function SYSTEM() {
    const program = new commander_1.Command();
    program
        .option("-E --ENVIROMENT <ENVIROMENT>", "Select p for production mode or d por development mode")
        .parse(process.argv);
    const option = program.opts();
    return option.ENVIROMENT;
}
