const User = require("../../../models/User");
const redisClient = require("../../../config/cache");
const router = require("express").Router();

const me = async (req, res) => {
  try {    
    const user = await req.user;
    
    const cache = await redisClient.get("user", user);
    if(cache) return res.json(JSON.parse(cache));
    
    const userFromDB = await User.findUser(user.id);
    if (!userFromDB) return res.status(404).json({ message: "User not found" });

    await redisClient.set("user", userFromDB);
    return res.json(userFromDB);
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Error fetching user data", error: err.message });
  }
}

// const logout = async (req, res) => {
//   const userId = req.user._id;

//   res.json({ message: "User logged out successfully" });
// }

router.get("/me", me);
// router.post("/logout", logout);

module.exports = router