const express = require("express");
const router = express.Router();
const pool = require("../mysql/mysql");
const result = require("../utils/result");
const secretKey = require("../utils/config");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const encryptedPassword = String(cryptoJS.SHA256(password));
  const query = `SELECT user_id,full_name, email, password, phone_no,DATE_FORMAT(created_time, '%d-%m-%Y %H:%i:%s') as created_time FROM blogs.user WHERE email=? and password=?`;
  pool.query(query, [email, encryptedPassword], (err, data) => {
    if (data) {
      if (data.length == 0) {
        res.send(result.createErrorResult("Invalid email or password"));
      } else {
        // res.send(result.createSuccessResult(data[0].user_id));
        const payload = {
          user_id: data[0].user_id,
        };
        const token = jwt.sign(payload, secretKey.key);

        const body = {
          token: token,
          full_name: data[0].full_name,
          email: data[0].email,
          phone_no: data[0].phone_no,
          created_time: data[0].created_time,
        };
        res.send(result.createSuccessResult(body));
      }
    } else {
      res.send(result.createErrorResult(err));
    }
  });
});

router.post("/register", (req, res) => {
  const { full_name, email, password, phone_number } = req.body;
  const encryptedPassword = String(cryptoJS.SHA256(password));
  const query = `INSERT INTO blogs.user(full_name, email, password, phone_no, created_time) VALUES(?,?,?,?,NOW())`;
  pool.query(
    query,
    [full_name, email, encryptedPassword, phone_number],
    (err, data) => {
      res.send(result.createResult(err, data));
    }
  );
});
module.exports = router;
