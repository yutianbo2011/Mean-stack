const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PostSchema = require('./models/post');

mongoose.connect("mongodb+srv://Tianbo:HF8N79uUHYHqr2j@cluster0.xmj98.mongodb.net/node-angular?retryWrites=true&w=majority").then(
  ()=>{
    console.log("connect to database!");
  }
).catch(
  ()=>{
    console.log("connection failed!");
  }
);
//password HF8N79uUHYHqr2j

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new PostSchema({
    title: req.body.title,
    content: req.body.title,
  });
  post.save().then(createdPost=>{
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id,
    });
  });

});

app.get("/api/posts", (req, res, next) => {
  PostSchema.find().then((documents)=>{
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents,
    });
  }).catch(()=>{
    console.log("error");
  });
});

app.delete("/api/posts/:id", (req, res, next)=> {
  PostSchema.deleteOne({_id: req.params.id})
    .then(result=>{
      console.log(result);
      res.status(200).json({message: "Post Deleted!"});
    });
});



module.exports = app;
