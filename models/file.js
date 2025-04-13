// models/file.js
module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define(
    "File",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      file_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uploaded_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "files",
      timestamps: false,
    }
  );

  File.associate = (models) => {
    File.hasMany(models.Block, {
      foreignKey: "file_id",
      as: "blocks",
    });
  };

  return File;
};
