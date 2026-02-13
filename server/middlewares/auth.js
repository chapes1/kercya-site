const jwt = require("jsonwebtoken");
const redisClient = require("../config/cache")

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token invalid" });
    req.user = decoded;
  });

  return true;
};

function requireAuth(req, res, next) {
  const Auth = auth(req, res, next);
  if (!Auth) res.status(401).json({ message: "Unauthorized" });
  next();
}

module.exports = requireAuth;
