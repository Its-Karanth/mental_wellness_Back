const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Connection strings
const LOCAL_MONGO_URI = 'mongodb://localhost:27017/mental-wellness-chat';
const ATLAS_MONGO_URI = 'mongodb+srv://root:root123@cluster0.t9vugvx.mongodb.net/mental-wellness-chat?retryWrites=true&w=majority&appName=Cluster0';

async function migrateData() {
  console.log('🚀 Starting MongoDB Migration to Atlas...\n');
  
  let localClient, atlasClient;
  
  try {
    // Connect to local MongoDB
    console.log('📡 Connecting to local MongoDB...');
    localClient = new MongoClient(LOCAL_MONGO_URI);
    await localClient.connect();
    console.log('✅ Connected to local MongoDB\n');
    
    // Connect to MongoDB Atlas
    console.log('☁️ Connecting to MongoDB Atlas...');
    atlasClient = new MongoClient(ATLAS_MONGO_URI);
    await atlasClient.connect();
    console.log('✅ Connected to MongoDB Atlas\n');
    
    const localDb = localClient.db('mental-wellness-chat');
    const atlasDb = atlasClient.db('mental-wellness-chat');
    
    // Get all collections from local database
    const collections = await localDb.listCollections().toArray();
    console.log(`📋 Found ${collections.length} collections to migrate:\n`);
    
    for (const collection of collections) {
      const collectionName = collection.name;
      console.log(`🔄 Migrating collection: ${collectionName}`);
      
      // Get all documents from local collection
      const documents = await localDb.collection(collectionName).find({}).toArray();
      console.log(`   📄 Found ${documents.length} documents`);
      
      if (documents.length > 0) {
        // Clear existing data in Atlas collection (optional - comment out if you want to keep existing data)
        await atlasDb.collection(collectionName).deleteMany({});
        console.log(`   🗑️  Cleared existing data in Atlas collection`);
        
        // Insert documents into Atlas collection
        const result = await atlasDb.collection(collectionName).insertMany(documents);
        console.log(`   ✅ Successfully migrated ${result.insertedCount} documents`);
      } else {
        console.log(`   ℹ️  No documents to migrate`);
      }
      
      console.log('');
    }
    
    console.log('🎉 Migration completed successfully!');
    
    // Show summary
    console.log('\n📊 Migration Summary:');
    for (const collection of collections) {
      const localCount = await localDb.collection(collection.name).countDocuments();
      const atlasCount = await atlasDb.collection(collection.name).countDocuments();
      console.log(`   ${collection.name}: ${localCount} → ${atlasCount} documents`);
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    // Close connections
    if (localClient) {
      await localClient.close();
      console.log('🔌 Closed local MongoDB connection');
    }
    if (atlasClient) {
      await atlasClient.close();
      console.log('🔌 Closed Atlas MongoDB connection');
    }
  }
}

// Run migration
migrateData().then(() => {
  console.log('\n✨ Migration script completed');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Migration script failed:', error);
  process.exit(1);
}); 