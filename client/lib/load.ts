import { z } from "zod";
import { youtubeUrlSchema } from "./schemas";
import { useVideoStore } from "@/store/video";
import { getPublicEnv } from "@/src/app/actions";

export const realtimeLoad = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  url: string,
  setVideoData: React.Dispatch<
    React.SetStateAction<{
      id: string;
      title: string;
      videoUrl: string;
      audioUrl: string;
    } | null>
  >
) => {
  setIsLoading(true);
  try {
    youtubeUrlSchema.parse(url);
  } catch (error) {
    alert((error as z.ZodError).errors[0].message);
    setIsLoading(false);
    return;
  }
  try {
    const publicEnv = await getPublicEnv();
    const apiUrl =
      publicEnv?.env.NEXT_PUBLIC_API_BASE_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${apiUrl}/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    const videoResponse = await fetch(`${apiUrl}/video/${data.videoId}`);
    const audioResponse = await fetch(`${apiUrl}/audio/${data.videoId}`);

    if (!videoResponse.ok || !audioResponse.ok) {
      throw new Error("Failed to fetch video or audio data");
    }

    const videoBlob = await videoResponse.blob();
    const audioBlob = await audioResponse.blob();

    const videoUrl = URL.createObjectURL(videoBlob);
    const audioUrl = URL.createObjectURL(audioBlob);

    setVideoData({
      id: data.videoId,
      title: data.title,
      videoUrl,
      audioUrl,
    });
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("An unknown error occurred");
    }
  }
  setIsLoading(false);
};

export const preprocessLoad = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  url: string,
  setVideoData: React.Dispatch<
    React.SetStateAction<{
      id: string;
      title: string;
      videoUrl: string;
      audioUrl: string;
    } | null>
  >
) => {
  setIsLoading(true);
  const pitch = useVideoStore.getState().pitch;
  try {
    youtubeUrlSchema.parse(url);
  } catch (error) {
    alert((error as z.ZodError).errors[0].message);
    setIsLoading(false);
    return;
  }

  try {
    const publicEnv = await getPublicEnv();
    const apiUrl =
      publicEnv?.env.NEXT_PUBLIC_API_BASE_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${apiUrl}/process`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, pitch_shift: pitch }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    const videoResponse = await fetch(
      `${apiUrl}/video/${data.videoId}_${pitch}`
    );
    if (!videoResponse.ok) {
      throw new Error("Failed to fetch video or audio data");
    }

    const videoBlob = await videoResponse.blob();

    const videoUrl = URL.createObjectURL(videoBlob);

    setVideoData({
      id: data.videoId,
      title: data.title,
      videoUrl,
      audioUrl: "",
    });
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("An unknown error occurred");
    }
  }
  setIsLoading(false);
};
