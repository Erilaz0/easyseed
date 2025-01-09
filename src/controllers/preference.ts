import { Request , Response } from "../utils"
import { MercadoPagoConfig, Preference } from 'mercadopago';

interface Items{
    
        title: string ,
        quantity : number,
        price : number,
        currency_id :  string
    
}

interface PreferenceRequest {
    items: Items[];
    back_urls: {
      success: string;
      failure: string;
      pending: string;
    };
    auto_return: string;
  }

async function createPreference( req : Request , res : Response ){

    try{

        const client = new MercadoPagoConfig({ accessToken: 'APP_USR-6765663660045588-051715-ebbf3a82a23cab6ef06414561ef0652a-1816034763' });
        const getBody = req.body
    
        const  body : PreferenceRequest = {
    
            items: getBody.map( ( item : Items) =>({

                    title: item.title,
                    unit_price: item.price, 
                    quantity: item.quantity, 
                    currency_id: item.currency_id
                   }))
    
                  
                 ,
            back_urls: {
                success:"https://www.youtube.com/",
                failure:"https://www.tiktok.com/",
                pending:"https://www.facebook.com/"
            },
            auto_return: "approved",
        }
    
        const preference = new Preference( client );
        // @ts-ignore
        const result = await preference.create({ body })
        const preferenceID = result.id
     
        if( !getBody[0].title ){
            res.status(400).json( { error : "Enought data" } )
    
        }
        else if( preferenceID ){
            res.status(200).json( { preferenceID : preferenceID } )
        }
        else{
            res.status(400).json( { error : "Cannot create preference" } )
        }

    }
    catch(error){
        return error
    }
  }


    

export  { createPreference }