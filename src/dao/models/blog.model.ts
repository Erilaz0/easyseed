import { mongoose } from "../../utils"
import { Schema } from "mongoose"
import  mongoosePaginate  from "mongoose-paginate-v2"

const blogCollection : string = "blog"

const blogSchema = new Schema({

  title : { type : String , required : true },
  
  images : [ { image : { type : String , required : true } } ],
  
  description : { type : String , required : true },
  
  sections : [ { subtitle : { type : String , required : true} , description : { type : String , required : true } , image : { type : String , default : "none"} } ],
  
  likes :  { quantity : { type : Number } , emails : [ { email : { type : String } } ] } ,
  
  published : { type : Boolean , default : true },
  
  date : { type : String , required : true }


})

blogSchema.plugin(mongoosePaginate)
const blogModel = mongoose.model( blogCollection , blogSchema )


module.exports = blogModel  