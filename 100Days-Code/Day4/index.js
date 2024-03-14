const { MongoClient } = require('mongodb');

// Replace these with your connection details
const uri = "mongodb://localhost:27017";
const dbName = "Bank";
const collectionName = "SBI";

async function main() {
  const client = new MongoClient(uri);

  try {
    // Connect to the database
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Create a new document
    const newDocument = { name: "Bhavik ", age: 22 };
    const result = await collection.insertOne(newDocument);
    console.log("Created document:", result.insertedId);

    // Read all documents
    const documents = await collection.find().toArray();
    console.log("All documents:", documents);

    // Update an existing document
    const filter = { _id: result.insertedId }; // Use the inserted document ID
    const update = { $set: { age: 21 } }; // Update the age field

    await collection.updateOne(filter, update);
    console.log("Updated document");

    // Read the updated document
    const updatedDocument = await collection.findOne(filter);
    console.log("Updated document:", updatedDocument);

    // Delete a document
    await collection.deleteOne(filter);
    console.log("Deleted document");
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

main();
