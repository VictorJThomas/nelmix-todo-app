import mongoose, { Document, Schema } from "mongoose";

// * User Model
interface UserDocument extends Document {
  username: string;
  passwordHash: string;
  isTemporary: boolean;
  expirationTime?: Date;
}

const userSchema = new Schema<UserDocument>({
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

export const User = mongoose.model<UserDocument>("User", userSchema);

// * Profile Access Model
interface ProfileAccesDocument extends Document {
  userId: mongoose.Types.ObjectId;
  profileType: string;
  accessedAt: Date;
}

const profileAccessSchema = new Schema<ProfileAccesDocument>({
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
});

export const ProfileAccess = mongoose.model<ProfileAccesDocument>(
  "ProfileAccess",
  profileAccessSchema
);
