import { Schema, model } from 'mongoose';
import { v4 as uuid } from 'uuid';

const Product = new Schema(
  {
    _id: {
      type: String,
      default: uuid(),
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: Number,
    },
    amount: {
      type: String,
      required: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default model('products', Product);
