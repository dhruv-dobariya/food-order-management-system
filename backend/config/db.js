// import mongoose from "mongoose";

// const connectDB = async () => {

//     await mongoose.connect("mongodb://localhost:27017/foodorder");

//     console.log("DB Connected");
// }

// export default connectDB;


import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;