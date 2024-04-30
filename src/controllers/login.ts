import generaJWT from "../functions/generaJWT";
import { Response , Request } from "../utils";
import bcrypt from "bcrypt"

async function login( req : Request , res : Response ){


    const body = req.body.user
    const username = body.username
    const password = body.password
    

    if( username && typeof username === "string" && username === "admin" && password && typeof password === "string" && password === "admin" ){

        const adminCookie = "7W6e7B4zcchemj4A3evh9FhYLXzZ7CSL5v9h6664YCdAhK8W52_id"
        const secretToken = "u5Kn66S2DA9iq7Fxx2gHH2mtn6wkA22Z792QHkq6VjAb96BZvQ-kX2khMGJ5h6WeMTLN8g828j6P52ajFnH7E6fb856t3cGfz8DN-Mej7xX78D7Q7eH97iKmeaY789ReYr9T8PnJLe57SNhJd33c2ev"
        const encodedSecret = await bcrypt.hash( secretToken , 10  ) 

        const token = generaJWT( encodedSecret )
        const horasEnMilisegundos = 60 * 60 * 1000; 
        const expirationTime = new Date(Date.now() + horasEnMilisegundos);
        res.cookie( adminCookie , token , { expires : expirationTime , httpOnly : false })
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