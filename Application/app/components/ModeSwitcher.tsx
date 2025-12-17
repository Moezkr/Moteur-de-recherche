"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Settings, CheckCircle, Lock } from "lucide-react";

type SearchModeId = "Boolean" | "Vectoriel";

type SearchMode = {
  id: SearchModeId;
  name: string;
  description: string;
  locked: boolean;
};

const searchModes: SearchMode[] = [
  {
    id: "Boolean",
    name: "Boolean",
    description: "Exact match search with logical operators (AND, OR, NOT).",
    locked: false,
  },
  {
    id: "Vectoriel",
    name: "Vectoriel",
    description: "Represents documents and queries as vectors in a multi-dimensional space.",
    locked: false, 
  },
];

type ModeSwitcherProps = {
  currentActiveMode: SearchModeId; 
  onModeChange: (newMode: SearchModeId) => void;
};

export default function ModeSwitcher({
  currentActiveMode,
  onModeChange,
}: ModeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState<SearchModeId>(currentActiveMode);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectMode = (modeId: SearchModeId) => {
    if (!searchModes.find((m) => m.id === modeId)?.locked) {
      setSelectedMode(modeId);
    }
  };

  const handleSubmit = () => {
    onModeChange(selectedMode);
    setIsOpen(false);
  };

  const popupVariants: Variants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } },
  };

  const modeItemVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="relative z-50">
      <motion.button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-5 py-2.5 
                   font-semibold text-white shadow-lg transition-all duration-300
                   hover:from-purple-500 hover:to-blue-400 hover:shadow-purple-500/50
                   focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        <Settings className="h-5 w-5" />
        <span className="hidden sm:inline">Mode</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 mt-3 w-72 origin-top-right rounded-lg bg-gray-800/90 p-4 shadow-xl backdrop-blur-md
                        md:w-80"
          >
            <h3 className="mb-1 text-lg font-bold text-white">
              Search Algorithm Mode
            </h3>
            <p className="mb-4 text-sm text-gray-400">
              Select the algorithm for your search query.
            </p>

            <div className="space-y-3">
              {searchModes.map((mode, index) => (
                <motion.div
                  key={mode.id}
                  variants={modeItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.05 }}
                  className={`group relative cursor-pointer rounded-lg p-3 transition-all duration-200 
                                 ${
                                   selectedMode === mode.id && !mode.locked
                                     ? "bg-gradient-to-br from-cyan-600 to-blue-700 shadow-lg ring-2 ring-cyan-400"
                                     : mode.locked
                                     ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                                     : "bg-gray-700 hover:bg-gray-600/70"
                                 }`}
                  onClick={() => handleSelectMode(mode.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-grow">
                      <h4
                        className={`font-semibold ${
                          mode.locked ? "text-gray-500" : "text-white"
                        }`}
                      >
                        {mode.name}
                      </h4>
                      <p
                        className={`text-xs ${
                          mode.locked ? "text-gray-600" : "text-gray-300"
                        }`}
                      >
                        {mode.description}
                      </p>
                    </div>
                    {mode.locked ? (
                      <div className="relative ml-3 flex-shrink-0">
                        <Lock className="h-4 w-4 text-gray-500" />

                        <span className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-full mr-3 whitespace-nowrap rounded-md bg-purple-700 px-2 py-1 text-xs text-purple-100 opacity-0 shadow-lg shadow-purple-500/50 transform-gpu translate-x-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:-translate-x-2">
                          Release soon
                        </span>
                      </div>
                    ) : (
                      selectedMode === mode.id && (
                        <CheckCircle className="ml-3 h-5 w-5 text-white flex-shrink-0" />
                      )
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={handleSubmit}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-5 w-full rounded-md bg-gradient-to-r from-green-500 to-teal-600 py-2 font-semibold text-white
                         shadow-md transition-all duration-200 hover:from-green-400 hover:to-teal-500"
            >
              Confirm Selection
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}