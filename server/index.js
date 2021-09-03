import mongoose from 'mongoose';

// const MONGO_URI = 'mongodb+srv://hiseljm:Di112358\$@cluster0.ktach.mongodb.net/DDI?retryWrites=true&w=majority';

// const MONGO_URI = 'mongodb+srv://JC:codesmith@cluster0.yymiv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const MONGO_URI = 'mongodb+srv://charlesg:codesmith1234@noodle1.5i6rq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const connectDB = () => {
  return mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    dbName: 'DDI'
  })
};

export default connectDB;