import { Router } from "express";
import { R_APP_SECRET } from "../config";
import { verify } from "jsonwebtoken";
import { User } from "../models";
import type { Request, Response } from "express";

const router = Router();

router.post("/refresh-token", async (req: Request, res: Response) => {
  try {
    const refreshToken = req?.body?.refreshToken || "";

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh Token not found.",
      });
    }
    const decoded = verify(refreshToken, R_APP_SECRET) as { _id: string };
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No User found associated with this token.",
      });
    }

    const token = user.signToken();
    return res.status(200).json({
      token,
      success: true,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid Refresh Token.",
    });
  }
});

export default router;
