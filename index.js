const express = require("express");
const app = express();
app.use(express.json({ extended: false }));

const fs = require('fs');

// default responce
app.get("/", (req, resp) => {
  resp.send("Welcome to the App");
});

app.get("/get-all-users", (req, resp) => {
  const users = require("./db/users.json");
  resp.send(users);
});

app.post("/add-new-user", (req, resp) => {
  const users = require("./db/users.json");
  const data = req.body;
  console.log(data, req.body);
  users.push(data);
  fs.writeFileSync("./db/users.json", JSON.stringify(users));
  resp.send(users);
});

app.get("/get-all-posts", (req, resp) => {
  const posts = require("./db/posts.json");
  resp.send(posts);
});

app.get("/get-some-posts", (req, resp) => {
  const posts = require("./db/posts.json"); // 100
  const somePosts = posts.slice(0, req.query.size);
  resp.send(somePosts);
});

app.get("/get-posts", (req, resp) => {
  const posts = require("./db/posts.json");
  const { userId } = req.query;
  const filteredPosts = posts.filter((post)=> +post.userId === +userId);
  resp.send(filteredPosts);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
