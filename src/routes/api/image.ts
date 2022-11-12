import express from 'express';
import { promises as fsPromises } from 'fs';
import fs from 'fs';
import { imageValidator } from '../../utilities/validators';

const router = express.Router();

// This is the route responsible for processing the image and returning HTML containing the resized image to the client
router.get('/image', imageValidator, async (req, res, next) => {
  try {
    // Check if image is already cached, if yes, then return that image without reprocessing it
    if (
      fs.existsSync(
        `storage/thumbnails/${req.query.name}_${req.query.width}x${req.query.height}.jpeg`
      )
    )
      res
        .status(200)
        .send(
          `<img src="http://localhost:3003/thumbnails/${req.query.name}_${req.query.width}x${req.query.height}.jpeg" alt="Processed Homelander"/>`
        );
    // else, process the image then save it into the storage to cache it
    else {
      //TODO
    }
  } catch (err) {
    // If an error in the server occurs, return 500 status code
    console.log(err);
    res.status(500).send('INTERNAL SERVER ERROR');
  }
});

export default router;
