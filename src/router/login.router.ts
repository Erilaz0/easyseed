import { Router } from "express"
const router = Router()
import { login , server_data }   from "../controllers/login"


router.get("/" , server_data )


router.post("/" , login )



export { router }