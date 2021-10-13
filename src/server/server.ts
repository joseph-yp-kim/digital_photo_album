import * as express from 'express';
import apiRouter from './routes';
import * as mongoose from 'mongoose';

const app = express();

app.use(express.static('public'));
app.use(apiRouter);

const PORT = process.env.PORT || 3000;

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

mongoose
  .connect(uri)
  .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
  .catch((error) => {
    throw error;
  });
