import jwt from "jsonwebtoken";

export const authRequired = async (req, res, next) => {
  if (!req.cookies) {
    return res.status(401).json({
      message: "No cookies, authorization denied",
    });
  }

  const { token } = req.cookies;
  console.log(req.cookies);

  if (!token)
    return res.status(401).json({
      message: "No token, authorization denied",
    });

  try {
    req.user = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    });
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }

  next();
};
