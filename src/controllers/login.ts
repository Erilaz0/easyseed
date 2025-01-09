import generaJWT from "../functions/generaJWT";
import { Response , Request } from "../utils";
import bcrypt from "bcrypt"
import _adminCookie from "../keys/keys"
import _secretToken from "../keys/keys"

async function login( req : Request , res : Response ){


    const body = req.body.user
    const username = body.username
    const password = body.password
    

    if( username && typeof username === "string" && username === "admin" && password && typeof password === "string" && password === "admin" ){
        // @ts-ignore
        const adminCookie : string = _adminCookie
        const secretToken = _secretToken 
        // @ts-ignore
        const encodedSecret = await bcrypt.hash( secretToken , 10  ) 

        const token = generaJWT( encodedSecret )
        const horasEnMilisegundos = 60 * 60 * 1000; 
        const expirationTime = new Date(Date.now() + horasEnMilisegundos);
        res.cookie( adminCookie , token , { expires : expirationTime , httpOnly : true })
        res.status(200).json( { Authorized : "LOGGED AS ADMIN" } )

    }
    else{
        res.status(401).json( { Unauthorized : "This credentials dont match with our records" } )
    }

   
}

async function server_data( req : Request , res : Response ){



    res.status(200).send("yes")

}


export { login , server_data } 