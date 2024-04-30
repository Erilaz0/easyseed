import { plantsService } from "../services/plants.service"
import { validatePlant } from "../validators/Validator"
import { Request , Response } from "../utils"
import { mongoose } from "../utils"
import { plant } from "../interfaces/plant.interface"
import { handleSpecies , handleLight , handleSort, handlePrice, handlePagination, handleWater } from "./functions_controller/plantsquerys" 










async function getPlants( req : Request  , res : Response ){


  const log = ( req as any ).logger
  
  const species = req.query.species
  const light = req.query.light
  let page = parseInt(req.query.page as string)
  let limit = parseInt(req.query.limit as string)
  let sort = parseInt(req.query.sort as string)
  let price = parseInt(req.query.price as string)
  let water = req.query.water


  


  if( species && typeof species === "string" && page && typeof page === "number" && limit && typeof limit === "number" ){
  

     handleSpecies( log , species , res , page , limit )
  
  }
  else if( light && typeof light === "string" && page && typeof page === "number" && limit && typeof limit === "number" ){
  

    handleLight( log , light , res , page , limit )
  
  }
  else if( sort && typeof sort === "number"){

    handleSort( sort , res )
   
  
  }
  else if( water && typeof water === "string" && water === "Daily" || water === "Frequently" || water === "Infrequently"  && limit ){
      
     handleWater( water , page , limit , res )
  }
  else if( price && typeof price === "number"){

    handlePrice( price , page , res )

  }
  else if( page && typeof page === "number" ){
   
    handlePagination( page , res )
   
    
  }
  else{

    
   log.debug("Getting all plants from DB")
  

   const plants : plant[] = await plantsService.getPlants()

  
 
    if(!plants){

      log.debug("Cannot get plants")
      res.status(400).json({ message : "cannot get plants" })

    }else{

      log.debug("Sending all plants as JSON data")
      res.status(200).send(plants)

    }
  }
}









async function getPlantById( req : Request , res : Response ){

const log = ( req as any ).logger
const id = req.params.pid

if(!mongoose.Types.ObjectId.isValid(id)){
    
    log.debug("Not valid PID")
    res.status(400).json( { message : `Not valid PID` } )

}else{

    try{

        log.debug(`Getting plant with ID: ${id}`)
        const plantsById : plant[] = await plantsService.getPlantById( id )
       
        if( !plantsById ){

            log.debug(`Cannot find plant with id: ${id}`)
            res.status(400).json( { message : `Cannot find plant with id: ${id}` } )
            
        }else{

            log.debug(`Plant with ID: ${id} was founded , sending...`)
            res.status(200).send(plantsById)
        }
    

    }catch(error){
     
       log.debug(error)
       res.status(400).json( { error : error } )

    }
   
}



}











async function postPlants( req : Request , res : Response ){

const log = ( req as any ).logger
const { common_name , scientific_name , thumbnail , species , life_time , price , light , water , special_needs , stock } = req.body
let { created_at } = req.body
console.log(req.body)
console.log("post")
 


if( !common_name || !scientific_name || !thumbnail || !species || !life_time || !price || !light || !water || !special_needs || !stock ){
 
 log.debug("Complete all required fields")
 return res.status(400).json({ message : "Complete all required fields"})


}else{
  
  created_at  = JSON.stringify(new Date())
  let newPlant : plant  = { common_name , scientific_name , thumbnail , species , life_time , price , light , water , special_needs , stock , created_at }
  const validateNewPlant = validatePlant(newPlant)
  
  log.debug("Starting new plant validation")
  if(validateNewPlant === true){


    try{
      
      log.debug(`Plant data was validated, starting creation of: ${ newPlant } `)
      const createPlant : plant[] = await plantsService.createPlant( newPlant )
      
        if(!createPlant){

            log.debug("Plant cannot be created")
            res.status(400).json( { error : "Plant cannot be created" } )
        
        }
        else{

            log.debug(`Plant created`)
            res.status(200).json( { message : "Plant Created" } )
        }
      }
    catch(error){

            log.debug(error)
            res.status(400).json( { error : error } )

    }
        
        
    }else{
        
        log.debug("Fail in plant data")
        res.status(400).json( { error : "Fail in plant data"} )

    }
   
}


}








async function putPlants( req : Request , res : Response ){
  
  const log = ( req as any ).logger
  const id = req.params.pid
  const { plant } = req.body
  
  



  if(!mongoose.Types.ObjectId.isValid(id)){

     log.debug("Not valid pid")
     res.status(400).json({ error : "Not valid pid"})

  }else if( mongoose.Types.ObjectId.isValid(id) && typeof plant === "object" ){

    if(  ( plant.price && typeof plant.price != "number" || typeof plant.price === "object") || ( plant.life_time && typeof plant.life_time != "number" || typeof plant.life_time === "object")){
     
      log.debug("Invalid data, a number is needed")
      res.status(400).json( { error  : "Invalid data, a number is needed" } )
    }
    else{

      try{

        log.debug("Starting plant update...")
        const updatePlant = await plantsService.putPlants( id , plant )
    
        if(!updatePlant){
    
            log.debug("Plant cannot be updated")
            res.status(400).json( { error : "Plant cannot be updated"})
        
        }else{
          log.debug("Plant updated")  
          res.status(200).json( { message : "Plant Updated"} )
            }
    
       }
       catch{
        log.debug("Plant cannot be updated , invalid data")  
        res.status(200).json( { message : "Plant cannot be updated , invalid data"} )
    
       }
       


    }

  
  
  }
  else{
     
     log.debug("Invalid data")
     res.status(400).json( { error : "Invalid data" } )

  }
}









async function deletePlant( req : Request , res : Response ){

const log = ( req as any ).logger
const id = req.params.pid

if(!mongoose.Types.ObjectId.isValid(id)){
     
    log.debug("Not valid PID")
    res.status(400).json({ error : "Not valid PID" })

}else{
  
     log.debug(`Starting plant with ID: ${id} elimination`)
     const deletePlant = plantsService.deletePlant( id )
     if(!deletePlant){

           log.debug(`Cannot delete plant by id: ${id}`)
           res.status(400).json( { error : `Cannot delete plant by id: ${id}`} )

     }else{

           log.debug(`Plant with ID: ${id} has been deleted correctly`)
           res.status(200).json( { message : `Plant with id ${id} has been deleted correctly`} )

     }
}

}









export { getPlants , postPlants , getPlantById , putPlants , deletePlant }

