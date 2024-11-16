const User=require('../models/user.model')
const{v4:uuidv4}=require("uuid");

const getAllUsers= async(req,res)=>{
    try {
        const allUsers=await User.find();
        res.status(200).json(allUsers); 
     } catch (error) {
        res.status(404).send(error.message)
     }
};

const createUser=async(req,res)=>{
   try {
       const newUser= new User({
          name:req.body.name,
          price:req.body.price,
          des:req.body.des,  
        });
       await newUser.save();
    res.status(201).json({
      message:"successfully created",
      data:newUser,
    })
   } catch (error) {
  res.status(404).json({
    message:"Bro..something is wrong",
    data:error.message,
  })
   }
};
const getOneUser=async(req,res)=>{
  try {
     const userId=req.params.id;
      const update=await User.findOne({id:userId})
      res.status(200).json(update);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
const deleteUser=async(req,res)=>{
 try {
  const uId=req.params.id;
  const deleteU=await User.findByIdAndDelete({_id:uId});
  res.status(200).json({
   message:"deleted successfully",
   data:deleteU,
  })
 } catch (error) {
  res.status(404).json({
    message:"Sorry,we can't find",
    data:error.message
  });
 }
};
const updateUser=async(req,res)=>{
  try {
   const id=req.params.id;
    // const name=req.body.name;
   const upValue=await User.findByIdAndUpdate({_id:id},
    {
      $set:{
       
        name:req.body.name,
       
       }
    },
    {new:true}
   );
    if(upValue){
      res.status(200).json({
        message: 'Item updated successfully',
        data: upValue
        })
    }
    else{
       res.status(404).json({ message: 'Item not found' });
    }
  
  }
   catch (error) {
   res.status(404).json({
     message:"Sorry,we can't find",
     data:error.message
   });
  }
 };

module.exports={getAllUsers,createUser,getOneUser,deleteUser,updateUser}