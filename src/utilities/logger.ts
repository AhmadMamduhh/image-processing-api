import express from 'express';

/**
 * This function is a middleware which logs the current API route being accessed
 * @params req: Request, res: Response, next: Function
 * @returns void
 **/
const logger = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log(`${req.url} accessed`);
  next();
};

export default logger;
