import { Request, Response } from "express";
import { User, ProfileAccess} from "../models/User";

export const getUserRegistry = async (req: Request, res: Response) => {
  try {
    // Fetch access records from ProfileAccess Model
    const accessRecords = await ProfileAccess.find();

    // Fetch the usernames from User Model
    const userId = accessRecords.map((record) => record.userId);
    const users = await User.find({ _id: { $in: userId } });

    // Combine the access records and user data
    const accessRegistry = accessRecords.map((record) => {
      const user = users.find((user) => user._id.equals(record.userId));
      return {
        profileType: record.profileType,
        accessedAt: record.accessedAt,
        username: user ? user.username : "Unknown",
      };
    });

    res.json(accessRegistry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve access registry" });
  }
};
