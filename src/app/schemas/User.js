import { Schema, model } from 'mongoose';
import { v4 as uuid } from 'uuid';

const User = new Schema(
  {
    _id: {
      type: String,
      default: uuid(),
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('users', User);
