const mongoose =  require('mongoose');

const todoSchema = mongoose.Schema({
    todoName:{type:String},
})

const todoModel = mongoose.model("todoData",todoSchema);
module.exports = todoModel;