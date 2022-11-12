import express from 'express';
import routes from './routes/.';
import pageNotFound from './routes/api/404';
import logger from './utilities/logger';

export const app = express();
const port = 3003;

app.use(express.static('storage'));
app.use(logger);
app.use('/api', routes);
app.use('*', pageNotFound);

app.listen(port, () => {
  console.log('Listening to port ' + port);
});
