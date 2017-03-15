// DB connection
import mongoose from 'mongoose';

const mongoUri = 'mongodb://127.0.0.1:27017/notes';

const connect = () => {
  mongoose.connect(mongoUri);

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.on('connected', () => {
    console.log(`Connected to mongo on: ${mongoUri}`);
  });

  db.on('disconnected', () => {
    console.log('Mongoose disconnected!');
  });

  // Clean up mongoose when we kill server
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      process.exit(0);
    });
  });
};

export default { connect };
