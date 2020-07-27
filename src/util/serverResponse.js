


exports.send= (res, {data, message,status = 200} = {})=>{

    res.status(200).json({
        status:status,
        data,
        message,
        ok: true
    })

}
