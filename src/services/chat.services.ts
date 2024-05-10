import ChatDao from "../dao/models/chatDao";

class ChatService{

    private dao : ChatDao ;
    constructor( dao : ChatDao ){
        this.dao =  dao
    }


    async createChat( uid : string ,  message : string , date : string , rol : string ){
        
        return await this.dao.createChat( uid , message , date , rol )
    }


    async getChats(){
        
        return await this.dao.getChats()
    }

    async getChatByUID( uid : string ){

        return await this.dao.getChatByUID( uid )
    }

    async addMessage( uid : string , message : string , rol : string , date : string ){

        return await this.dao.addMessage( uid , message , rol , date )
    }
}

const daoChats = new ChatDao() 
export default new ChatService( daoChats )