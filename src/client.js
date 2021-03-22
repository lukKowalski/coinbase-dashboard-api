const coinbase = require("coinbase");

require("dotenv").config();

const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;

const client = new coinbase.Client({
  apiKey: apiKey,
  apiSecret: apiSecret,
  strictSSL: false,
});

module.exports = client;
