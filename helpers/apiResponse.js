exports.error= (message='Something went wrong.', data=null, status=400) => {
    return {
        status: status,
        message : message,
        data : data,
    }
}

exports.success= (message='Operation succeeded!', data=null, status=200) => {
    return {
        status: status,
        message : message,
        data : data,
    }
}

exports.validation= (data, message='Please resolve the following errors!', status=422) => {
    return {
        status: status,
        message : message,
        data : data,
    }
}
