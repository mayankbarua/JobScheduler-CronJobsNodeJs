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

export default fileChecker;