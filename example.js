import { KnackApiClient } from './dist/index.js';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// 1. Get credentials from environment variables
const config = {
  apiKey: process.env.KNACK_API_KEY,
  applicationId: process.env.KNACK_APPLICATION_ID,
};

// Check if the credentials are provided
if (!config.apiKey || !config.applicationId) {
  console.error('Error: Missing KNACK_API_KEY or KNACK_APPLICATION_ID in your .env file.');
  console.error('Please create a .env file and add your credentials.');
  process.exit(1);
}

// 2. Create a new instance of the client
const client = new KnackApiClient(config);

console.log('Knack API client created successfully.');

// 3. Example of how to use the client to get records
async function main() {
  try {
    console.log('\nAttempting to fetch records for object_1...');
    // Replace 'object_1' with a real object key from your Knack app
    const data = await client.getRecords('object_1');
    console.log('Successfully fetched records:', data);
  } catch (error) {
    console.error('\nError fetching records:', error.message);
    console.error('This is expected if you have not replaced the placeholder credentials and object key.');
  }
}

main();
