import { mongoose } from "../../utils";



const chatCollection : string = "users-chat"
const chatSchema = new mongoose.Schema({

    uid : { 
        type : String , required : true
     },
    messages : [{
        message : { type : String } , 
        rol : { type : String },
        date : { type : String },
      }]
       
    

})

const chatModel = mongoose.model( chatCollection , chatSchema )
export default chatModel
