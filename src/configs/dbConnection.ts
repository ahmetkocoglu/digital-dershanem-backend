import mongoose from 'mongoose';

const dbConnection = () => {
  // Connect:
  mongoose.connect(process.env.MONGODB || 'mongodb://127.0.0.1:27017/blogApi')
    .then(() => console.log('* DB Connected * '))
    .catch((err) => console.log('* DB Not Connected * ', err));
};

export default dbConnection;