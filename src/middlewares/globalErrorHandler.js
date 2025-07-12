const globalErrorHandler = (err,req,res,next)=>{

    res.json({
        message : err.message,
        errorStack : err.stack
    })
    
    console.log('error',err)
}
export default globalErrorHandler;