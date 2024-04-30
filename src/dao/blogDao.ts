const blogModel = require("../dao/models/blog.model")


class blogDao{

 constructor(){}

 async createBlog( newBlog : object ){

    return await blogModel.create( newBlog )
 }


 async getBlogs(){

    return await blogModel.find({}).lean()
 }


 async getBlogById( id : string ){

    return await blogModel.findOne( { _id : id } )
 }


 async putBlog( id : string , blog : object ){
    
    return await blogModel.updateOne( { _id : id } , blog )
 }


 async deleteBlogImage( bid : string , mid : string ){

    return await blogModel.updateOne( { _id : bid } , { $pull : { images : {  _id : mid } } } )
 }



 async addBlogImage( bid : string , newUrl : string ){

   return await blogModel.updateOne( { _id : bid } , { $push : { images : { image : newUrl } } } )
 }


 async addSectionImage( bid : string , sid : string , image : string ){

   return await blogModel.updateOne( { _id : bid , "sections._id" : sid } , { $set : { "sections.$.image" : image } })
 }


 async updateSubtitle( bid : string , sid : string , subtitle : string ){
   
   return await blogModel.updateOne( { _id : bid , "sections._id" : sid } , { $set : { "sections.$.subtitle" :  subtitle  } } )
 }


 async updateSectionDescription( bid : string , sid : string , description : string ){
   
   return await blogModel.updateOne( { _id : bid , "sections._id" : sid } , { $set : { "sections.$.description" :  description  } } )
 }


 async setLikes( bid : string , email : string ){

   return await blogModel.updateOne( { _id : bid } , {  $inc : { "likes.quantity" : 1 } , $push : { "likes.emails" : { email : email } } } )
 }





 async createSection( bid : string , section : object ){

    return await blogModel.updateOne( { _id : bid } , { $push : { sections :  section } } )
 }


 async deleteBlog( bid : string ){

   return await blogModel.deleteOne( { _id : bid } )
 }


 async blogPaginate( page : number , limit : number ){

   return await blogModel.paginate( {} , { page : page , limit : limit , lean  : true } )
 }



}

export { blogDao }