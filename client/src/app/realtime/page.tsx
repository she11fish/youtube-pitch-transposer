"use client";
import { useRef, useState } from "react";
import { Loader2, Music, Zap } from "lucide-react";
import type * as Tone from "tone";
import RealtimeVideoPlayer from "@/components/RealtimeVideoPlayer";
import SearchBar from "@/components/SearchBar";

export default function Realtime() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState<{
    id: string;
    title: string;
    videoUrl: string;
    audioUrl: string;
  } | null>(null);
  const shifterRef = useRef<null | Tone.PitchShift>(null);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-2/3 left-2/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>

        {/* Musical notes decoration */}
        <div className="absolute top-20 right-20 text-white/5 transform rotate-12">
          <Music size={120} />
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center mb-2">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full">
              <Zap className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
            Realtime Pitch Transposer
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Instantly adjust pitch while watching your YouTube videos. Perfect
            for quick sessions and immediate feedback.
          </p>

          {!videoData && (
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-green-300 flex items-center">
                <Zap className="h-3 w-3 mr-1" /> Instant processing
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-green-300 flex items-center">
                <Music className="h-3 w-3 mr-1" /> Live pitch adjustments
              </span>
            </div>
          )}
        </div>

        {!videoData && (
          <SearchBar
            setIsLoading={setIsLoading}
            url={url}
            setVideoData={setVideoData}
            setUrl={setUrl}
            isLoading={isLoading}
            type="realtime"
          />
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12 bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <div className="relative">
              <Loader2 className="h-16 w-16 animate-spin text-green-400 mb-4" />
              <div className="absolute inset-0 h-16 w-16 rounded-full border-t-2 border-green-400 animate-ping opacity-20"></div>
            </div>
            <h3 className="text-xl font-medium mb-2">
              Processing your video...
            </h3>
            <p className="text-gray-400 text-center">
              Setting up realtime pitch shifting for your video. This will only
              take a moment.
            </p>
          </div>
        )}

        {videoData && !isLoading && (
          <div className="space-y-4">
            <RealtimeVideoPlayer
              videoData={videoData}
              shifterRef={shifterRef}
            />
          </div>
        )}
      </div>
    </main>
  );
}
