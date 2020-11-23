const express = require("express");
const bodyParser = require("body-parser");
const JsonDB = require("node-json-db").JsonDB;
const Config = require("node-json-db/dist/lib/JsonDBConfig").Config;
const uuid = require("uuid");
const speakeasy = require("speakeasy");

const app = express();
const db = new JsonDB(new Config("myDataBase", true, false, "/"));

app.get("/api", (req, res) => res.json({ message: "welcome to the 2fa" }));

///register user & temp secret
app.post("/api/register", (req, res) => {
  const id = uuid.v4();
  try {
    const path = `/user/${id}`;
    // Create temporary secret until it it verified
    const temp_secret = speakeasy.generateSecret();
    // Create user in the database
    db.push(path, { id, temp_secret });
    // Send user id and base32 key to user
    res.json({ id, secret: temp_secret.base32 });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error generating secret key" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port${PORT}`));
