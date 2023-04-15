import { MongoClient } from 'mongodb';
import { Message } from "discord.js";
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json'));
const url = config.mongo.url;
const db = config.mongo.db;
const client = new MongoClient(url);

export async function isTicket(channelid: string) {
  await client.connect();
  const collection = client.db(db).collection('OpenTickets');

  return await collection.findOne({ channelid: channelid });
}

export async function createTicket(userid: string, date: Date, channelid: string, channelname: string) {
  await client.connect();
  const collection = client.db(db).collection('OpenTickets');

  collection.insertOne({
    created_by: userid,
    date_created: date,
    channelid: channelid,
    channelname: channelname,
    messages: []
  }).catch(err => {
    console.error(err);
  });
}

export async function addMessage(message: Message) {
  await client.connect();
  const collection = client.db(db).collection('OpenTickets');
  
  const filter = { channelid: message.channel.id };
  const update = {
    $push: {
      messages: message.toJSON(),
    },
  };

  collection.updateOne(filter, update).then((result) => {
    // console.log(`${result.modifiedCount} document updated.`);
  }).catch((err) => {
    console.error("Error updating document:", err);
  });
}

export async function updateTicket() {
  await client.connect();
  const collection = client.db(db).collection('OpenTickets');
  
}

export async function deleteTicket(userid: string, date: Date, channelid: string, channelname: string, category: string, reason: string) {
  await client.connect();
  const collection = client.db(db).collection('OpenTickets');

  console.log('deleting..');

  collection.updateOne( { channelid: channelid }, {
    $set: { channelname: channelname, category: category, date_deleted: date, deleted_by: userid, reason: reason }
  });

  collection.aggregate([
    { $match: { channelid: channelid } },
    { $merge: "DeletedTickets" }
  ], { allowDiskUse: true, cursor: { batchSize: 0 } }).toArray().then((result) => {
    console.log(`${result.length} documents moved to DeletedTickets collection.`);
    collection.deleteMany({ channelid: channelid }).then((deleteResult) => {
      console.log(`${deleteResult.deletedCount} documents deleted from original collection.`);
    }).catch((deleteErr) => {
      console.error("Error deleting documents from original collection:", deleteErr);
    });
  }).catch((err) => {
    console.error("Error moving documents:", err);
  });
  
}

export async function uploadTicket() {
  await client.connect();
  const collection = client.db(db).collection('DeletedTickets');
  
}

export async function searchTicket() {
  await client.connect();
  const collection = client.db(db).collection('DeletedTickets');
  
}