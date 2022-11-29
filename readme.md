## Description:

* Azure ffunction implemented in Node js using node-schedule library to schedule task at specific time and fs library to read network file share
* Task schedule is stored in Azure SQL Database
* Database credentials are stored in Azure Key vault

## Update Coniguration file :

## Install Dependencies
* npm install

## Build Application
* npm run build

## Start Application
* func start

Example : 
```
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "KeyVaultURI" : "Keyvault URI where secrets are stored",
    "DatabaseServer" : "Database Server URL",
    "DatabaseName" : "sappytelemetrydbuat",
    "NotificationLogicAppUrl" : "Logic App HTTP Trigger URL"
  }
}
```
