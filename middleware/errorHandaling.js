const errorHandler = (err,req,res,next)=>{
    console.log(err._message)

    res.send({error:err._message})
//    res.status(err.statusCode || 500).json({
//        success: false,
//        error : err.massage||'Server Error'
//    }) 

}

module.exports = errorHandler;