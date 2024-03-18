import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];






app.get("/", async (req, res) => {
  const response = await db.query("SELECT * FROM items ORDER BY id ASC");
   items = response.rows;

  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  // items.push({ title: item });
  try {
     await db.query("INSERT INTO items (title) VALUES ($1);",
     [item]
    );
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
  
});

app.post("/edit", (req, res) => {
  const updateItemRow = req.body.updatedItemId;
  const itemToUpdate = req.body.updatedItemTitle;

  
  
  
});

app.post("/delete", (req, res) => {});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
