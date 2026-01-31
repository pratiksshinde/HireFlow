"use client";

import React from "react";
import Image from "next/image";
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-300 via-black to-gray-500 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-700 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl px-6">
        {/* Glitch effect 404 */}
        <div className="relative inline-block mb-8">
          <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 animate-pulse">
            404
          </h1>
          <h1 className="absolute top-0 left-0 text-9xl font-black text-gray-700 opacity-30 animate-ping">
            404
          </h1>
        </div>

        {/* Glass morphism card */}
        <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 shadow-2xl border border-gray-800">
          <h2 className="text-3xl font-bold text-white mb-4 tracking-wide">
            Lost in Space
          </h2>
          
          <p className="text-gray-400 mb-8 text-lg">
            The page you're looking for has drifted into the digital void. 
            It might have been deleted, moved, or never existed at all.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.history.back()}
              className="pointer px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-gray-800/50 transform hover:scale-105 transition-all duration-200"
            >
              Go Back
            </button>
            
          </div>
        </div>

        {/* Floating elements */}
        <div className="mt-12 flex justify-center gap-4">
          <div className="w-3 h-3 bg-gray-700 rounded-full animate-bounce "></div>
          <div className="-mt-3 bg-gray-900 w-fit h-fit rounded-full animate-bounce delay-300">
            <Image src="/images/infinity.png" width={34} height={34}  alt="" />
          </div>
          <div className=" w-3 h-3 bg-gray-700 rounded-full animate-bounce delay-600"></div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;