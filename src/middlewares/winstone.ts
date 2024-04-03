import winston from "winston";
import { Request , Response , NextFunction } from "../utils";
import { SYSTEM } from "../functions/commands";

let level : string = "p";
let ENVIROMENT = SYSTEM();

switch(ENVIROMENT){

    case "d":
        level = "debug"
        break;

    case "p":
        level = "info"
        break;

};


const logger = winston.createLogger({


    level : level,
    transports : [

        new winston.transports.Console({

            level : level,
            format: winston.format.simple()
        })
    ]
});








const Log = ( req : Request , res : Response , next : NextFunction )=>{

    ( req as any ).logger = logger;
    next();

};


export { Log };