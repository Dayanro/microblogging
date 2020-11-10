import { Schema, model } from "mongoose";
import { PASSWORD_PATTERN, SALT } from "../utils/constants";
import * as bcrypt from "bcryptjs";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      match: [PASSWORD_PATTERN, "Invalid password pattern"],
      select: false,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(SALT));
  next();
});

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export const UserModel = model("User", UserSchema);
