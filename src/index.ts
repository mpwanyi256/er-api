import mongoose from 'mongoose';
import Logger from './core/Logger';
import { db } from './config';
import { initCollection } from "./database/initialCollections";

// Build the connection string
const localDBURI = `mongodb://${db.user}:${encodeURIComponent(db.password)}@${
  db.host
}:${db.port}/${db.name}?authSource=admin&w=1`;

// If above gives problems the following will work:
const prodDBURI = `mongodb+srv://${encodeURIComponent(db.user)}:${encodeURIComponent(db.password)}@prodev.zrwtpt1.mongodb.net/?retryWrites=true&w=majority`

const dbURI = process.env.NODE_ENV == 'development' ? localDBURI : prodDBURI;

const options = {
  autoIndex: true,
  minPoolSize: db.minPoolSize, // Maintain up to x socket connections
  maxPoolSize: db.maxPoolSize, // Maintain up to x socket connections
  connectTimeoutMS: 60000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

function setRunValidators() {
  this.setOptions({ runValidators: true });
}

mongoose.set('strictQuery', true);

// Create the database connection
mongoose
  .plugin((schema: any) => {
    schema.pre('findOneAndUpdate', setRunValidators);
    schema.pre('updateMany', setRunValidators);
    schema.pre('updateOne', setRunValidators);
    schema.pre('update', setRunValidators);
  })
  .connect(dbURI, options)
  .then(() => {
    Logger.info('Mongoose connection done');
  })
  .catch((e) => {
    Logger.info('Mongoose connection error');
    Logger.error(e);
  });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  //trying to get collection names, if they do not exist then create them. this will run only once to inititalize db schema
  (async function ensureCollectionsExist() {
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    const collectionNames = collections.map((collection) => collection.name);

    if (!collectionNames.includes('api_keys')) {
      initCollection('api_keys');
    }

    if (!collectionNames.includes('roles')) {
      initCollection('roles');
    }

    if(!collectionNames.includes('BusinessTypes')) {
      initCollection('BusinessTypes');
    }
  })();
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  Logger.error('Mongoose connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  Logger.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  Logger.info(
    'Mongoose default connection disconnected through app termination',
  );
  process.exit(0);
});

export const connection = mongoose.connection;
