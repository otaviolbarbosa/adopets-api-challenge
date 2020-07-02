import { Schema, model } from 'mongoose';
import { v4 as uuid } from 'uuid';

const Log = new Schema(
  {
    _id: {
      type: String,
      default: uuid(),
    },
    user_id: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    ip_address: {
      type: String,
      required: true,
    },
    error: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model('logs', Log);
