"use client";

import { realtimeLoad, preprocessLoad } from "@/lib/load";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, Music, LinkIcon } from "lucide-react";
import { useVideoStore } from "@/store/video";
import { Slider } from "@/components/ui/slider";

export default function SearchBar({
  setIsLoading,
  url,
  setVideoData,
  setUrl,
  isLoading,
  type,
}: {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  url: string;
  setVideoData: React.Dispatch<
    React.SetStateAction<{
      id: string;
      title: string;
      videoUrl: string;
      audioUrl: string;
    } | null>
  >;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  type: "realtime" | "preprocess";
}) {
  const pitch = useVideoStore((state) => state.pitch);
  const [displayPitch, setDisplayPitch] = useState<string>(pitch.toFixed(2));
  const changePitch = useVideoStore((state) => state.changePitchFromInput);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === "realtime") {
      realtimeLoad(setIsLoading, url, setVideoData);
    }
    if (type === "preprocess") {
      preprocessLoad(setIsLoading, url, setVideoData);
    }
  };

  const handlePitchChange = (value: number[]) => {
    const newPitch = parseFloat(value[0].toFixed(2));
    setDisplayPitch(newPitch.toFixed(2));
    changePitch(newPitch);
  };

  const handlePitchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value) || value < -12 || value > 12) {
      setDisplayPitch("");
      return;
    }
    setDisplayPitch(value.toFixed(2));
    changePitch(parseFloat(value.toFixed(2)));
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-xl">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Music className="mr-2 h-5 w-5 text-purple-400" />
        {type === "realtime" ? "Realtime" : "Preprocessed"} Pitch Transposer
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* URL Input */}
        <div className="space-y-2">
          <label
            htmlFor="youtube-url"
            className="text-sm font-medium text-gray-300 flex items-center"
          >
            <LinkIcon className="mr-2 h-4 w-4 text-purple-400" />
            YouTube URL
          </label>
          <div className="relative">
            <Input
              id="youtube-url"
              type="text"
              placeholder="Paste YouTube URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-24 h-12 rounded-lg"
            />
          </div>
        </div>

        {/* Pitch Control */}
        <div className="space-y-4">
          <label
            htmlFor="pitch-control"
            className="text-sm font-medium text-gray-300"
          >
            Pitch Adjustment ({displayPitch})
          </label>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">-12</span>
            <Slider
              id="pitch-control"
              value={[parseFloat(displayPitch) || 0]}
              min={-12}
              max={12}
              step={0.01}
              onValueChange={handlePitchChange}
              className="flex-1 [&>span:first-child]:h-2 [&>span:first-child]:bg-white/10 [&_[role=slider]]:bg-purple-500 [&_[role=slider]]:w-5 [&_[role=slider]]:h-5 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&>span:first-child_span]:bg-purple-500"
            />
            <span className="text-sm text-gray-400">+12</span>
          </div>

          <div className="flex gap-4 items-center">
            <Input
              type="number"
              step={0.01}
              min={-12}
              max={12}
              placeholder="Pitch (-12 to 12)"
              value={displayPitch}
              onChange={handlePitchInput}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 w-32"
            />
            <span className="text-sm text-gray-400">
              {parseFloat(displayPitch) > 0
                ? "Higher pitch"
                : parseFloat(displayPitch) < 0
                ? "Lower pitch"
                : "Original pitch"}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold rounded-lg py-6 h-auto shadow-lg shadow-purple-500/20 transition-all duration-300"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              {type === "realtime" ? "Loading..." : "Processing..."}
            </>
          ) : (
            <>
              {type === "realtime" ? "Load Video (Realtime)" : "Process Video"}
            </>
          )}
        </Button>

        {/* Mode description */}
        <p className="text-xs text-gray-400 text-center">
          {type === "realtime"
            ? "Realtime mode adjusts pitch on-the-fly while playing the video"
            : "Preprocessing mode creates a high-quality version with adjusted pitch (takes longer)"}
        </p>
      </form>
    </div>
  );
}
