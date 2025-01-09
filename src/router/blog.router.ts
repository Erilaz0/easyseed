import { router } from "../utils";
import { postBlog , getBlogs , getBlogById , putBlog , addBlogImage , updateSection , addSection , deleteBlogImage , deleteBlog, setLikesEmail } from "../controllers/blog";
import adminVerify from "../middlewares/admin_token"


router.get("/allblogs" , getBlogs )


router.get("/blog/:bid" , getBlogById )


router.put("/blog/update/:bid" , adminVerify , putBlog )


router.put("/:bid/image/:mid" , adminVerify , deleteBlogImage )


router.put("/addimage/:bid" , adminVerify , addBlogImage )


router.put("/:bid/section/:sid" , adminVerify , updateSection )


router.put("/:bid/createsection/" , adminVerify , addSection )


router.put("/:bid/setlikes/" , setLikesEmail )


router.post("/addnewblog" , adminVerify , postBlog )


router.delete("/:bid" , adminVerify , deleteBlog )





export default router 