const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow frontend to access backend

const uri = "mongodb+srv://sarah-fyp-db:12345@fyp.lj49qk2.mongodb.net/"; // Replace with your Atlas URI
const client = new MongoClient(uri);

app.get('/api/courses', async (req, res) => {
  try {
    await client.connect();
    const db = client.db("FYP");
    const courses = await db.collection('Course').find({}, { projection: { _id: 0 } }).toArray();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching courses");
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
