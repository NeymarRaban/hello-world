import express from 'express'
import mongoose from 'mongoose'
import cards from './dbCards.js'
import Cors from 'cors'

const app = express()
const port = process.env.PORT || 8001
const connection_url='mongodb://127.0.0.1:27017/dating-app-mern'

app.use(express.json())
app.use(Cors())
mongoose.connect(connection_url,{
    useNewUrlParser: true,
    //useCreateIndex:true,
    useUnifiedTopology:true
})

app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"))

app.post('/dating/cards', (req,res)=>{
    const dbCard=req.body
    console.log(dbCard)
    cards.create(dbCard)
         .then((data)=>{
            res.status(201).send(data);
         })
         .catch((err)=>res.status(500).send(err));
})

app.get('/dating/cards', (req, res) =>{
    const dbCard=req.body;
    cards.find()
        .then((data)=>{
            res.status(200).send(data);
        })
        .catch((err)=>res.status(500).send(err)); 
}) 
app.listen(port, () => console.log(`Listening on localhost: ${port}`))