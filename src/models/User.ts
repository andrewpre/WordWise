import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  createdAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const User: mongoose.Model<IUser> =
  mongoose.models?.User || mongoose.model<IUser>("User", UserSchema);
export default User;
