const { ObjectID } = require('mongodb');
const { readdir } = require('fs/promises');
const path = require('path');
const mongo = require('../db/mongo');

async function getRandomQuote() {
  const collection = await mongo.db.collection('quotes');
  const messages = await collection.aggregate([
    { $sample: { size: 1 } },
  ]).toArray();

  console.log(messages[0]);

  return (messages[0]);
}

async function getRandomImage() {
  const collection = await mongo.db.collection('images');
  const images = await collection.aggregate([
    { $sample: { size: 1 } },
  ]).toArray();

  return (images[0]);
}

async function getCurrentDate() {
  let currentDate = new Date()
  let year = currentDate.getFullYear()
  let month = currentDate.getMonth()
  let day = currentDate.getDate()

  return new Date(year, month, day)
}

async function checkForQod() {
  const collection = await mongo.db.collection('qod');
  const qod = await collection.findOne(
    { date: { $eq: await getCurrentDate() } },
  );
  if (qod) {
    return true;
  }
  return false;
}

async function checkForIod() {
  const collection = await mongo.db.collection('iod');
  const iod = await collection.findOne(
    { date: { $eq: await getCurrentDate() } },
  );
  if (iod) {
    return true;
  }
  return false;
}

async function setQod() {
  if (await checkForQod()) {
    throw new Error('Mod already exists');
  } else {
    const qodCollection = await mongo.db.collection('qod');
    const randomMessage = await getRandomQuote();
    const today = await getCurrentDate();
    const mod = {
      message_id: randomMessage._id,
      date: today,
    };
    await qodCollection.insertOne(mod);
    return (true);
  }
}

async function setIod() {
  if (await checkForIod()) {
    throw new Error('IOD already exists');
  } else {
    const iodCol = await mongo.db.collection('iod');
    const randomImage = await getRandomImage();
    const today = await getCurrentDate();
    const iod = {
      image_id: randomImage._id,
      date: today,
    };
    await iodCol.insertOne(iod);
    return (true);
  }
}

async function getQod() {
  const today = await getCurrentDate();
  const qodCollection = await mongo.db.collection('qod');
  const messageCollection = await mongo.db.collection('quotes');
  const mod = await qodCollection.findOne({ date: { $eq: today } });
  try {
    const message = await messageCollection.findOne(
      { _id: ObjectID(mod.message_id) },
    );
    return (message);
  } catch {
    throw new Error({
      message: 'error',
      qod: qod,
    });
  }
}

async function getIod() {
  const today = await getCurrentDate();
  const iodCol = await mongo.db.collection('iod');
  const imgCol = await mongo.db.collection('images');
  const iod = await iodCol.findOne({ date: { $eq: today } });
  try {
    const img = await imgCol.findOne(
      { _id: ObjectID(iod.image_id) },
    );
    return (img);
  } catch {
    throw new Error({
      message: 'error',
      iod: iod,
    });
  }
}

async function addImagesToDb() {
  const collection = await mongo.db.collection('images')
  const dir = './assets/images'
  const files = await readdir(dir)
  files.forEach(async (file) => {
    if(path.extname(file) == '.jpg'){
      if(await checkForImage(file)){
        return
      } else {
        collection.insertOne({"name": file})
        console.log(file, 'inserted')
        return
      }
    }
  })
  return files
}

async function checkForImage(img){
  // check if an image already exists in the db
  const collection = await mongo.db.collection('images')
  if(await collection.findOne({"name": {"$eq": img}})){
    return true
  } else {
    return false
  }
}

module.exports = {
  getRandomQuote,
  getRandomImage,
  setQod,
  setIod,
  getQod,
  getIod,
  checkForQod,
  checkForIod,
  getCurrentDate,
  addImagesToDb,
  checkForImage,
};
