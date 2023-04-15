import { MongoClient } from 'mongodb';
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
    userid: userid,
    date_created: date,
    channelid: channelid,
    channelname: channelname
  }).catch(err => {
    console.error(err);
  });
}

export async function updateTicket() {
  await client.connect();
  const collection = client.db(db).collection('OpenTickets');
  
}

export async function deleteTicket() {
  await client.connect();
  const collection = client.db(db).collection('OpenTickets');
  
}

export async function uploadTicket() {
  await client.connect();
  const collection = client.db(db).collection('DeletedTickets');
  
}

export async function searchTicket() {
  await client.connect();
  const collection = client.db(db).collection('DeletedTickets');
  
}