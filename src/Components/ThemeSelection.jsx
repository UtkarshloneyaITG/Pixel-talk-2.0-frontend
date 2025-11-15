import React, { useEffect, useState } from "react";

import { useMsgFunctions } from "../provider/msgContext";

const ThemeSelection = ({ onClose }) => {
  const {selectedTheme , setSelectedTheme, themes, handleApply , handleCancel} = useMsgFunctions()

  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 animate-fadeIn">
      <div className="theme-box bg-zinc-800 rounded-2xl shadow-2xl p-8 w-[90%] max-w-4xl relative">
        <h2 className="theme-heading text-4xl font-bold mb-8 text-center bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Choose a Theme
        </h2>

        {/* Theme Grid */}
        <div className="theme-img grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-center">
          {themes.map((theme, index) => (
            <button
              key={index}
              onClick={() => setSelectedTheme(theme)}
              className={`theme-card p-2 rounded-xl cursor-pointer transition transform hover:scale-105 hover:shadow-lg border-2 ${
                selectedTheme === theme
                  ? "border-blue-500 scale-105"
                  : "border-transparent"
              }`}
            >
              <img
                src={theme}
                alt={`Theme ${index + 1} preview`}
                className="w-full h-32 object-cover rounded-lg"
              />
            </button>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-10">
          <button
            onClick={()=>handleCancel(onClose)}
            className="px-6 py-2 bg-zinc-700 hover:bg-zinc-600 text-gray-300 rounded-lg transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={!selectedTheme}
            className={`px-6 py-2 rounded-lg text-white transition cursor-pointer ${
              selectedTheme
                ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelection;
