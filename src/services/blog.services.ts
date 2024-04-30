import { blogDao } from "../dao/blogDao";

class blogService{

  private dao : blogDao
    constructor( dao : blogDao ){

      this.dao = dao

    }


    async createBlog( newBlog : object ){

        return await this.dao.createBlog( newBlog )
    }


    async getBlogs(){

      return await this.dao.getBlogs()
   }
  
  
   async getBlogById( id : string ){
  
      return await this.dao.getBlogById( id )
   }


   async putBlog( id : string , blog : object ){

    return await this.dao.putBlog( id , blog )
 }


 async deleteBlogImage( bid : string , mid : string ){

  return await this.dao.deleteBlogImage( bid , mid )
}


async addBlogImage( bid : string , newUrl : string ){

  return await this.dao.addBlogImage( bid , newUrl )
}


async addSectionImage( bid : string , sid : string , image : string ){

  return await this.dao.addSectionImage( bid , sid , image)
}


async updateSubtitle( bid : string , sid : string , subtitle : string ){

  return await this.dao.updateSubtitle( bid , sid , subtitle )
}


async updateSectionDescription( bid : string , sid : string , description : string ){

  return await this.dao.updateSectionDescription( bid , sid , description )
}



async createSection( bid : string , section : object ){

  return await this.dao.createSection( bid , section )
}


async deleteBlog( bid : string ){

  return await this.dao.deleteBlog( bid )
}


async paginateBlog( page : number , limit : number ){

  return await this.dao.blogPaginate( page , limit)
}


async setLikes( bid : string , email : string ){

  return await this.dao.setLikes( bid , email )
}






  
}

const daoBlog = new blogDao()
const blogServices = new blogService(daoBlog)

export { blogServices }