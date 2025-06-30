const fs = require('fs');
const path = require('path');

console.log('🔧 MongoDB Atlas Setup Guide');
console.log('============================\n');

console.log('To connect to MongoDB Atlas, follow these steps:\n');

console.log('1. Go to MongoDB Atlas (https://cloud.mongodb.com)');
console.log('2. Create a new cluster or use an existing one');
console.log('3. Click "Connect" on your cluster');
console.log('4. Choose "Connect your application"');
console.log('5. Copy the connection string\n');

console.log('The connection string should look like this:');
console.log('mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority\n');

console.log('Replace the following parts:');
console.log('- username: Your MongoDB Atlas username');
console.log('- password: Your MongoDB Atlas password');
console.log('- cluster: Your cluster name');
console.log('- database: Your database name (e.g., mental-wellness-chat)\n');

console.log('Then create a .env file in the backend directory with:');
console.log('MONGO_URI=your_connection_string_here\n');

console.log('Example .env file content:');
console.log('MONGO_URI=mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/mental-wellness-chat?retryWrites=true&w=majority');
console.log('JWT_SECRET=your-secret-key-change-in-production');
console.log('GROQ_API_KEY=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\n');

console.log('After creating the .env file, restart your backend server.\n');

console.log('Need help? Check out: https://docs.atlas.mongodb.com/getting-started/'); 