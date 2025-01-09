import { Request , Response } from "../utils";
import { jwt } from "../utils";
import bcrypt from "bcrypt"
import _adminCookie from "../keys/keys" 
import _secret from "../keys/keys"
import _secretToken from "../keys/keys"

async function adminVerify( req : Request , res : Response , next : any ){
    //@ts-ignore
    const adminCookie = req.cookies[ _adminCookie ]
    //@ts-ignore
    const secret : string = _secret
    const log = ( req as any ).logger
    log.debug("Starting token validation..")
    log.debug(adminCookie)


    jwt.verify( adminCookie , secret , async ( error : any , credentials : any )=>{

        if(error){
            log.debug("\u2716  Invalid token")
            res.status(400).json( { error : "Invalid token"} )
        }
        else{
            log.debug("\u2714  Token validated, starting second validation...")
            //@ts-ignore
            const secretToken : string = _secretToken
            const verifyCredentials =  await bcrypt.compare( secretToken , credentials.code )
    
            if( verifyCredentials === true ){
                log.debug("\u2714  All credentials match , ending hash validation...")
                next()
            }
            else{
                log.debug("\u2716  Cant validate hash")
                res.status(400).json( { error : "Invalid key"} )
            } 
        }
    })
}

export default adminVerify