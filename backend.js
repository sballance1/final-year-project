const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());

// Links to mongodb database
const uri = "mongodb+srv://sarah-fyp-db:123@fyp.lj49qk2.mongodb.net/FYP";
const client = new MongoClient(uri, { // create client to connect to db
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

    // route 1 : get all courses. when frontend at /api/courses it shows db list on course.html page
    app.get('/api/courses', async (req, res) => {
      try {
        const courses = await db.collection('Course').find({}, { projection: { _id: 0 } }).toArray();
        res.json(courses);
      } catch (err) {
        console.error("Error fetching courses:", err);
        res.status(500).send("Error fetching courses");
      }
    });

    // route 2 : get erasmus universities 
    app.get('/api/universities/erasmus', async (req, res) => {
  try {
    const data = await db.collection('University')
      .find({ type: "Erasmus" }, { projection: { _id: 0 } })
      .toArray();

    res.json(data);
  } catch (err) {
    console.error("Error fetching Erasmus universities:", err);
    res.status(500).send("Error fetching Erasmus universities");
  }
});

// route 3: get study abroad universities 
    app.get('/api/universities/studyabroad', async (req, res) => {
  try {
    const data = await db.collection('University')
      .find({ type: "Study_abroad" }, { projection: { _id: 0 } })
      .toArray();

    res.json(data);
  } catch (err) {
    console.error("Error fetching Study Abroad universities:", err);
    res.status(500).send("Error fetching Study Abroad universities");
  }
});



    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000'); // backend available at http://localhost:3000
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

startServer();
