import { express } from "./utils"
import { mongoose } from "./utils"
import cors from "cors"
import  preferencesRouter from "./router/preference.router"
import  plantsRouter from "./router/plants.router"
import  blogRouter from "./router/blog.router"
import  loginRouter from "./router/login.router"
import { Log } from "./middlewares/winstone"
import cookieParser from 'cookie-parser';
import swagger_jsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
const MONGO_URL = process.env.MONGO_URL
const path = require("path")


const options = {
 
  definition :{
    
    openapi : "3.0.0",
    info:{
     title:"api abm products",
     version : "1.0.0",
     description:"documentacion del proyecto api abm products"
    }
    },
    apis: ["./*.yaml" ] 
}

const specs = swagger_jsdoc(options);


//@ts-ignore
const PORT : number = process.env.port || 8080
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname + '/public')));
app.use(cookieParser());
app.use(Log)


app.use(cors({
  origin: 'https://easyseed.netlify.app',
  credentials: true 
}));






app.use("/blogs" , blogRouter )
app.use("/login" , loginRouter )
app.use("/preferences" , preferencesRouter )
app.use("/plants" , plantsRouter )
app.use("/api-docs" , swaggerUi.serve , swaggerUi.setup(specs))



const serverExpress = app.listen( PORT , ()=>{

    console.log(`SERVER RUNNING ON PORT ${PORT}`)
    
})
//@ts-ignore
mongoose.connect( MONGO_URL )
  .then(res => { console.log("Database conected") })
  .catch(()=>{console.log("error")})



