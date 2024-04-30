import { mongoose } from "../utils"
import { blog } from "../interfaces/blog.interface"
import { blogServices } from "../services/blog.services"
import { Request , Response } from "../utils"
import { validateBlog } from "../validators/Validator"
import  likesAdviceEmail  from "../mailing/send"





async function getBlogs( req : Request , res : Response){

  
    
    const page : number = parseInt(req.query.page as string)
    const limit : number = parseInt(req.query.limit as string)

    

    if(page && typeof page === "number" || limit && typeof limit === "number"){

      const log = ( req as any).logger
      const blogs = await blogServices.paginateBlog(  page , limit )
      
    
      if( !blogs ){
           
           log.debug("Error trying to get blogs - blog.ts")
           res.status(400).json( { error : "Cannot get blogs" } )
         
      }
      else{
           log.debug("Getting Blogs - blog.ts")
           res.status(200).send(blogs)
      }


    }else{

      const log = ( req as any).logger
      const blogs : blog[] = await blogServices.getBlogs()
      
    
      if( !blogs ){
           
           log.debug("Error trying to get blogs - blog.ts")
           res.status(400).json( { error : "Cannot get blogs" } )
         
      }
      else{
           log.debug("Getting Blogs - blog.ts")
           res.status(200).send(blogs)
      }
    }
    
    
   

    
}












async function getBlogById( req : Request , res : Response ){

const log = ( req as any).logger
const id = req.params.bid

if( !id || !mongoose.Types.ObjectId.isValid(id) ){

  log.debug("Not valid bid")
  res.status(400).json( { error : "Not valid bid" } )
}
else{

  log.debug("Starting blog validation")
  
  const blogById = await blogServices.getBlogById( id )
  const validate = validateBlog(blogById)
  if( !blogById || validate === false ){
      log.debug("Blog validation failed")
      res.status(400).json( { error : `Blog with BID: ${id} not founded or invalid data` } )
     
  }
  else{
      log.debug("Valid data blog")
      log.debug("Sending")
      res.status(200).send( [blogById] )
     
  }
}

    
} 













async function putBlog( req : Request , res : Response ){
    
    const log = ( req as any).logger
    const id = req.params.bid
    const { blog } = req.body
    console.log(blog)

    
    if( !id || !mongoose.Types.ObjectId.isValid(id) ){
   
      log.debug("Not valid BID")
      res.status(400).json( { error : "Not valid BID" } )
    }else{
       
        const updateBlog = await blogServices.putBlog( id , blog )
        if( !updateBlog ){
          log.debug("Cannot update blog")
          res.status(400).json({ error : "no updated" } )
        }
        else{
          console.log(updateBlog)
          log.debug("Blog updated")
          res.status(200).json({ message : "updated"})
        }
    }
}














async function deleteBlogImage( req : Request , res : Response ){

    const log = ( req as any).logger
    const bid = req.params.bid
    const mid = req.params.mid
    
    
    if( !mongoose.Types.ObjectId.isValid(bid) || !mongoose.Types.ObjectId.isValid(mid) ){
  
        log.debug("Not valid BID or MID")
        res.status(400).json( { error : "Not valid BID or MID "} )
    }
    else{

        const deleteBlogImage = await blogServices.deleteBlogImage( bid , mid )
        if( !deleteBlogImage ){
             
            log.debug("Cannot delete image")
            res.status(400).json( { error : "Cannot delete Image"} )
        }
        else{
            log.debug("Image deleted")
            res.status(200).json( { message : "Deleted" } )
        }

    }
}













async function addBlogImage( req : Request , res : Response ){

const log = ( req as any).logger
const bid = req.params.bid
const { newUrl } = req.body



if( !mongoose.Types.ObjectId.isValid(bid) || !newUrl || typeof newUrl != "string"){

    log.debug("Not valid BID or invalid object")
    res.status(400).json( { error : "Not valid BID or invalid object" } )
}
else{

   
    const addBlogImage = await blogServices.addBlogImage( bid , newUrl )
    if(!addBlogImage){
    
        log.debug("Cant add Image")
        res.status(400).json( { error : "Cant add Image" } )
    }
    else{

        log.debug("New image added")
        res.status(200).json( { message : "New image added" } )
    } 

}
}

















async function postBlog( req : Request , res : Response ){
  
const log = ( req as any).logger
const { title , description , images , sections } = req.body

if( !title || !description || !images || !sections || sections.length === 0 || !sections[0].subtitle || !sections[0].description){
    
    log.debug("Complete all required fields")
    res.status(400).json({ error : "Complete all required fields"})
}else{
  
    const newBlog : blog = { title , description , images , sections }
    const validation = validateBlog(newBlog)
    
    log.debug("Starting new blog validation...")
    if( validation === true ){
        let date = new Date()
        const blog = { title , description , images , sections , date}
        const createBlog : blog = await blogServices.createBlog( blog )
        if(createBlog){
            log.debug("Blog data validated ,the blog was created")
            res.status(200).json( { message : "The blog has been created properly" } )

        }
        else{
            log.debug("Cannot create blog - blog.ts")
            res.status(400).json( { error : "Cannot create blog - Internal Error" } )
        }
        


    }
    else{
        log.debug("Failed to validate blog data")
        res.status(400).json( { error : "Fail to validate blog data" } )
    }
  }
}
















