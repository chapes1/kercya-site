const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      required: true,
      default: "user",
    },
    token: {
      type: String,
    },
    refreshToken: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RefreshToken"
    },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.findUser = function (userId) {
  return this.findById(userId)
    .select("_id username email role createdAt updatedAt")
    .lean();
};


module.exports = mongoose.model("User", UserSchema);
