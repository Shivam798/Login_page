require("dotenv").config({path:'./config.env'});
const express = require('express')
const connectDB =require("./config/db")
const errorHandler = require("./middleware/error");

// Connect db
connectDB();


const app = express()

const port = process.env.PORT || 5000

app.use(express.json())
app.use("/api/auth",require("./routes/auth"))
app.use("/api/private",require("./routes/private"))

// Error Handle
app.use(errorHandler);


app.get('/', (req, res) => res.send('Hello World!'))

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))
process.on("unhandledRejection",(err,promise) =>{
    console.log(`Logged Error : ${err}`)
    server.close(()=>process.exit(1))
})