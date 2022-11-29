
function fileValidator(fileShare,fileName){
    if(fileShare == null || fileShare == '' || fileShare == undefined){
        throw new Error("Invalid File Share Location")
    }

    if(fileName == null || fileName == '' || fileName == undefined){
        throw new Error("Invalid File Name")
    }

    return true;
}


function timeValidator(time){
    try{
        if(time == null || time == '' || time == undefined){
            throw new Error("Invalid Time")
        }
        const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/gm;
        let result = regex.test(time);
        return result;

    }catch(exception){
        console.log(exception)
    }
}

export {
    timeValidator, fileValidator
};