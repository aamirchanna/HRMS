const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Neon Database Connection
const pool = new Pool({
  connectionString: "psql 'postgresql://neondb_owner:npg_NRX83vMPbqKz@ep-young-cloud-ahtob84c-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'", // Yahan Neon ka link lagayein
  ssl: { rejectUnauthorized: false }
});

// POST API: Employee Add Karna
app.post('/api/employees', async (req, res) => {
  const { name, job } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO employees (name, job) VALUES ($1, $2) RETURNING *',
      [name, job]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// GET API: Check karne ke liye
app.get('/', (req, res) => res.send("HRMS API is Running Live!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));