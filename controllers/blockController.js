const {
  getPaginatedBlocks,
  getBlockById,
  searchBlocksByName,
} = require("../services/blockService");

// Get paginated list of blocks
const getBlocks = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const offset = parseInt(req.query.offset) || 0;
    const result = await getPaginatedBlocks(limit, offset);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get block by id
const getBlockDetails = async (req, res) => {
  try {
    const block = await getBlockById(req.params.id);
    res.json(block);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Search blocks by name (or partial match)
const searchBlocks = async (req, res) => {
  try {
    const blocks = await searchBlocksByName(req.params.name);
    res.json(blocks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getBlocks,
  getBlockDetails,
  searchBlocks,
};
