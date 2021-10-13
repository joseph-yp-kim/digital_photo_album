import * as mongoose from 'mongoose';

const DB_CONFIGS = {
  name: 'digital_photo_album',
  host: 'localhost:27017',
  user: '',
  pass: '',
  opts: '?',
  protocol: 'mongodb',
  poolSize: 10,
};
const auth = DB_CONFIGS.user && DB_CONFIGS.pass ? `${DB_CONFIGS.user}:${DB_CONFIGS.pass}@` : '';
const uri = `${DB_CONFIGS.protocol}://${auth}${DB_CONFIGS.host}/${DB_CONFIGS.name}${DB_CONFIGS.opts}`;

export async function connect() {
  if (mongoose.connection.readyState) {
    return Promise.resolve(mongoose);
  }
  mongoose.connection.on('connected', () => console.log('Connected to Mongo'));
  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
  mongoose.connection.on('disconnected', () => console.log('Disconnected from Mongo'));
  await mongoose.connect(uri);
}
