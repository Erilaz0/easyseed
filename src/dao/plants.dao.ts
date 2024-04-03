const plantsModel = require("../dao/models/plants.model")

export class plantsDao{

    constructor(){}

async createPlant( newPlant : object ){
   
   return await plantsModel.create(  newPlant  )
  }


async getPlants(){

   return await plantsModel.find({}).lean()

}


async getPlantById( id : string ){

  return await plantsModel.find( { _id : id } )

}


async plantByQuery( query : object , page : number , limit : number){

  return await plantsModel.paginate( query , page , limit )
}


async putPlants( id : string , plant : object ){

  return await plantsModel.updateOne({ _id : id } , plant )

}


async deletePlant( id : string ){

  return await plantsModel.deleteOne( { _id : id } )

}


async plantPaginate( page : number ){

  return await plantsModel.paginate( {} , { page : page , limit : 10 , lean : true})
}


async sortPlants( sort : number ){

  return await plantsModel.paginate.aggregate( [ { $sort : { price : sort } } ] )
}


async plantsByPrice( price : number , page : number ){

    const options = {
       page: page,
       limit: 10,
       lean: true
    };

    const query = {
        price: { $lt: price } // Filtra plantas con precio menor que el valor dado
    };


  return await plantsModel.paginate( query , options )
}

}

