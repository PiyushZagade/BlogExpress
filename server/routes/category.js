const express = require("express");
const router = express.Router();
const pool = require("../mysql/mysql");
const result = require("../utils/result");
const secretKey = require("../utils/config");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  const query = `SELECT category_id,title, description FROM blogs.categories`;
  pool.query(query, (err, data) => {
    res.send(result.createResult(err, data));
  });
});




router.put('/update/:id',(req,res)=>{
  const {title,description}=req.body
  const query = 'update categories set title=? , description=? where category_id=?'
  pool.query(query,[title,description,req.params.id],(e,d)=>{
    res.send(result.createResult(e,d))
  })
})



router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const categoryId = parseInt(id);
  
  const deleteBlogsQuery = `DELETE FROM blogs WHERE category_id = ?;`;
  const deleteCategoryQuery = `DELETE FROM categories WHERE category_id = ?;`;

  pool.query(deleteBlogsQuery, [categoryId], (err, blogResult) => {
    if (err) {
      return res.send(result.createResult(err));
    }

    pool.query(deleteCategoryQuery, [categoryId], (err, categoryResult) => {
      if (err) {
        return res.send(result.createResult(err));
      }

      res.send(result.createResult(null, { deletedBlogs: blogResult.affectedRows, deletedCategory: categoryResult.affectedRows }));
    });
  });
});


router.post("/add-category", (req, res) => {
  const { title, description } = req.body;
  const getQuery = `SELECT * FROM blogs.categories where title=?`;
  pool.query(getQuery, [title.toLowerCase()], (err, data) => {
    if (data) {
      if (data.length != 0) {
        res.send(result.createErrorResult("Category already exists"));
      } else {
        const query = `INSERT INTO  blogs.categories(title, description) VALUES(?,?)`;
        pool.query(query, [title.toLowerCase(), description], (err, data) => {
          res.send(result.createResult(err, data));
        });
      }
    } else {
      res.send(result.createErrorResult(err));
    }
  });
});

module.exports = router;
