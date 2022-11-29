const request = require('request')

function notificationService(message,subject){
    try{
      console.log("Notification Service Called");
      const options = {
          url: process.env["NotificationLogicAppUrl"],
          json: true,
          body: {
            message: message,
            subject: subject
          }
      }
      
      request.post(options, (err, res, body) => {
        if (err) {
          return console.log(err)
        }
        console.log(`Status: ${res.statusCode}`)
        return res.statusCode
      })
    }catch(exception){
      console.log(exception);
    }
    
}

export default notificationService;