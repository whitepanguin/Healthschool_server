import mongoose from 'mongoose';

const receiptSchema = new mongoose.Schema({
  storeid: { type: [String], required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  title: { type: [String], required: true },
  productPrice: { type: [String], required: true },
  option1: { type: [String], required: false },
  additionTitle: { type: [String], required: false },
  additionPrice: { type: [String], required: false },
}, { timestamps: true });

const Receipt = mongoose.model('Receipt', receiptSchema, 'receipts');

export default Receipt;