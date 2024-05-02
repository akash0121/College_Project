const jwt = require("jsonwebtoken");
function verifyJWT(req, res, next) {
  const token = req.headers["authorization"];
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }
    req.user = data;
    console.log(req.user)
    next();
  });
}
module.exports = verifyJWT;