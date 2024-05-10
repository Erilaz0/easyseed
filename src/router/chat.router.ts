import { router } from "../utils";
import { getChats , ChatByUid } from "../controllers/chats"


console.log("chats router")


router.get("/allchats", getChats )


router.get("/chat/:uid", ChatByUid )

export default router 