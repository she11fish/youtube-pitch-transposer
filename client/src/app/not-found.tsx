"use client";

import { useRouter } from "next/navigation";
import { Music, Home, Disc, Rewind, FastForward, SkipBack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function NotFound() {
  const router = useRouter();

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
        <div className="absolute bottom-20 left-20 text-white/5 transform -rotate-12">
          <Music size={80} />
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto space-y-8 relative z-10 text-center">
        {/* Broken record animation */}
        <div className="relative mx-auto w-48 h-48 mb-8">
          <motion.div
            className="absolute inset-0"
            animate={{
              rotate: [0, 20, 0, -20, 0],
              scale: [1, 1.02, 1, 0.98, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative w-full h-full">
              <Disc className="w-full h-full text-purple-400" strokeWidth={1} />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <motion.div
                className="absolute top-0 right-0 w-6 h-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full bg-red-500 rounded-full"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Error code */}
        <div className="flex items-center justify-center gap-4">
          <SkipBack className="h-12 w-12 text-white/50" />
          <h1 className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            404
          </h1>
          <FastForward className="h-12 w-12 text-white/50" />
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">Track Not Found</h2>
          <p className="text-xl text-gray-300 max-w-lg mx-auto">
            Looks like the audio track you&apos;re looking for is missing or has
            been transposed to another dimension.
          </p>
        </div>

        {/* Media player controls */}
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="w-12 h-1 bg-white/20 rounded-full"></div>
          <Rewind className="h-8 w-8 text-white/50" />
          <Button
            onClick={() => router.push("/")}
            className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold rounded-full py-6 px-8 h-auto shadow-lg shadow-purple-500/20 transition-all duration-300"
          >
            <Home className="mr-2 h-5 w-5" />
            Return Home
          </Button>
          <FastForward className="h-8 w-8 text-white/50" />
          <div className="w-12 h-1 bg-white/20 rounded-full"></div>
        </div>

        {/* Additional help */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 max-w-md mx-auto">
          <h3 className="text-lg font-medium mb-3">Need help?</h3>
          <p className="text-gray-300 mb-4">
            Try one of these options to get back on track:
          </p>
          <ul className="text-left space-y-2 text-gray-300">
            <li className="flex items-start">
              <span className="bg-purple-500/20 p-1 rounded-full mr-2 mt-0.5">
                <Music className="h-3 w-3 text-purple-400" />
              </span>
              Return to the home page and start a new session
            </li>
            <li className="flex items-start">
              <span className="bg-purple-500/20 p-1 rounded-full mr-2 mt-0.5">
                <Music className="h-3 w-3 text-purple-400" />
              </span>
              Check if the URL you entered is correct
            </li>
            <li className="flex items-start">
              <span className="bg-purple-500/20 p-1 rounded-full mr-2 mt-0.5">
                <Music className="h-3 w-3 text-purple-400" />
              </span>
              Try a different YouTube video
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
