import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"
 


const plantsCollection : string = "plants"

const plantsSchema  = new mongoose.Schema({ 
    
common_name:{ type : String , required : true },
   
scientific_name :{ type : String , required : true },

thumbnail : [ { image : { type : String , required : true } }], 

species : { type : String , required : true }, 

life_time : { type : Number , required : true }, 

price :{ type : Number , required : true },

light : { type : String , required : true }, 

water : { type : String , required : true },

special_needs : { type : String , required : true },

created_at : { type : String , required : true }, 

recommended : { type : Boolean , default : false}

})

plantsSchema.plugin(mongoosePaginate)
const plantsModel = mongoose.model( plantsCollection , plantsSchema )

module.exports = plantsModel
