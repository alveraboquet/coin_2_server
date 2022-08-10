import mongoose from "mongoose"

const database = 'crypto'; // REPLACE WITH YOUR DB NAME
const uri = process.env.URL_CONNECT_MONGO || `mongodb+srv://giang:giangvippro@cluster0.pffyt.mongodb.net/${database}?retryWrites=true&w=majority`;
const connectMongo= async ()=> {
  try {
     mongoose.connect(uri ,{ useNewUrlParser: true, useUnifiedTopology: true }, ()=> console.log("Mongoose is connected"))
  } catch (error) {
    console.log(error)
  }
}
export const dbconnection= mongoose.connection
export default connectMongo