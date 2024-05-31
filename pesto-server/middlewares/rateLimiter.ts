import { Request, Response, NextFunction } from "express";

const rateLimitMiddleware = (() => {
  const clients = new Map<string, { count: number; timestamp: number }>();
  const RATE_LIMIT = 150;
  const WINDOW_SIZE = 60 * 1000;

  return (req: Request, res: Response, next: NextFunction) => {
    const clientIp = req.ip as string;
    const currentTime = Date.now();

    if (!clients.has(clientIp)) {
      clients.set(clientIp, { count: 1, timestamp: currentTime });
    } else {
      const clientData = clients.get(clientIp)!;
      const timeDifference = currentTime - clientData.timestamp;

      if (timeDifference > WINDOW_SIZE) {
        clientData.count = 1;
        clientData.timestamp = currentTime;
      } else {
        if (clientData.count >= RATE_LIMIT) {
          return res
            .status(429)
            .json({ message: "Too many requests, please try again later." });
        }

        clientData.count += 1;
      }

      clients.set(clientIp, clientData);
    }

    next();
  };
})();

export default rateLimitMiddleware;
