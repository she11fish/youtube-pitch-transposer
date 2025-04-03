import { z } from "zod";

export const youtubeUrlSchema = z.string().regex(
  /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
  "Invalid YouTube URL"
);