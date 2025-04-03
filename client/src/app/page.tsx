"use client";
import type React from "react";

import { useState } from "react";
import { Loader2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { youtubeUrlSchema } from "@/lib/schemas";
import { z } from "zod";

export default function Home() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [pitch, setPitch] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      youtubeUrlSchema.parse(url);
    } catch (error) {
      alert((error as z.ZodError).errors[0].message);
      return;
    }

    try {
      const response = await fetch("/api/process", {
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

      setVideoData({
        id: data.videoId,
        title: "Sample Video Title",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      <div className="w-full max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">YouTube Pitch Transposer</h1>
          <p className="text-gray-300">
            Watch YouTube videos with adjustable pitch
          </p>
        </div>

        {!videoData && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Paste YouTube URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button
                className="bg-white text-black"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Load"
                )}
              </Button>
            </div>
          </form>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-white mb-4" />
            <p>Processing your video...</p>
          </div>
        )}

        {videoData && !isLoading && (
          <div className="space-y-4">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* This would be replaced with actual video player in a real implementation */}
                <img
                  src={`https://img.youtube.com/vi/${videoData.id}/maxresdefault.jpg`}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />

                {!isPlaying && (
                  <Button
                    onClick={togglePlay}
                    size="icon"
                    className="absolute rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm w-16 h-16"
                  >
                    <Play className="h-8 w-8 fill-white" />
                  </Button>
                )}
              </div>

              {/* Video controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={togglePlay}
                      className="text-white hover:bg-white/10"
                    >
                      {isPlaying ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-pause"
                        >
                          <rect width="4" height="16" x="6" y="4" />
                          <rect width="4" height="16" x="14" y="4" />
                        </svg>
                      ) : (
                        <Play className="h-5 w-5 fill-white" />
                      )}
                    </Button>

                    <div className="flex items-center gap-2">
                      <span className="text-sm">Pitch:</span>
                      <Slider
                        value={[pitch]}
                        min={-12}
                        max={12}
                        step={1}
                        onValueChange={(value) => setPitch(value[0])}
                        className="w-32"
                      />
                      <span className="text-sm w-8">
                        {pitch > 0 ? `+${pitch}` : pitch}
                      </span>
                    </div>
                  </div>

                  <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white w-1/3 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold">{videoData.title}</h2>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
