import chatServices from "../services/chat.services"
import { Request , Response } from "../utils"


async function getChats( req : Request , res : Response ){

    console.log("chat")
    console.log(req.originalUrl)
    const getChats = await chatServices.getChats()
    if(!getChats){

        res.status(400).json( { error : "Cannot get chats" } )
    }
    else{

        res.status(200).send( getChats )
}
    }


async function ChatByUid( req : Request , res : Response ){

    const uid = req.params.uid
    
    const getChats = await chatServices.getChatByUID( uid )
    if(!getChats){

        res.status(400).json( { error : "Cannot get chats" } )
    }
    else{

        res.status(200).send( getChats )
    }
    }

    

export  { getChats , ChatByUid }