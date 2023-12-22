const express = require("express");
const app = express();
const pool = require("./db");
const port = 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "server is on" });
});

app.get("/dbtest", async (req, res) => {
  try {
    const table = await pool.query(
      "CREATE TABLE test_tb(header VARCHAR(50) NOT NULL, message VARCHAR(50)) "
    );
    const rows = await pool.query(
      "INSERT INTO test_tb (header, message) VALUES ($1, $2)",
      ["test_db", "Creted"]
    );
    const test = await pool.query("SELECT * FROM test_tb");
    res.json(test.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(port, () => console.log(`Server has started on port: ${port}`));
