/* eslint-disable import/default */
import app from './app';
import logger from './logger';

const port = process.env.PORT || 5005;

app.listen(port, err => {
  if (err) {
    logger.error(`ERROR: ${err.message}`);
  } else {
    logger.verbose(`Listening on port ${port}`);
  }
});
