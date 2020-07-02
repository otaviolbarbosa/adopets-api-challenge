import { Schema, model } from 'mongoose';
import { v4 as uuid } from 'uuid';

const Product = new Schema(
  {
    _id: {
      type: String,
      default: uuid({
        random: [
          0x10,
          0x91,
          0x56,
          0xbe,
          0xc4,
          0xfb,
          0xc1,
          0xea,
          0x71,
          0xb4,
          0xef,
          0xe1,
          0x67,
          0x1c,
          0x58,
          0x36,
        ],
      }),
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
