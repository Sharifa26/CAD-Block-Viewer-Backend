// models/block.js
module.exports = (sequelize, DataTypes) => {
  const Block = sequelize.define(
    "Block",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      file_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      block_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      block_type: {
        type: DataTypes.STRING,
      },
      x_coordinate: {
        type: DataTypes.FLOAT,
      },
      y_coordinate: {
        type: DataTypes.FLOAT,
      },
      z_coordinate: {
        type: DataTypes.FLOAT,
      },
      properties: {
        type: DataTypes.JSON,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "blocks",
      timestamps: false,
    }
  );

  Block.associate = (models) => {
    Block.belongsTo(models.File, {
      foreignKey: "file_id",
      as: "file",
    });
  };

  return Block;
};
