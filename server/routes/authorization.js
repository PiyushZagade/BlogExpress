const jwt = require("jsonwebtoken");

const result = require("../utils/result");
const config = require("../utils/config");

function authorization(req, res, next) {
  if (req.url == "/user/register" || req.url == "/user/login") next();
  else {
    const token = req.headers.token;
    if (token) {
      try {
        const payload = jwt.verify(token, config.key);
        // res.send(result.createSuccessResult(payload));
        req.userId = payload.user_id;
        next();
      } catch (e) {
        res.send(result.createErrorResult("Invalid Token"));
      }
    } else res.send(result.createErrorResult("Token is Missing"));
  }
}

module.exports = authorization;
