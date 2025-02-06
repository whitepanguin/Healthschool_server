import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  detail: String,
  productName: String,
  email: String,
  description: String,
  additionTitle: String,
  productPrice: Number,
  additionPrice: Number,
  uploadDate: { type: Date, default: Date.now },
  PayDate: { type: Date, default: Date.now },
  tags: [String],
  imageUrl: String,
  option1:Boolean,
});

const Store = mongoose.model('Store', storeSchema,"stores");
export default Store;
