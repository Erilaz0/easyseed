import { router } from "../utils"
import { getPlants , postPlants , getPlantById , putPlants , deletePlant } from "../controllers/plants";
import  adminVerify  from "../middlewares/admin_token"


console.log("plants router")

router.get( "/allplants" , getPlants )

router.get( "/plant/:pid" , getPlantById )

router.post("/" , adminVerify , postPlants )

router.put("/:pid" , adminVerify , putPlants )

router.delete("/:pid" , adminVerify , deletePlant )

export default router 
