import { jwt } from "../utils"
import _secret from "../keys/keys"
const secret : any  = _secret
const generaJWT = ( code : any )=> jwt.sign( { code } , secret , { expiresIn:"1h" } ) 

export default generaJWT