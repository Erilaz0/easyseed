import { router } from "../utils";
import { postBlog , getBlogs , getBlogById , putBlog , addBlogImage , updateSection , addSection , deleteBlogImage , deleteBlog, setLikesEmail } from "../controllers/blog";
import adminVerify from "../middlewares/admin_token"

router.get("/" , getBlogs )


router.get("/:bid" , getBlogById )


router.put("/:bid" , adminVerify , putBlog )


router.put("/:bid/image/:mid" , adminVerify , deleteBlogImage )


router.put("/addimage/:bid" , adminVerify , addBlogImage )


router.put("/:bid/section/:sid" , adminVerify , updateSection )


router.put("/:bid/createsection/" , adminVerify , addSection )


router.put("/:bid/setlikes/" , setLikesEmail )


router.post("/" , adminVerify , postBlog )


router.delete("/:bid" , adminVerify , deleteBlog )





export { router }