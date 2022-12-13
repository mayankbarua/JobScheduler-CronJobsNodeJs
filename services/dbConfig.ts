import KeyVaultManager from "./keyvaultmanager";
const dotenv = require("dotenv");
dotenv.config();

async function buildConfig(){
  console.log("Started Connecting to Database");
  const keyvaultmanager = new KeyVaultManager();
  
  const userName = await keyvaultmanager.getSecret("DatabaseAdminLoginUserName");
  const password = await keyvaultmanager.getSecret("DatabaseAdminLoginPassword"); 
  
  // Create connection to database
  const config = {
    authentication: {
      options: {
        userName: userName,
        password: password
      },
      type: "default"
    },
    server: process.env["DatabaseServer"], 
    options: {
      database: process.env["DatabaseName"], 
      encrypt: true,
      rowCollectionOnRequestCompletion : true
    }
  };
  return config;
}

export default buildConfig;