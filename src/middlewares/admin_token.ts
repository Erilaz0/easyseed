import { Request , Response } from "../utils";
import { jwt } from "../utils";
import bcrypt from "bcrypt"

async function adminVerify( req : Request , res : Response , next : any ){

    const adminCookie = req.cookies["7W6e7B4zcchemj4A3evh9FhYLXzZ7CSL5v9h6664YCdAhK8W52_id"]
    const secret = "32bSg3H73R7antXUpVs234-i43p43arF6BG9F69bPvaf94gRuTdN8uFvhvM9ZS9jYD5P96Xu8"
    const log = ( req as any ).logger
    log.debug("Starting token validation..")




    jwt.verify( adminCookie , secret , async ( error : any , credentials : any )=>{

        

        if(error){
            log.debug("\u2716  Invalid token")
            res.status(400).json( { error : "Invalid token"} )
        }
        else{
            log.debug("\u2714  Token validated, starting second validation...")
            const key : string = "u5Kn66S2DA9iq7Fxx2gHH2mtn6wkA22Z792QHkq6VjAb96BZvQ-kX2khMGJ5h6WeMTLN8g828j6P52ajFnH7E6fb856t3cGfz8DN-Mej7xX78D7Q7eH97iKmeaY789ReYr9T8PnJLe57SNhJd33c2ev"
            const verifyCredentials =  await bcrypt.compare( key , credentials.code )
    
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