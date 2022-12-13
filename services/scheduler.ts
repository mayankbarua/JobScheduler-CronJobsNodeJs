const nodeSchedule  = require("node-schedule");
import notificationService from '../services/notification'
import {fileChecker,fileCheckerWithWildCard,fileSizeChecker} from '../services/fileChecker'
import {timeValidator,fileValidator} from './validator'

async function scheduleJob(time,fileShare,fileName){
    try{
        console.log("Scheduler Function Called");

        const isValidTime = timeValidator(time);
        const isFileValid = fileValidator(fileShare,fileName);

        if(!isValidTime){
            throw new Error("Invalid Time Formate Please enter time in HH:MM Formate");
        }

        if(!isFileValid){
            throw new Error("Invalid File Share or File Name");
        }

        const timeArray = time.split(":");

        const hour = timeArray[0];
        const minute = timeArray[1];

        const currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth();
        let weekDay = currentDate.getDay();
        let year = currentDate.getFullYear();

        const rule = new nodeSchedule.RecurrenceRule();
        rule.minute = minute;
        rule.hour = hour;
        rule.date = day;
        rule.month = month
        rule.year = year;
        rule.tz = 'America/Los_Angeles';

        let runTime = new Date();

        console.log("Current Time "+runTime);

        nodeSchedule.scheduleJob(rule, function(){
            console.log("---------------------");
            console.log("Task Started at "+new Date());
            const isFilePresent = fileChecker(fileShare,fileName);

            if(isFilePresent){
                let fileSize = fileSizeChecker(fileShare,fileName);

                if(fileSize == 0){
                    notificationService("File : "+fileName+" is Present at Location "+fileShare+ " on Date : "+new Date()+" But File Contain Zero Records, Job Scheduled Time Was : "+runTime,"File Alert");
                }else{
                    notificationService("File : "+fileName+" is Present at Location "+fileShare+ " on Date : "+new Date()+", Job Scheduled Time Was : "+runTime,"File Alert");
                }
                
            }        
            else{
                notificationService("File : "+fileName+" is not Present at Location : "+fileShare+ " on Date : "+new Date()+", Job Scheduled Time Was : "+runTime,"File Alert");
            }
        
            console.log("Task Ended at "+new Date())
        });

        return runTime;

    }catch(exception){
        console.log(exception)
    }
    
}

export default scheduleJob;