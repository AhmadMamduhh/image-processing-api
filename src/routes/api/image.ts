import express from 'express';
import fs from 'fs';
import { processImage } from '../../utilities/image-processing';
import { imageValidator } from '../../utilities/validators';

const router = express.Router();

// This is the route responsible for processing the image and returning HTML containing the resized image to the client
router.get(
  '/image',
  imageValidator,
  async (req: express.Request, res: express.Response) => {
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
        await processImage(Number(req.query.width), Number(req.query.height));
        res
          .status(200)
          .send(
            `<img src="http://localhost:3003/thumbnails/${req.query.name}_${req.query.width}x${req.query.height}.jpeg" alt="Processed Homelander"/>`
          );
      }
    } catch (err) {
      // If an error in the server occurs, return 500 status code
      console.log(err);
      res.status(500).send('INTERNAL SERVER ERROR');
    }
  }
);

export default router;
