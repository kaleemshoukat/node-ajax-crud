exports.error= function (message='Something went wrong.', data=null, status=400){
    return {
        status: status,
        message : message,
        data : data,
    }
}

exports.success= function (message='Operation succeeded!', data=null, status=200){
    return {
        status: status,
        message : message,
        data : data,
    }
}

exports.validation= function (data, message='Please resolve the following errors!', status=422){
    return {
        status: status,
        message : message,
        data : data,
    }
}
