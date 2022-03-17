import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { MongoClient } from "mongodb";

let DATABASE_NAME = "watchdog";

/* Do not modify or remove this line. It allows us to change the database for grading */
if (process.env.DATABASE_NAME) DATABASE_NAME = process.env.DATABASE_NAME;

const api = express.Router();
let conn = null;
let db = null;
let Trackers = null;

const initAPI = async app => {
  app.set("json spaces", 2);
  app.use("/api", api);

  //TODO: Initialize database connection
  conn = await MongoClient.connect("mongodb://localhost");
  db = conn.db(DATABASE_NAME);
  Trackers = db.collection("trackers");
};

api.use(bodyParser.json());
api.use(cors());

//TODO: Add endpoints
api.get("/trackers", async (req, res) => {
  let trackers = await Trackers.find().toArray()
  trackers = trackers.map(t => t['title']);
  res.json({trackers: trackers});
});

api.post("/trackers", async (req, res) => {
  let { title, url, targetPrice } = req.body;
  let tracker = await Trackers.findOne({title});
  if (tracker) {
    res.status(400).json({error: `${title} already exists`});
    return;
  }
  await Trackers.insertOne({title: title, url: url, targetPrice: targetPrice});
  tracker = await Trackers.findOne({title});
  res.json(tracker);
});

api.use("/trackers/:title", async (req, res, next) => {
  let title = req.params.title;
  let tracker = await Trackers.findOne({title});
  res.locals.tracker = tracker;
  next();
});

api.get("/trackers/:title", (req, res) => {
  let { tracker } = res.locals;
  delete tracker._id;
  res.json(tracker);
});

api.delete("/trackers/:title", async (req, res) => {
  let {tracker} = res.locals;
  await Trackers.deleteOne({title: tracker.title});
  res.json({success: true});
});

/* Catch-all route to return a JSON error if endpoint not defined */
api.all("/*", (req, res) => {
  res.status(404).json({ error: `Not found: ${req.method} ${req.url}` });
});

export default initAPI;
