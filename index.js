const express=require('express');
require('dotenv').config();
const app=express();
const cors = require("cors");
const uri = process.env.MONGO_URI;
const PORT=process.env.PORT;
const { MongoClient, ServerApiVersion } = require('mongodb');





app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"], // ✅ allowed origins
  methods: ["GET", "POST", "PUT", "DELETE"], // কোন method allow করবে
  credentials: true
}));


app.get('/', (req,res)=>{



    res.send('server is runing')
})

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function run() {
  try {
    // await client.connect();
    console.log("✅ MongoDB Connected Successfully!");

    const userDB = client.db("userBD");
    const userclr = userDB.collection("usersclr");



    app.post('/users',async (req,res)=>{
        const newUser=req.body

          const result = await userclr.insertOne(newUser);
          
          if(result){
            res.status(200).json({
                message:'add success fully',
                result:result
            })
          }
    })

    app.get('/users',async (req,res)=>{
          const result = await userclr.find().toArray();
          
          if(result){
            res.status(200).json({
                message:'add success fully',
                result:result
            })
          }
    })



  } finally {
    // await client.close();
  }
}
run().catch(console.dir);




module.exports = app;