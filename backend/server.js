
require('dotenv').config()

const express = require('express')

const mongoose = require('mongoose')

// Enables CORS for online api call
const cors = require('cors')

// if use online service to host, need to change the path to required path
// If using platform like Reder, put /opt/render/project/src/ in front of path
const workoutRoutes = require('/opt/render/project/src/backend/routes/workouts')

const userRoutes = require('/opt/render/project/src/backend/routes/user')

//express app
const app = express()

app.use(cors())

//middleware
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})


//routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //only start listening to port when connected to database

        //listen for requests
        app.listen(process.env.PORT, ()=>{
            console.log('connected to db , listening on port', process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })


