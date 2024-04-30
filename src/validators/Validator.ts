const ajv = require("ajv")






const plantValidator = {
    
    type : `object`,
    properties : {

        common_name:{ type : "string" },
   
        scientific_name :{ type : "string" },
        
        thumbnail : { 
               type : "array",
               items:{
                
                 type:"object",
                 properties:{
                      image : { type : "string" }
            }
        } }, 
        
        species : { type : "string" }, 
        
        life_time : { type : "number" }, 
        
        price :{ type : "number" },
        
        light : { type : "string" }, 
        
        water : { type : "string" },
        
        special_needs : { type : "string" },

        stock : { type : "number" },  

        created_at : { type : "string" }
    },
    
    required: ['common_name', 'scientific_name', 'species', 'life_time', 'price', 'light', 'water', 'special_needs', 'created_at' , 'thumbnail']
    
  };





const blogValidator = {
    
    type : `object`,
    properties : {

        title : { type : "string" } ,
        description : { type : "string" } ,
        images: {
            type : "array",
            items:{
                type:"object",
                properties:{
                    image : { type : "string" }
                }
            }
        } ,
         sections: {
          type: "array",
          items: {
              type: "object",
              properties: {
                  subtitle: { type: "string" },
                  description: { type: "string" },
                  image: { type: "string" }
              }
              ,required: [ "subtitle" , "description"]
           }
        },
        
    },
    
    required: [ "title" , "description" , "images" , "sections" ]
    
  };







const ajv_validation = new ajv()
const validatePlant = ajv_validation.compile(plantValidator)   
const validateBlog = ajv_validation.compile(blogValidator)
export { validatePlant , validateBlog } 


