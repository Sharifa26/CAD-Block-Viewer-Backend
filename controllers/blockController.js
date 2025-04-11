const File = require("../models/file");
const Block = require("../models/block");
const { parseDXF } = require("../services/dxfService");
const db = require("../models/sequelize");

// 1. Upload DXF file
exports.uploadDXF = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: "DXF file is required." });
    }

    const { originalname, path } = req.file;

    // 1. Save file info without path
    const uploadedFile = await db.File.create({
      filename: originalname,
      uploaded_at: new Date(), // Optional, because it defaults to NOW
    });

    // 2. Parse and prepare blocks
    const blocks = parseDXF(path);

    if (!blocks.length) {
      return res.status(400).json({ error: "No blocks found in the file." });
    }

    const blockData = blocks.map((block) => ({
      name: block.name,
      coordinates: block.coordinates,
      file_id: uploadedFile.dataValues.id,
    }));

    // 3. Store all blocks
    await db.Block.bulkCreate(blockData);

    res.status(200).json({
      message: "File uploaded and blocks saved successfully.",
      fileId: uploadedFile.id,
      blockCount: blockData.length,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Failed to process the DXF file." });
  }
};

// 2. Get paginated list of blocks
exports.getBlocks = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    const blocks = await db.Block.findAndCountAll({
      limit,
      offset,
      order: [["id", "ASC"]],
    });

    res.json(blocks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. Get block details by ID
exports.getBlockDetails = async (req, res) => {
  try {
    const block = await db.Block.findByPk(req.params.id);
    if (!block) return res.status(404).json({ message: "Block not found" });

    res.json(block);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. Search blocks by name (or partial match)
exports.searchBlocks = async (req, res) => {
  try {
    const name = req.params.name;
    if (!name) {
      return res.status(400).json({ message: "Search query missing" });
    }

    const blocks = await db.Block.findAll({
      where: {
        name: {
          [require("sequelize").Op.like]: `%${name}%`,
        },
      },
    });

    res.json(blocks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
