
let appInsights = require("applicationinsights");
appInsights.setup(process.env["AppInsightConnectionString"]).start(); 
let client = appInsights.defaultClient;

export default client;