const router = require("express").Router();
const AuthController = require("../controllers/AuthContoller");
const RefreshTokenController = require("../controllers/RefreshTokenController");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
});

router.post("/register", limiter, AuthController.register);
router.post("/login", limiter, AuthController.login);

router.post("/refresh-token", RefreshTokenController.refreshToken);

router.post("/check-token", RefreshTokenController.checkToken);

module.exports = router;
