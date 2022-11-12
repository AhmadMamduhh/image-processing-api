import sharp from 'sharp';

/**
 * This function resizes the image based on the width & height parameters and saves it to the storage afterwards.
 * @param width : number
 * @param height : number
 * @returns true if processing was successful, throws an error otherwise.
 */
export const processImage = async (
  width: number,
  height: number
): Promise<boolean> => {
  try {
    const data = await sharp('storage/image/homelander.jpeg').resize(
      Number(width),
      Number(height)
    );
    await data.toFile(`storage/thumbnails/homelander_${width}x${height}.jpeg`);
    return true;
  } catch (err) {
    throw new Error('Failed to process image');
  }
};
