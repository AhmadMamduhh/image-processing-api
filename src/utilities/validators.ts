import express from 'express';

/**
 * This function is a middleware which validates the data sent to the GET /api/image endpoint.
 * It should return 400 if name, width or height are missing from the query parameters or contain invalid values.
 * It should return 404 if name of the image does not exist in the file system storage.
 * It should call next() otherwise.
 * @params req: Request, res: Response, next: Function
 * @returns void
 **/
export const imageValidator = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (Object.keys(req.query).length === 0) {
    res
      .status(400)
      .send(
        '<h2>Please provide name, width & height as query parameters like this: /api/image?name=homelander&width=200&height=200</h2>'
      );
  } else if (!req.query.name)
    res
      .status(400)
      .send('<h2>Please provide the name as a query parameter</h2>');
  else if (!req.query.width)
    res
      .status(400)
      .send('<h2>Please provide the width as a query parameter</h2>');
  else if (!req.query.height)
    res
      .status(400)
      .send('<h2>Please provide the height as a query parameter</h2>');
  else if (
    !Number(req.query.width) ||
    (Number(req.query.width) && Number(req.query.width) < 0)
  )
    res
      .status(400)
      .send('<h2>Please make sure the width value is a positive number.</h2>');
  else if (
    !Number(req.query.height) ||
    (Number(req.query.height) && Number(req.query.height) < 0)
  )
    res
      .status(400)
      .send('<h2>Please make sure the height value is a positive number.</h2>');
  else if (req.query.name !== 'homelander')
    res
      .status(404)
      .send('<h2>Image not found. Please insert a valid image name.</h2>');
  else next();
};
