import { Command } from "commander"

export function SYSTEM(){

    const program : Command = new Command()

    program
      .option("-E --ENVIROMENT <ENVIROMENT>" , "Select p for production mode or d por development mode")
      .parse(process.argv)
    
    const option : { readonly ENVIROMENT? : string , readonly PERSISTANCE? : string } = program.opts()
     
    return option.ENVIROMENT
    


}

