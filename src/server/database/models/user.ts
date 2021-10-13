import { model, Schema } from 'mongoose';

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true },
);

export default model('User', userSchema);
