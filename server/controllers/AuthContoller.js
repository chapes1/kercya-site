const { generateRefreshToken } = require("../helpers/RefreshToken");
const { generateToken } = require("../helpers/Token");
const User = require("../models/User");
const redisClient = require("../config/cache");

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const userExists = await User.findOne({ email }).select("-password");
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = new User({
      username,
      email,
      password,
    });

    await user.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

const login = async (req, res) => {
  try{
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = await generateToken(user);
    user.token = token

    user.refreshToken = await generateRefreshToken(user._id);
    user.save();

    await redisClient.set("user", user);
    return res.json({ message: "User logged in successfully", token });
  }catch(err){
    console.log(err)
    return res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

module.exports = {
  register,
  login,
};
