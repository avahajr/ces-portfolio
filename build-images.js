// build-images.js
const fs = require("fs");
const path = require("path");

const postsDir = path.join(__dirname, "src", "posts");

fs.readdir(postsDir, (err, postDirs) => {
  if (err) {
    console.error("Error reading posts directory:", err);
    process.exit(1);
  }

  postDirs.forEach((postDir) => {
    const postNo = postDir.replace("post", ""); // Extract the post number from the directory name
    const mediaDir = path.join(postsDir, postDir, "media");

    fs.readdir(mediaDir, (err, files) => {
      if (err) {
        console.error(`Error reading media directory for post ${postNo}:`, err);
        return;
      }

      const imagePaths = files.map(
        (file) => `../posts/${postDir}/media/${file}`
      );
      fs.writeFileSync(
        path.join(postsDir, postDir, "images.json"),
        JSON.stringify(imagePaths)
      );
    });
  });
});
