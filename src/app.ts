import { express } from "./utils"
import { mongoose } from "./utils"
import cors from "cors"
import { router as plantsRouter } from "./router/plants.router"
import { router as blogRouter } from "./router/blog.router"

import { Log } from "./middlewares/winstone"


//PASOS FALTANTES:
//autenticacion ( bcrypt y jwt)
//nodemailer - 3
//socket
//guardar imagenes - 2
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
app.use(Log)
app.use(cors())


app.use("/home" , plantsRouter )
app.use("/blog" , blogRouter )




app.listen( PORT , ()=>{

    console.log(`SERVER RUNNING ON PORT ${PORT}`)
    
})

mongoose.connect("mongodb+srv://pandemonio278:urSUGuba7ana4gh3@cow.s8nlm84.mongodb.net")
  .then(res => { console.log("Database conected") })
  .catch(()=>{console.log("error")})

