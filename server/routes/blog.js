const express = require("express");
const router = express.Router();
const pool = require("../mysql/mysql");
const result = require("../utils/result");

//view my blog
router.get("/", (req, res) => {
  const query = `select blog_id,blogs.title,contents, blogs.created_time,blogs.user_id, blogs.category_id, categories.title as cattitle,description,user.full_name from categories,blogs,user where blogs.category_id=categories.category_id and blogs.user_id=user.user_id and user.user_id=?`;
  pool.query(query, [req.userId], (err, data) => {
    res.send(result.createResult(err, data));
  });
});

//view All blogs
router.get("/all", (req, res) => {
  const query = `select blog_id,blogs.title,contents, blogs.created_time,blogs.user_id, blogs.category_id, categories.title as cattitle,description,user.full_name from categories,blogs,user where blogs.category_id=categories.category_id and blogs.user_id=user.user_id`;
  pool.query(query, (err, data) => {
    res.send(result.createResult(err, data));
  });
});


//by title searching for blogs
router.get("/title", (req, res) => {
  const { title } = req.query; // get title from query params
  const query = `SELECT blog_id, blogs.title, contents, blogs.created_time, blogs.user_id, blogs.category_id, categories.title AS cattitle, description, user.full_name 
                 FROM categories, blogs, user 
                 WHERE blogs.category_id = categories.category_id 
                   AND blogs.user_id = user.user_id 
                   AND blogs.title LIKE ?`;
  pool.query(query, [`%${title}%`], (err, data) => {
    res.send(result.createResult(err, data));
  });
});



//view specific blog 
router.get("/:id", (req, res) => {
  const query = `select blog_id,blogs.title,contents,created_time,user_id, blogs.category_id, categories.title as cattitle,description from categories,blogs where blogs.category_id=categories.category_id and user_id=? and blog_id=?`;
  pool.query(query, [req.userId,req.params.id], (err, data) => {
    res.send(result.createResult(err, data));
  });
});


router.put('/update/:id', (req, res) => {
  const { title, contents, category_id } = req.body
  const query = `UPDATE blogs SET title=?,contents=?,created_time=NOW(),category_id=? WHERE blog_id=? and user_id=?;`
  pool.query(query, [title, contents, category_id, req.params.id, req.userId], (e, d) => {
    res.send(result.createResult(e, d))
  })
})

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM blogs.blogs WHERE blog_id=? and user_id=?;`;
  pool.query(query, [parseInt(id), req.userId], (err, data) => {
    res.send(result.createResult(err, data));
  });
});


router.post("/add-blog", (req, res) => {
  const { title, contents, category_id } = req.body;
  const sql = `INSERT INTO  blogs(title, contents,created_time,user_id, category_id) VALUES(?,?,NOW(),?,?)`;
  pool.query(sql, [title.toLowerCase(), contents, req.userId, category_id], (err, data) => {
    res.send(result.createResult(err, data));
  })

})


module.exports = router;
