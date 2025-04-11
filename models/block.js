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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coordinates: {
        type: DataTypes.TEXT,
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
