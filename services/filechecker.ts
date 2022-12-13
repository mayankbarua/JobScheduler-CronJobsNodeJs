const fs = require('fs');
const path = "\/\/triton1\/tst_transfer\/MBARUA\/demo.txt";

function fileChecker(fileShare,fileName){
  try{
    
      if(fileShare == null || fileShare == '' || fileShare == undefined){
        throw new Error("Invalid File Share Location")
      }

      if(fileName == null || fileName == '' || fileName == undefined){
        throw new Error("Invalid File Name")
      }

      console.log("Path : "+fileShare+"\/"+fileName);

      if(fileName.endsWith('*')){
        const fileNameArray = fileName.split("*");
        let result = fileCheckerWithWildCard(fileShare,fileNameArray[0])
        if(result){
          return true;
        }
        else{
          return false;
         } 
      }
    
      if (fs.existsSync(fileShare+"\/"+fileName)) {
        console.log('file exists');
        return true;
      } else {
        console.log('file not found!');
        return false;
      }
  }catch(exception){
      console.log(exception);
  }
}

//File checker which match Start of some string. For ex : IT0* will match with IT2021 and ITTest
function fileCheckerWithWildCard(fileShare,fileName){
  let files =  fs.readdirSync(fileShare).filter(fn => fn.startsWith(fileName));
  console.log("File Path : "+fileShare," File Name : "+fileName)
  console.log(files)
  if(files.length>0){
    return true;
  }else{
    return false;
  }
}

function fileSizeChecker(fileShare,fileName) {
  let stats = fs.statSync(fileShare+"\/"+fileName);
  let fileSizeInBytes = stats.size;
  return fileSizeInBytes;
}

export {
  fileChecker, fileCheckerWithWildCard, fileSizeChecker
};