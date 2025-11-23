"use server";

import { connectToDatabase } from "@/lib/database/mongoose";
import Image from "@/lib/database/models/image.model";
import { handleError } from "@/lib/utils";

export async function searchImagesByTitle(query: string) {
  try {
    await connectToDatabase();

    const images = await Image.find({
      title: { $regex: query, $options: "i" },
    })
      .populate("author", "firstName lastName")
      .sort({ updatedAt: -1 });

    return { images: JSON.parse(JSON.stringify(images)) };
  } catch (error) {
    handleError(error);
    return { images: [] };
  }
}
