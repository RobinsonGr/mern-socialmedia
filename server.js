import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"
import mongoose from "mongoose"
import { register } from "./controllers/auth.js"
import userRouter from "./routes/users.js"




/* Config */

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy ({policy : "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit: "30mb", extended: "true"}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: "true"}))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, "public/assets")))

/* FILES STORAGE  */

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/assets")
    }
},
{
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    },
})

const upload = multer({storage})


app.get("/", (req, res) => {
    res.send("Hi World")
})

/* ROUTES WITH FILES */

app.post("/auth/register", upload.single("picture"), register)

/* ROUTES */

app.use("/users", userRouter )

/* Connect to db  */

const PORT = process.env.PORT || 8080;

async function main() {

    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

}


main().then( async () => {
    app.listen(PORT,"127.0.0.1",
     () => console.log(`The server has been connect in server the port ${PORT}`))

    // await User.insertMany(u)
    // await Post.insertMany(posts)


} ).catch(err => console.log(err))




