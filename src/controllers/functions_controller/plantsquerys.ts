import { Response } from "../../utils"
import { plantsService } from "../../services/plants.service"

async function handleSpecies( log : any , species : string , res : Response , page : number , limit : number){

    log.debug(`Looking for species : ${species}`)
    let query : object = { species : species }

    const getBySpecies = await plantsService.plantByQuery( query , page , limit)
    
    
    
    
   
   
    if( !getBySpecies || getBySpecies.length === 0 ){
  
        log.debug("Cannot get species")
        res.status(400).json( { error :  `Cannot get plant by species: ${species} `} )
    }
    else{

        log.debug("Species founded")
        res.status(200).send(getBySpecies)
    }
}







async function handleLight( log : any , light : string , res : Response  , page : number , limit : number ){

    log.debug(`Getting plants with ${light}`)
    let query : object = { light : light }
    const getByLight = await plantsService.plantByQuery( query  , page , limit )

   
    if( !getByLight || getByLight.length === 0 ){

      log.debug(`Invalid type of light`)
      res.status(400).json( { error : `Invalid type of light` } )
    }
    else{
      
      log.debug(`Sending plants with ${light} light`)
      res.status(200).send( getByLight )
  
  
  
  
    }
}












async function handleSort( sort : number , res : Response ){

  const sortPlants = await plantsService.sortPlants( sort )
  if(!sortPlants){

    res.status(400).json( { error : "Cannot get plants by price" } )
  }
  else{
  
    res.status(200).send(sortPlants)
  }
}



async function handlePagination( page : number , res : Response ){

  const plantsPaginate = await plantsService.plantPaginate( page )
  if(!plantsPaginate){

    res.status(400).json( { error : "Cannot get plants by price" } )
  }
  else{
  
    res.status(200).send(plantsPaginate)
  }
}












async function handleWater( water : string , page : number , limit : number , res : Response ){
 
 const query = { water : water }
  const plantsByWater = await plantsService.plantByQuery( query , page , limit )
  if(!plantsByWater){

    res.status(400).json( { error : "Cannot get plants by price" } )
  }
  else{
  
    res.status(200).send(plantsByWater)
  }


}







async function handlePrice( price : number , page  : number , res : Response ){
 
 const plantsByPrice = await plantsService.plantsByPrice( price , page )
 if(!plantsByPrice){

  res.status(400).json( { error : "Cannot get plant by this price"} )
 }
 else{
  
  res.status(200).send( plantsByPrice )
 }


}
export { handleSpecies , handleLight , handleSort , handlePrice , handlePagination , handleWater }