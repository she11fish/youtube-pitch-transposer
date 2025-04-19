"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const PreprocessedVideoPlayer = ({
  videoData,
}: {
  videoData: {
    id: string;
    title: string;
    videoUrl: string;
    audioUrl: string;
  };
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      setCurrentTime(video.currentTime);
    };

    const updateDuration = () => {
      setDuration(video.duration);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("durationchange", updateDuration);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("durationchange", updateDuration);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    const playerElement = playerRef.current;
    if (playerElement) {
      playerElement.addEventListener("mousemove", handleMouseMove);
      playerElement.addEventListener("mouseenter", handleMouseMove);
      playerElement.addEventListener("mouseleave", () => {
        if (isPlaying) {
          setShowControls(false);
        }
      });
    }

    return () => {
      clearTimeout(timeout);
      if (playerElement) {
        playerElement.removeEventListener("mousemove", handleMouseMove);
        playerElement.removeEventListener("mouseenter", handleMouseMove);
        playerElement.removeEventListener("mouseleave", () => {
          if (isPlaying) {
            setShowControls(false);
          }
        });
      }
    };
  }, [isPlaying]);

  return (
    <div className="space-y-4">
      <div
        ref={playerRef}
        className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl group"
        onDoubleClick={toggleFullscreen}
        onClick={togglePlay}
      >
        {/* Video element */}
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          src={videoData.videoUrl}
          onClick={(e) => e.stopPropagation()}
        />

        {/* Play button overlay (when paused) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity">
            <Button
              onClick={togglePlay}
              size="icon"
              className="w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/50"
            >
              <Play className="h-10 w-10 fill-white" />
            </Button>
          </div>
        )}

        {/* Video title overlay */}
        <div
          className={`absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/70 to-transparent transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-white font-medium text-lg line-clamp-1">
            {videoData.title}
          </h2>
        </div>

        {/* Controls overlay */}
        <div
          className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress bar */}
          <div className="mb-2">
            <Slider
              value={[currentTime]}
              min={0}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="[&>span:first-child]:h-1.5 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-purple-500 [&_[role=slider]:focus-visible]:ring-purple-500 [&_[role=slider]:focus-visible]:ring-2 [&_[role=slider]:focus-visible]:ring-offset-0"
            />
          </div>

          {/* Control buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Play/Pause button */}
              <Button
                onClick={togglePlay}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6 fill-white" />
                )}
              </Button>

              {/* Volume control */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={toggleMute}
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="w-24 [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-purple-500"
                />
              </div>

              {/* Time display */}
              <div className="text-white text-sm ml-2">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            {/* Fullscreen button */}
            <Button
              onClick={toggleFullscreen}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
            >
              {isFullscreen ? (
                <Minimize className="h-5 w-5" />
              ) : (
                <Maximize className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Video info */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/10">
        <h2 className="text-xl font-semibold mb-2">{videoData.title}</h2>
        <div className="text-sm text-gray-300">Video ID: {videoData.id}</div>
      </div>
    </div>
  );
};

export default PreprocessedVideoPlayer;
