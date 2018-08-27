const mongoose = require('mongoose');
const dotenv = require('dotenv')
const result = dotenv.config()
const mongoServer = process.env.MONGODB_SERVER;
const dbName = process.env.DB_NAME;
mongoose.connect(`mongodb://${mongoServer}/${dbName}`, { useNewUrlParser: true });

module.exports = mongoose;