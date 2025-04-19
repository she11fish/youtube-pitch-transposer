"use client";

import { redirect } from "next/navigation";
import { Music, Zap, Clock, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-2/3 left-2/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>

        {/* Musical notes decoration */}
        <div className="absolute top-20 right-20 text-white/5 transform rotate-12">
          <Music size={120} />
        </div>
        <div className="absolute bottom-20 left-20 text-white/5 transform -rotate-12">
          <Music size={80} />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full">
              <Music className="h-10 w-10 text-purple-400" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            YouTube Pitch Transposer
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transform your YouTube videos with real-time pitch control. Perfect
            for musicians, language learners, and content creators.
          </p>
        </div>

        {/* Mode selection cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Realtime mode card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 group">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-br from-green-400 to-green-600 p-3 rounded-lg mr-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold">Realtime Mode</h2>
            </div>

            <p className="text-gray-300 mb-6">
              Instantly adjust pitch while watching. Perfect for quick sessions
              and immediate feedback.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-green-500 mr-3 flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
                <span>Instant processing</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-green-500 mr-3 flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
                <span>Live pitch adjustments</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-green-500 mr-3 flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
                <span>Lower Wait Time</span>
              </div>
            </div>

            <Button
              onClick={() => redirect("/realtime")}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg py-6 shadow-lg shadow-green-500/20 group-hover:shadow-green-500/30 transition-all duration-300"
            >
              <Zap className="mr-2 h-5 w-5" />
              Start Realtime Mode
            </Button>
          </div>

          {/* Preprocess mode card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 group">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-3 rounded-lg mr-4">
                <Wand2 className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold">Preprocess Mode</h2>
            </div>

            <p className="text-gray-300 mb-6">
              Higher quality pitch shifting with advanced processing for the
              best audio experience.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-purple-500 mr-3 flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
                <span>Superior audio quality</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-purple-500 mr-3 flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
                <span>Smoother playback</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-purple-500 mr-3 flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
                <span>Advanced algorithms</span>
              </div>
            </div>

            <Button
              onClick={() => redirect("/preprocess")}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-lg py-6 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/30 transition-all duration-300"
            >
              <Clock className="mr-2 h-5 w-5" />
              Start Preprocess Mode
            </Button>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-gray-400 text-sm">
          <p>
            Choose the mode that best fits your needs. You can switch between
            modes at any time.
          </p>
          <p className="mt-2">
            For best results with music, use Preprocess mode. For quick
            adjustments, use Realtime mode.
          </p>
        </div>
      </div>
    </div>
  );
}
