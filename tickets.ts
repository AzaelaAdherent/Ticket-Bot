import { MongoClient } from 'mongodb';
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json'));
const url = config.mongo.url;
const db = config.mongo.db;
const ticket_collection = config.mongo.ticket_collection;
const client = new MongoClient(url);

export async function createTicket() {
  console.log('test');
  await client.connect();
  const collection = client.db(db).collection(ticket_collection);
  collection.insertOne({
    foo: 'bar',
  }).catch(err => {
    console.error(err);
  });

}

export async function updateTicket() {
  await client.connect();
  const collection = client.db(db).collection(ticket_collection);
  
}

export async function deleteTicket() {
  await client.connect();
  const collection = client.db(db).collection(ticket_collection);
  
}

export async function uploadTicket() {
  await client.connect();
  const collection = client.db(db).collection(ticket_collection);
  
}

export async function searchTicket() {
  await client.connect();
  const collection = client.db(db).collection(ticket_collection);
  
}