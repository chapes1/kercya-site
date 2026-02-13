const RefreshToken = require("../models/RefreshToken");
const dayjs = require("dayjs");
const { generateToken } = require("./Token");
const User = require("../models/User");

const generateRefreshToken = async (userId) => {
  try {
    const userFound = await User.findById(userId);

    if (!userFound) return res.status(404).json({ message: "User not found" });

    const expiresIn = dayjs().add(7, 'day');
    const token = await generateToken(userFound, { expiresIn: "7d" });

    const refreshToken = await RefreshToken.create({
      user: userFound._id,
      expiresIn,
      token,
    });

    return refreshToken;
  } catch (err) {
    console.log(err)
    return { message: "Error generating refresh token", error: err.message };
  }
};

module.exports = {
  generateRefreshToken
};
