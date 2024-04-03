import { plantsDao } from "../dao/plants.dao"
 
class plantService{
    private dao : plantsDao;
    constructor(dao : plantsDao){

        this.dao =  dao
    }

    async createPlant( newPlant : object ){

      return await this.dao.createPlant(  newPlant )
    }


    async getPlants(){

      return await this.dao.getPlants()
    }


    async getPlantById( id : string ){

      return await this.dao.getPlantById( id )
    }


    async plantByQuery( query : object , page : number , limit : number){

      return await this.dao.plantByQuery( query , page , limit )
    }


    async putPlants( id : string , plant : object ){
      
      return await this.dao.putPlants( id , plant )

    }


    async deletePlant( id : string ){

    return await this.dao.deletePlant( id )

    }


    async plantPaginate( page : number ){

      return await this.dao.plantPaginate( page )
    }


    async sortPlants( sort : number ){

      return await this.dao.sortPlants( sort )
    }


    async plantsByPrice( price : number , page : number ){

      return await this.dao.plantsByPrice( price , page )
    }
}

const daoPlants = new plantsDao()
const plantsService =  new plantService( daoPlants )

export { plantsService }