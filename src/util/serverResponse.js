


module.exports = (res, {data, message,status = 200} )=>{

    res.status(status).json({
        status:status,
        data,
        message,
        ok: status<400
    })

}
