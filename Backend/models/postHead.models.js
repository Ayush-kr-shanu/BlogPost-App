module.exports = (sequelize, DataTypes) => {
const PostHead = sequelize.define("PostHead", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

// Add a one-to-one association with PostBody
PostHead.hasOne(sequelize.models.PostBody, {
  foreignKey: "postId",
  as: "postBody",
});

return PostHead
}
