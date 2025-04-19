import { z } from "zod";

export const youtubeUrlSchema = z
  .string()
  .url()
  .refine((url: string) => {
    return (
      url.startsWith("https://www.youtube.com/") ||
      url.startsWith("https://youtu.be/")
    );
  }, "Invalid YouTube URL");
