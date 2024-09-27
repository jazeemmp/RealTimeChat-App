const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};
const authorizeToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Please login first" });
    }
    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = decode.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { generateToken, authorizeToken };
