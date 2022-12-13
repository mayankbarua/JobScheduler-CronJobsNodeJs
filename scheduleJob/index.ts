const { Connection, Request } = require("tedious");
const TYPES = require('tedious').TYPES;
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import scheduleJob from "../services/scheduler";
import Config from '../services/dbConfig';
import {fileChecker,fileCheckerWithWildCard,fileSizeChecker} from '../services/fileChecker'
import client from '../services/logger'
const nodeSchedule  = require("node-schedule");


async function getInboundSchedule(){
  const config = await Config();
  const connection = new Connection(config);
  const todaysDate = new Date().toLocaleDateString('en-US');
  return new Promise(resolve => {
      connection.on('connect', function(err) {
          if(err) {
              console.log('Error: ', err)
          }
          console.log("Connected to DB");
          const request = new Request('select Process_Id,File_share,Filename,Time,Stakeholder_alias from inboundSchedule where date=@date', function(err, rowCount,rows) {
              console.log("Number of Rows Returned "+rowCount);
              resolve(rows);
          });

          request.addParameter('date', TYPES.VarChar, todaysDate);
          
          request.on('row', function(columns) {
            let processId = columns[0].value;
            let fileSharePath = columns[1].value;
            let fileName = columns[2].value;
            let time = columns[3].value;
            let alias = columns[4].value;

            console.log(processId+" "+fileSharePath+" "+fileName+" "+time+" "+alias)

            scheduleJob(time,fileSharePath,fileName);

          });
          connection.execSql(request);
    }); 
    connection.connect();
});  
}


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    client.trackTrace({message: "HTTP trigger function processed a request."});
    
    context.log('HTTP trigger function processed a request.');

    client.trackTrace({message: "Started GET Request"});
    
    console.log("Started GET Request");

    let result : any;
    result = await getInboundSchedule();

    //Call A Function to Run at Every 1 Min
    // nodeSchedule.scheduleJob("*/1 * * * *", function(){
    //     fileChecker('\/\/triton1\/tst_transfer\/MBARUA','IT*')
    // });    

    client.trackTrace({message: "Job Is Scheduled"});
    
    context.res.status(200).json({"Message": "Job Is Scheduled"});
};

export default httpTrigger;