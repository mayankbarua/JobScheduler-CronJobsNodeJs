const nodeSchedule  = require("node-schedule");
import notificationService from '../services/notification'
import fileChecker from '../services/fileChecker'
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
        let weekDay = currentDate.getDay()

        let schedule = minute+" "+hour+" "+day+" "+(month+1)+" "+weekDay;
        console.log("Job Scheduled at "+schedule)
        console.log("Current Time "+new Date());

        nodeSchedule.scheduleJob(schedule, function(){
            console.log("---------------------");
            console.log("Task Started at "+new Date());
            const isFilePresent = fileChecker(fileShare,fileName);

            if(isFilePresent){
                notificationService("File : "+fileName+" is Present at Location "+fileShare+ " on Date : "+new Date()+", Job Scheduled Time Was : "+schedule,"File Alert");
            }        
            else{
                notificationService("File : "+fileName+" is not Present at Location : "+fileShare+ " on Date : "+new Date()+", Job Scheduled Time Was : "+schedule,"File Alert");
            }
        
            console.log("Task Ended at "+new Date())
        });

        return schedule;

    }catch(exception){
        console.log(exception)
    }
    
}

export default scheduleJob;