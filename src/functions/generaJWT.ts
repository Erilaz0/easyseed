import { jwt } from "../utils"
const secret = "32bSg3H73R7antXUpVs234-i43p43arF6BG9F69bPvaf94gRuTdN8uFvhvM9ZS9jYD5P96Xu8"
const generaJWT = ( code : any )=> jwt.sign( { code } , secret , { expiresIn:"1h" } ) 

export default generaJWT