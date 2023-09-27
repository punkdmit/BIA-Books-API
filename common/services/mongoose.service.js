const mongoose = require('mongoose');
let count = 0;

const options = {
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    bufferMaxEntries: 0, // If not connected, return errors immediately rather than waiting for reconnect
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false   
};

const connectWithRetry = async () => {
    console.log('MongoDB connection with retry');

    try { 
        await mongoose.connect("mongodb://localhost:27017/bia-books", options);
        console.log('MongoDB is connected')
    } catch(err) {
        console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
        setTimeout(connectWithRetry, 5000);
    }
};

connectWithRetry();

exports.mongoose = mongoose;
