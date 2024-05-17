import { router } from "../utils";
import { createPreference } from "../controllers/preference"




router.post("/create_preference", createPreference )




export default router 