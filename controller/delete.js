const { Model } = require("mongoose");


const del = async(req, res) => {
    var checkUser = await authModel.deleteOne({ email:req.body.email})
    if (checkUser.deletedCount==1) {
        res.status(200).send({result:checkUser,message:'Deleted Successfully'});

    } else {
        res.status(200).send({result:checkUser,message:'NOt Found'});
    }
}

module.exports={del}