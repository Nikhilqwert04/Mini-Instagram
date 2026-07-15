import 'dotenv/config.js'
import app from "./src/app.js";
import connectdb from "./src/db/db.js";

connectdb()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Server is Running on port 3000")
        })

    })
    .catch((err)=>{
        console.log("MonogoDB connection error",err)
        process.exit(1)
    })