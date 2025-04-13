const fs = require("fs");
const Parser = require("dxf-parser");
const parser = new Parser();
const db = require("../models/sequelize");

// const DxfParser = require("dxf-parser");
const parseDxf = async (buffer) => {
  //const parser = new DxfParser();
  try {
    const dxf = parser.parseSync(buffer.toString("utf8"));
    const blocksData = [];
    // --- Handle INSERT Entities in Blocks ---
    if (dxf.blocks) {
      for (const blockName in dxf.blocks) {
        const block = dxf.blocks[blockName];
        if (block.entities) {
          block.entities.forEach((entity) => {
            if (entity.type === "INSERT") {
              blocksData.push({
                name: blockName,
                type: entity.type,
                x: entity.x || 0,
                y: entity.y || 0,
                z: entity.z || 0,
                properties: {},
              });
            }
          });
        }
      }
    }
    // --- Handle SPLINE Entities in Entities Section ---
    if (dxf.entities) {
      dxf.entities.forEach((entity) => {
        if (entity.type === "SPLINE" && entity.controlPoints) {
          blocksData.push({
            name: entity.handle,
            type: entity.type,
            x: 0,
            y: 0,
            z: 0,
            properties: {
              handle: entity.handle,
              layer: entity.layer,
              controlPoints: entity.controlPoints.map((cp) => ({
                x: cp.x,
                y: cp.y,
                z: cp.z,
              })),
            },
          });
        }
      });
    }
    return blocksData;
  } catch (error) {
    console.error("Error parsing DXF:", error);
    throw new Error("Failed to parse DXF file.");
  }
};

// module.exports = parseDxf;

// Parse DXF file and extract blocks
// const parseDXF = (filePath) => {
//   try {
//     const content = fs.readFileSync(filePath, "utf-8");
//     const dxf = parser.parseSync(content);

//     const blocks = [];

//     const source = Object.keys(dxf.blocks).length
//       ? dxf.blocks
//       : { default: { entities: dxf.entities || [] } };

//     for (const blockName in source) {
//       const block = source[blockName];

//       if (!Array.isArray(block.entities)) continue;

//       block.entities.forEach((entity) => {
//         const info = {
//           block_name: blockName,
//           block_type: entity.type || "UNKNOWN",
//           x_coordinate: null,
//           y_coordinate: null,
//           z_coordinate: null,
//           properties: {
//             layer: entity.layer || null,
//             handle: entity.handle || null,
//             controlPoints: entity.controlPoints || null,
//             vertices: entity.vertices || null,
//             radius: entity.radius || null,
//           },
//         };

//         if (entity.position) {
//           info.x_coordinate = entity.position.x ?? 0;
//           info.y_coordinate = entity.position.y ?? 0;
//           info.z_coordinate = entity.position.z ?? 0;
//         }

//         if (entity.center) {
//           info.x_coordinate = entity.center.x ?? 0;
//           info.y_coordinate = entity.center.y ?? 0;
//           info.z_coordinate = entity.center.z ?? 0;
//         }

//         blocks.push(info);
//       });
//     }

//     if (!blocks.length) throw new Error("No blocks found in the file.");
//     return blocks;
//   } catch (error) {
//     console.error("Error parsing DXF file:", error);
//     throw new Error("Failed to parse DXF file");
//   }
// };

// Upload file and extract blocks
const uploadFileAndExtractBlocks = async (file) => {
  if (!file || !file.path) {
    throw new Error("DXF file is required.");
  }

  const { originalname, path } = file;

  const uploadedFile = await db.File.create({
    file_name: originalname,
    uploaded_at: new Date(),
  });

  const buffer = fs.readFileSync(path);
  const blocks = await parseDxf(buffer);

  if (!blocks.length) {
    throw new Error("No blocks found in the file.");
  }

  const blockData = blocks.map((block) => ({
    block_name: block.name,
    block_type: block.type,
    x_coordinate: block.x,
    y_coordinate: block.y,
    z_coordinate: block.z,
    properties: block.properties,
    file_id: uploadedFile.id,
  }));

  await db.Block.bulkCreate(blockData);

  return {
    fileId: uploadedFile.id,
    blockCount: blockData.length,
  };
};

module.exports = { uploadFileAndExtractBlocks };
