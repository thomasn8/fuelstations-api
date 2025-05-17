import { Request, Response, NextFunction } from 'express';

export function logger(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const apiCall = `${request.method} ${request.url}`;
  console.info(`Processing request: ${apiCall}`);

  response.on('finish', () => {
    console.info(
      `Request finished: ${apiCall} returned ${response.statusCode} (${response.statusMessage})`,
    );
  });

  next();
}
