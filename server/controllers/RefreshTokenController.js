const { generateToken, TokenExpired } = require("../helpers/Token");
const RefreshToken = require("../models/RefreshToken");
const User = require("../models/User");

const refreshToken = async (req, res) => {
  try{
    const { token } = req.body;

    const user = await User.findOne({ token: token });
    if (!user) return res.status(400).json({ msg: "Invalid token" });

    const refreshToken = await RefreshToken.findById({ _id: user.refreshToken })
    const refreshTokenExpired = TokenExpired(refreshToken.token);

    if (refreshTokenExpired.expired) return res.status(400).json({ msg: "Refresh token expired" });

    const newToken = await generateToken(user);
    
    user.token = newToken
    user.save()

    return res.json({ message: "Token refreshed successfully", newToken });
  }catch(err){
    console.log(err);
    return res.json({msg: "Erro: ", erro: err.message})
  }
};

const checkToken = (req, res) => {
  const { token } = req.body

  return res.json(TokenExpired(token));
}

module.exports = {
  refreshToken,
  checkToken
};
