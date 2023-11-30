import mongoose from 'mongoose';

const connectDB = (DB_URI: string | undefined): void | Promise<typeof mongoose> => {
  if (DB_URI === undefined) {
    console.log('ERROR: DB URI error - DB URI is undefined');
  } else {
    mongoose.set('strictQuery', false);
    return mongoose.connect(DB_URI);
  }
};

export default connectDB;
