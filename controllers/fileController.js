const { uploadFileAndExtractBlocks } = require("../services/dxfService");

const uploadDXF = async (req, res) => {
  try {
    const result = await uploadFileAndExtractBlocks(req.file);
    res.status(200).json({
      message: "File uploaded and blocks saved successfully.",
      ...result,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

module.exports = { uploadDXF };
