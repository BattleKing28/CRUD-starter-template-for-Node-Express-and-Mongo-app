import mongoose from 'mongoose';

const connectDB = async () => {
   const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
   });

   console.log(
      `Mongo db connected: ${conn.connection.host}`.cyan.bold.underline
   );
};

export { connectDB };
