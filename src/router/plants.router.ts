import { router } from "../utils"
import { getPlants , postPlants , getPlantById , putPlants , deletePlant } from "../controllers/plants";




router.get( "/plants" , getPlants )

router.get( "/plants/:pid" , getPlantById )

router.post("/plants" , postPlants )

router.put("/plants/:pid" , putPlants )

router.delete("/plants/:pid" , deletePlant )

export { router }
