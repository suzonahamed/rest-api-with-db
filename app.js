const express=require('express');
const app=express();
const cors=require('cors');
const userRouter=require("./routes/user.route");

require('./config/db');



app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/api/users",userRouter);

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/views/index.html")
})

//route is not found
app.use((req,res,next)=>{
    res.status(404).json({
        message:"Opps! Sorry boss,this is wrong route"
    })
});
//server side error
app.use((err,req,res,next)=>{
    res.status(500).json({
        message:"something is broke"
    })
});
module.exports=app