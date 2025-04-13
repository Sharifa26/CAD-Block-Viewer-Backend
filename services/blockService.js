const db = require("../models/sequelize");
const { Op } = require("sequelize");

// Get paginated list of blocks
const getPaginatedBlocks = async (limit = 10, offset = 0) => {
  return db.Block.findAndCountAll({
    limit,
    offset,
    order: [["id", "ASC"]],
  });
};

// Get block details by ID
const getBlockById = async (id) => {
  const block = await db.Block.findByPk(id);
  if (!block) throw new Error("Block not found");
  return block;
};

// Search blocks by name (or partial match)
const searchBlocksByName = async (name) => {
  if (!name) throw new Error("Search query missing");

  return db.Block.findAll({
    where: {
      block_name: {
        [Op.like]: `%${name}%`,
      },
    },
  });
};

module.exports = {
  getPaginatedBlocks,
  getBlockById,
  searchBlocksByName,
};
