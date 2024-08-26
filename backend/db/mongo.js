const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.MONGO_CON_STR;

var _db;
var _client;

async function mongoConnect() {
    _client = await MongoClient.connect(url);
    _db = await _client.db('inspiration');
    module.exports.db = _db;
}

function getDb() {
  return _db;
}

async function mongoClose() {
  await _client.close();
  return;
}

module.exports = {
  mongoConnect,
  getDb,
  mongoClose,
}
