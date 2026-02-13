const jwt = require("jsonwebtoken");

const generateToken = async (user, options={ expiresIn: '15s'}) => {
  try {
    const token = jwt.sign({
      id: user._id,
      role: user.role,
    }, process.env.JWT_SECRET, options);

    return token;
  } catch (err) {

    console.log(err)
    return false
  }
};

const TokenExpired = (token) => {
  try{
    const decoded = jwt.decode(token);

    if (!decoded?.exp) return null;

    const diff = (decoded.exp * 1000) - Date.now();

    if (diff <= 0) return { msg: "Token expired", expired: true };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return { time: `${days}d ${hours}h ${minutes}m`, expired: false};
  }catch(err){
    console.log(err);
    return res.json({msg: "Refresh token error", error: err.message})
  }
}

module.exports = { generateToken, TokenExpired };
