const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

const KeyVaultManager = class {
    constructor(){
    }
    async getSecret(secretName){
        const credential = new DefaultAzureCredential();
        const url = process.env["KeyVaultURI"];
        const client = new SecretClient(url, credential);
        const secret = await client.getSecret(secretName);
        return secret.value;
    }
}

export default KeyVaultManager;