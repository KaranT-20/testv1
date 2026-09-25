const errorHandler = (error,req,res,next) => {
    return res.status(500).json({
        success:false,
        message:"Internal Server Issue"
    })
}

export {errorHandler}