import { express } from "./utils"
import { mongoose } from "./utils"
import cors from "cors"
import { router as plantsRouter } from "./router/plants.router"
import { router as blogRouter } from "./router/blog.router"
import { router as loginRouter } from "./router/login.router"
import { Log } from "./middlewares/winstone"
import cookieParser from 'cookie-parser';
import { Server } from "socket.io"




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



app.use("/login" , loginRouter )
app.use("/home" , plantsRouter )
app.use("/blog" , blogRouter )





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

  sock.on( "client_message" , async( message )=>{

    console.log(message)
  })
})