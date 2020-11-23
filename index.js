const express = require("express");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");
const speakeasy = require("speakeasy");
const uudi = require("uuid");
const { JsonDB } = require("node-json-db");
const app = express();
const db = new JsonDB(new Config("myDatabase", true, false, "/"));

app.get("/api", (req, res) => res.json({ message: "welcome to the 2fa" }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port${PORT}`));
