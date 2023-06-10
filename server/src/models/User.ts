import mongoose, { Document, Schema } from "mongoose";

// * User Model
export interface IUser extends Document {
  username: string;
  passwordHash: string;
  isTemporary: boolean;
  expirationTime?: Date;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  isTemporary: {
    type: Boolean,
    required: true,
  },
  expirationTime: {
    type: Date,
  },
});

export const User = mongoose.model<IUser>("User", userSchema);


// * Profile Access Model
export interface IProfileAccess extends Document {
  userId: mongoose.Types.ObjectId;
  profileType: string;
  accessedAt: Date;
  expiresAt: Date;
}

const profileAccessSchema = new Schema<IProfileAccess>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  profileType: {
    type: String,
    required: true,
  },
  accessedAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

export const ProfileAccess = mongoose.model<IProfileAccess>(
  "ProfileAccess",
  profileAccessSchema
);
