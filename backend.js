const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());

const uri = "mongodb+srv://sarah-fyp-db:12345@fyp.lj49qk2.mongodb.net/FYP";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function startServer() {
  try {
    await client.connect();
    db = client.db("FYP");
    console.log("Connected to MongoDB!");

    app.get('/api/courses', async (req, res) => {
      try {
        const courses = await db.collection('Course').find({}, { projection: { _id: 0 } }).toArray();
        res.json(courses);
      } catch (err) {
        console.error("Error fetching courses:", err);
        res.status(500).send("Error fetching courses");
      }
    });

    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

startServer();
