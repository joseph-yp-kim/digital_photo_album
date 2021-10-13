import { model, Schema } from 'mongoose';

const albumSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
  },
  { timestamps: true },
);

export default model('Album', albumSchema);
