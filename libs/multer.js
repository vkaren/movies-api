const multer = require("multer");
const { url, filesRoute } = require("../config");

const upload = multer({
  dest: `public/${filesRoute}/`,
});

function getFileUrl(file) {
  return `${url}/${filesRoute}/${file}`;
}

module.exports = { upload, getFileUrl };
