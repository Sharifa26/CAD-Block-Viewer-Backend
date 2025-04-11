const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload"); // import the upload middleware
const {
  uploadDXF,
  getBlocks,
  getBlockDetails,
  searchBlocks,
} = require("../controllers/blockController");

router.post("/upload", upload.single("file"), uploadDXF); // use upload middleware here
router.get("/blocks", getBlocks);
router.get("/blocks/:id", getBlockDetails);
router.get("/blocks/search/:name", searchBlocks);

module.exports = router;
