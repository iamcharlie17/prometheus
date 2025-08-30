import { DataTypes } from "sequelize";
import sequalize from "@/lib/sequelize";
import bcrypt from "bcryptjs";

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  },
);

User.prototype.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// This will create the table if it doesn't exist
sequelize.sync();

export default User;
