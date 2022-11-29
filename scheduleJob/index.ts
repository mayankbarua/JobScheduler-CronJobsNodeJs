const { Connection, Request } = require("tedious");
const TYPES = require('tedious').TYPES;
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import scheduleJob from "../services/scheduler";
import Config from '../services/dbConfig';


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
    context.log('HTTP trigger function processed a request.');

    console.log("Started GET Request");

    let result : any;
    result = await getInboundSchedule();
        
    context.res.status(200).json({"Message": "Job Is Scheduled"});
};

export default httpTrigger;