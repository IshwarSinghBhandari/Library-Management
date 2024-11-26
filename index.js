import express from 'express';
import { connect } from './database/dbconnect.js';
import { userRouter } from './Route/userRoute.js';
import dotenv from 'dotenv';
import cors from 'cors';
import { bookRouter } from './Route/bookRoute.js';
dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors())

app.use("/auth",userRouter);

app.use("/books",bookRouter)

//start the server
const startseverr = async()=>{
//function call to connect database
    connect();
    app.listen(port,()=>{
        console.log(`listening on ${port}`);
    })
}
startseverr();