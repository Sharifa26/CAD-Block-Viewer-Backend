const fs = require("fs");
const Parser = require("dxf-parser");
const parser = new Parser();

const parseDXF = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const dxf = parser.parseSync(content);

    const blocks = [];

    for (const name in dxf.blocks) {
      const block = dxf.blocks[name];
      const coords = [];

      // ✅ Check if entities exist and are an array
      if (Array.isArray(block.entities)) {
        block.entities.forEach((entity) => {
          if (entity.position) {
            coords.push({
              x: entity.position.x,
              y: entity.position.y,
            });
          }
        });
      }

      blocks.push({
        name,
        coordinates: JSON.stringify(coords),
      });
    }

    return blocks;
  } catch (error) {
    console.error("Error parsing DXF file:", error);
    throw new Error("Failed to parse DXF file");
  }
};

module.exports = { parseDXF };
