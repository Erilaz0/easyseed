import chatModel from "./chat.model";

class ChatDao{

    constructor(){}



    async createChat( uid : string , message : string , date : string , rol : string  ){
   
        const newChat = { uid : uid , messages : [{ message : message , date : date , rol : rol }] }
        return await chatModel.create( newChat )
    }

    async getChats(){

        return await chatModel.find({}).lean()
    }

    async getChatByUID( uid : string ){

        return await chatModel.find( { uid : uid } )
    }

    async addMessage( uid : string , message : string , rol : string , date : string ){

        return await chatModel.updateOne( { uid : uid } , { $push : { messages : [ { message : message , rol : rol , date : date} ] }})
    }
}

export default ChatDao