import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const mongourl = process.env.MONGOURL;

if (!mongourl) {
  throw new Error('MONGOURL environment variable is not defined');
}

export const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(mongourl);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1); // Exit the process with a failure code
  }
};
