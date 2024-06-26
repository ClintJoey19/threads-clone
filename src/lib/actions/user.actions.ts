"use server";
import { revalidatePath } from "next/cache";
import { User } from "../models/user.model";
import { connectToDB } from "../mongoose";

export const getUsers = async () => {
  try {
    connectToDB();

    const users = await User.find();

    return users;
  } catch (err) {
    console.error(err);
  }
};

interface Params {
  userId: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  path: string;
}

export const updateUser = async ({
  userId,
  username,
  name,
  image,
  bio,
  path,
}: Params): Promise<void> => {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        image,
        bio,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    console.error(error.message);
  }
};
