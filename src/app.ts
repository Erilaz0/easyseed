import { express } from "./utils"
import { mongoose } from "./utils"
import cors from "cors"
import  chatRouter from "./router/chat.router"
import  plantsRouter from "./router/plants.router"
import  blogRouter from "./router/blog.router"
import  loginRouter from "./router/login.router"
import { Log } from "./middlewares/winstone"
import cookieParser from 'cookie-parser';
import { Server } from "socket.io"
import chatServices from "./services/chat.services"



//PASOS FALTANTES:
//socket
//cluster
//dotenv - 4
//documentacion 
//testing ( cypress )
//artillery
//docker?

const path = require("path")



const PORT : number = 8080
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname + '/public')));
app.use(cookieParser());
app.use(Log)


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true 
}));






app.use("/blogs" , blogRouter )
app.use("/login" , loginRouter )
app.use("/chats" , chatRouter )
app.use("/plants" , plantsRouter )



const serverExpress = app.listen( PORT , ()=>{

    console.log(`SERVER RUNNING ON PORT ${PORT}`)
    
})

mongoose.connect("mongodb+srv://pandemonio278:urSUGuba7ana4gh3@cow.s8nlm84.mongodb.net")
  .then(res => { console.log("Database conected") })
  .catch(()=>{console.log("error")})




const serverSocket = new Server( serverExpress, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"], // Métodos permitidos
    credentials: true
  }
} )
serverSocket.on("connection", sock =>{

  sock.on( "client_message" , async( message_data )=>{
    const messagesData : { message : string , rol : string , date : string } = message_data.data;
    const date = new Date().toISOString();
    let rol = messagesData.rol;
    const message = messagesData.message;
   
    const uid = message_data.uid;
    if( uid ){

      const findChat = await chatServices.getChatByUID( uid );
      if( findChat && findChat.length > 0 ){

        const addMessage = await chatServices.addMessage( uid , message , rol , date )
        if(!addMessage){
            console.log("cannot add message")
        }
        else{
          const send_new_message = { uid : uid , messages : { message : message , rol : rol , date : date } }
          sock.emit( "addNewMessage", send_new_message )
          console.log("una vesss")
          serverSocket.emit( "admin_message", send_new_message )
          
          console.log("mesnaje añadido a chat existente")
        }
      }
      else{
      
        const newChat = await chatServices.createChat( uid ,  message  , rol , date );
        if(!newChat){
 
          console.log("cannot create chat")
        }
        else{
          console.log("chat created")
        }
      }
      
    }
    else{

      console.log("no uid socket")
    }

   

   
  })


  sock.on( "admin_response" , async ( response )=>{
     console.log("una ves")
    const messagesData : { message : string , rol : string , date : string } = response.data;
    const date = new Date().toISOString();
    let rol = messagesData.rol;
    const message = messagesData.message;
    const uid = response.uid

    if( uid ){

      const findChat = await chatServices.getChatByUID( uid );
      if( findChat ){
        const addMessage = await chatServices.addMessage( uid , message , rol , date )

        if( addMessage ){
          const send_new_message = { uid : uid , messages : { message : message , rol : rol , date : date } }
          serverSocket.emit( "admin_message", send_new_message )
        }
      }
    }
  })
})
