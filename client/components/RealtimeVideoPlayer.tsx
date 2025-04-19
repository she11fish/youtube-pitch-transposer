"use client";

import type React from "react";

import { Slider } from "@/components/ui/slider";
import { useVideoStore } from "@/store/video";
import { useState, useRef, useEffect, type RefObject } from "react";
import * as Tone from "tone";
import { Play, Pause, Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";

const RealtimeVideoPlayer = ({
  videoData,
  shifterRef,
}: {
  shifterRef: RefObject<Tone.PitchShift | null>;
  videoData: {
    id: string;
    title: string;
    videoUrl: string;
    audioUrl: string;
  };
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [audioVolume, setAudioVolume] = useState(1);
  const playerRef = useRef<null | Tone.Player>(null);
  const pitch = useVideoStore((state) => state.pitch);
  const changePitch = useVideoStore((state) => state.changePitchFromSlider);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(event.target.value);
    setAudioVolume(newVolume);

    playerRef.current!.volume.value = newVolume;
  };

  useEffect(() => {
    if (videoData) {
      initializeAudio();
    }
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current!;

    const handlePlay = () => {
      playerRef.current!.start(0, videoElement.currentTime);
      setIsPlaying(true);
    };

    const handlePause = () => {
      playerRef.current!.stop();
      setIsPlaying(false);
    };

    const handleSeeked = () => {
      if (!videoElement.paused && playerRef.current!.state == "started") {
        playerRef.current?.start(0, videoElement.currentTime);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(videoElement.duration);
    };

    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("pause", handlePause);
    videoElement.addEventListener("seeked", handleSeeked);
    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("durationchange", handleDurationChange);

    return () => {
      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("pause", handlePause);
      videoElement.removeEventListener("seeked", handleSeeked);
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("durationchange", handleDurationChange);
    };
  }, []);

  useEffect(() => {
    if (shifterRef.current) {
      shifterRef.current.pitch = pitch;
    }
  }, [pitch]);

  const initializeAudio = async () => {
    if (!playerRef.current) {
      const player = new Tone.Player({
        url: videoData.audioUrl,
        loop: false,
        autostart: false,
      });
      await Tone.loaded();
      playerRef.current = player;
    }

    if (!shifterRef.current) {
      const pitchShift = new Tone.PitchShift({
        pitch,
      }).toDestination();
      shifterRef.current = pitchShift;
      playerRef.current.connect(pitchShift);
    }

    shifterRef.current.pitch = pitch;
  };

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
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
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

    const playerElement = containerRef.current;
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
        ref={containerRef}
        className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl group"
        onDoubleClick={toggleFullscreen}
        onClick={togglePlay}
      >
        {/* Video element */}
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          muted
          onClick={(e) => e.stopPropagation()}
        >
          <source src={videoData.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

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
              step={0.01}
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

              {/* Pitch control */}
              <div className="flex items-center gap-2 ml-2">
                <span className="text-sm text-white">Pitch:</span>
                <Slider
                  value={[pitch]}
                  min={-12}
                  max={12}
                  step={0.01}
                  onValueChange={changePitch}
                  className="w-32 [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-purple-500"
                />
                <span className="text-sm text-white w-8">
                  {pitch > 0 ? `+${pitch.toFixed(2)}` : pitch.toFixed(2)}
                </span>
              </div>

              {/* Time display */}
              <div className="text-white text-sm ml-2">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            {/* Volume control (using original input but styled) */}
            <div className="flex items-center gap-2 mr-2">
              <span className="text-sm text-white">Volume:</span>
              <input
                type="range"
                min="0"
                max="10"
                step="0.01"
                value={audioVolume}
                onChange={handleVolumeChange}
                className="w-24 h-1 bg-white/30 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
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

export default RealtimeVideoPlayer;