async function updateSection( req : Request , res : Response ){
  
  const log = ( req as any).logger
 
  const bid = req.params.bid
  const sid = req.params.sid 
  const { section } = req.body

  if( !mongoose.Types.ObjectId.isValid(bid) || !mongoose.Types.ObjectId.isValid(sid) || !section || typeof section != "object"){

    log.debug("Not valid BID , SID or Object")
    res.status(400).json( { error : "Not valid BID , SID or object" } )
  }
  else{

    if(section.subtitle){
        log.debug("Starting subtitles update")
        const updateSubtitle = await blogServices.updateSubtitle( bid , sid , section.subtitle )
        if(!updateSubtitle){

           log.debug("Cannot update subtitle")
           res.status(400).json( { error : "Cannot update section subtitle" } )
         }
        else{

           log.debug("Updated")
           res.status(200).json( { message : "Updated" } )
         }


    }
    else if(section.description){

        log.debug("Starting description update")
        const updateSectionDescription = await blogServices.updateSectionDescription( bid , sid , section.description )
        if(!updateSectionDescription){

            log.debug("Cannot update section description")
            res.status(400).json( { error : "Cannot update section description" } )
         }
        else{

            log.debug("Updated")
            res.status(200).json( { message : "Updated" } )
         }

    }
    else if(section.image){
      let image = section.image
      const addImage = await blogServices.addSectionImage( bid , sid , image)
      if(!addImage ){

        log.debug("Cannot add image on this section")
        res.status(400).json( { error : "Cannot add image on this section" } )
      }
      else{

        log.debug("Image added")
        res.status(200).json( { message : "Image added"} )
      }



    }
    else{
       
        log.debug("Not valid section properties")
        res.status(400).json( { error : "Not valid section properties" } )
    }
  }
}





async function setLikesEmail( req : Request , res : Response ){

  const log = ( req as any ).logger
  const { data } = req.body
  const bid = req.params.bid

  const setEmail : string = data.email
  if( !mongoose.Types.ObjectId.isValid( bid )){

    res.status(400).json( { error : "Not valid BID" } )
  }
  else{

    const getBlog = await blogServices.getBlogById( bid )
    if( !getBlog ){
      res.status(400).json( { error : `Cnnot find blog by id ${bid}` } )
    }
    else{
      const verifyEmials = getBlog.likes.emails.find( ( email : any ) => email.email === setEmail )
      
      if(verifyEmials){

        res.status(400).json( { error : `This email already exists`} )
      }
      else{
      
      
        const likesUpload = await blogServices.setLikes( bid , setEmail )
        if( likesUpload ){

          likesAdviceEmail( setEmail )
          .then( ( data ) => log.debug( data ) )
          .catch( ( error )=> log.debug(error) )
          
          res.status(200).json( { message : "success"} )
        }
        else if( !likesUpload ){

          res.status(400).json( { message : "error, cannot upload"} )
        }
        else{
          res.status(400).json( { message : "error, cannot upload"} )
       }
     }
    }
  }
}






async function addSection( req : Request , res : Response ){

    const log = ( req as any).logger
    const bid = req.params.bid
    const { section } = req.body

    if( !mongoose.Types.ObjectId.isValid(bid) || !section || typeof section != "object" ){
     
      log.debug("Not valid BID or Object")
      res.status(400).json( { error : "Not valid BID or Object"} )

    }
    else{
       const createSection = await blogServices.createSection( bid , section )
       log.debug(`Creating new section: ${section}`)
       if(!createSection){

        log.debug("Cannot create section")
        res.status(400).json( { error : "Cannot create section" } )
       }
       else{

        log.debug("Section created")
        res.status(200).json( { message : "Updated" } )
       }

    }
}










async function deleteBlog( req : Request , res : Response ){
 
  const log = ( req as any).logger
  const bid = req.params.bid

  if( !mongoose.Types.ObjectId.isValid(bid) || !bid ){

    log.debug("Invalid BID")
    res.status(400).json( { error : "Invalid BID" } )
  }
  else{

    log.debug(`Deleting blog`)
    const deleteBlog = await blogServices.deleteBlog( bid )
    if( !deleteBlog ){

        log.debug(`Blog with ID: ${bid} cannot be deleted`)
        res.status(400).json( { error : `Blog with ID:${bid} cannot be deleted` } )
    }
    else{
        log.debug(`Blog with ID : ${bid} has been deleted`)
        res.status(200).json( { message : `Blog with ID : ${bid} has been deleted` } )
    }

  }

}

     

    







export { getBlogs , getBlogById , postBlog , putBlog , addBlogImage , updateSection , addSection , deleteBlogImage , deleteBlog , setLikesEmail }