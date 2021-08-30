let todoModel = require('../models/todoschema')



const todoAdd = async(req, res) =>{
    let userCreate = new todoModel({
        todoName: req.body.task,
    })
    userCreate.save()
        .then((responce) => {
            res.status(200).send({result:responce,message:"Added Successfully"})
        }).catch((err) => {
            res.status(400).send({result:err.message,message:"Added Faild"})
        })
}

const todoGet = async(req,res)=>{
   var result = await todoModel.find({})
   res.status(200).send({message:'All Data Fetched Successfuly',data:result.taskName})
}

module.exports={todoAdd,todoGet}