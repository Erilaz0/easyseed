import { router } from "../utils"
import { getPlants , postPlants , getPlantById , putPlants , deletePlant } from "../controllers/plants";
import  adminVerify  from "../middlewares/admin_token"




router.get( "/plants" , getPlants )

router.get( "/plants/:pid" , getPlantById )

router.post("/plants" , adminVerify , postPlants )

router.put("/plants/:pid" , adminVerify , putPlants )

router.delete("/plants/:pid" , adminVerify , deletePlant )

export { router }
