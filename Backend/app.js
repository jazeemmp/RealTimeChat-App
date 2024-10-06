const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./Config/db')
//dot env configation
dotenv.config()
//creating an express app
const app = express()
//Importing routes
const userRouter = require('./Routes/user')
const adminRouter = require('./Routes/admin')
const chatRouter = require('./Routes/chat')
const messageRouter = require('./Routes/message')
//mongo db connection
connectDB()
// Use JSON middleware
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/',userRouter)
app.use('/admin',adminRouter)
app.use('/api/chat',chatRouter)
app.use('/api/message',messageRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
 });