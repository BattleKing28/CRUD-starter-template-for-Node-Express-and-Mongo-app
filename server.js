import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';
import { connectDB } from './configs/db.js';
import { errorHandler } from './middleware/error.js';

//importing routes
import { router as blogs } from './routes/blogs.js';

//Loading env file
config({ path: './configs/config.env' });

//connecting to Database
connectDB();

//initializing express app
const app = express();

//body parser
app.use(express.json());

//dev logging middleware using morgan library
if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'));
}

const PORT = process.env.PORT;

//mount routers
app.use('/api/v1/blogs', blogs);

//using custom error handler
app.use(errorHandler);

//starting server
const server = app.listen(PORT, () => {
   console.log(
      `server started in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
         .bold
   );
});

//handle promise rejection during db connection
process.on('unhandledRejection', (err, promise) => {
   console.log(`Error: ${err.message}`.red.underline);
   //close server and exit process
   server.close(() => process.exit(1));
});
