


module.exports = (res, {data, message,status = 200} )=>{

    res.json({
        status:status,
        data,
        message,
        ok: status<400
    })

}
