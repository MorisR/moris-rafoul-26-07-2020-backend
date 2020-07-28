const send = require("../../util/serverResponse");


exports.notFound = (req,res)=>{
    send(res,{message:"not found",status:404})

}

exports.serverError = (err, req, res, next) =>{
    send(res,{message:"something went wrong on our end",status:500})

}