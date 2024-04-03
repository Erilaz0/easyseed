import { router } from "../utils";
import { postBlog , getBlogs , getBlogById , putBlog , addBlogImage , updateSection , addSection , deleteBlogImage , deleteBlog } from "../controllers/blog";


router.get("/" , getBlogs )


router.get("/:bid" , getBlogById )


router.put("/:bid" , putBlog )


router.put("/:bid/image/:mid" , deleteBlogImage )


router.put("/addimage/:bid" , addBlogImage )


router.put("/:bid/section/:sid" , updateSection )


router.put("/:bid/createsection/" , addSection )


router.post("/" , postBlog )


router.delete("/:bid" , deleteBlog )





export { router }