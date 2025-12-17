"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { Search, Link as LinkIcon, Globe } from "lucide-react";
import ModeSwitcher from "./components/ModeSwitcher";
import vectorSearch from "./lib/vectoriel";
import booleanSearch from "./lib/boolean";
import { SearchResult } from "./lib/types";

type SearchMode = "Boolean" | "Vectoriel";
const SEARCH_MODE_KEY = "archiveSearchMode";

export default function ArchiveSearchPage() {
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const [activeSearchMode, setActiveSearchMode] = useState<SearchMode>(() => {
    if (typeof window === "undefined") {
      return "Boolean";
    }
    const savedMode = localStorage.getItem(SEARCH_MODE_KEY);
    if (savedMode === "Boolean" || savedMode === "Vectoriel") {
      return savedMode;
    }
    return "Boolean"; 
  });

  const placeholders = [
    "Discover 'Open Source' archives...",
    "Explore topics like 'web3'...",
    "Explore 'Cybersecurity' whitepapers...",
    "Find IT documents...",
    "Find 'Machine Learning' topics...",
    "Search for 'Blockchain'...",
  ];

  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);
  const placeholderIndex = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const typePlaceholder = (text: string, callback: () => void) => {
      let i = 0;
      setCurrentPlaceholder("");
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      intervalRef.current = setInterval(() => {
        if (i < text.length) {
          setCurrentPlaceholder(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(intervalRef.current!);
          timeoutRef.current = setTimeout(callback, 2000);
        }
      }, 50);
    };
    const animatePlaceholders = () => {
      placeholderIndex.current =
        (placeholderIndex.current + 1) % placeholders.length;
      typePlaceholder(placeholders[placeholderIndex.current], animatePlaceholders);
    };
    typePlaceholder(placeholders[0], animatePlaceholders);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleModeChange = (newMode: SearchMode) => {
    setActiveSearchMode(newMode);
    localStorage.setItem(SEARCH_MODE_KEY, newMode);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() === "") {
      setResults([]);
      setHasSearched(true);
      return;
    }
    let searchResults: SearchResult[];
    if (activeSearchMode === "Boolean") {
      searchResults = booleanSearch.search(query);
    } else {
      searchResults = vectorSearch.search(query); 
    }
    setResults(searchResults);
    setHasSearched(true);
  };

  const handleResetSearch = () => {
    setHasSearched(false);
    setQuery("");
    setResults([]);
  };

  const smoothTransition: Transition = {
    type: "tween",
    duration: 0.8,
    ease: "easeInOut",
  };
  const maskTransition: Transition = {
    type: "tween",
    duration: 0.4,
    ease: "easeOut",
  };

  return (
    <div className="relative flex w-full flex-col overflow-hidden">
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(31, 41, 55, 0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #06b6d4; border-radius: 10px; border: 2px solid rgba(31, 41, 55, 0.3); box-shadow: 0 0 10px 0px rgba(6, 182, 212, 0.7); }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #22d3ee; box-shadow: 0 0 15px 0px rgba(34, 211, 238, 0.9); }
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #06b6d4 rgba(31, 41, 55, 0.3); }
        @media (max-width: 768px) {
          .custom-scrollbar::-webkit-scrollbar { display: none; }
          .custom-scrollbar { scrollbar-width: none; }
        }
      `}</style>

      <div className="absolute right-4 top-4 z-50 md:right-8 md:top-8 scale-75 sm:scale-100 transition-transform">
        <ModeSwitcher
          currentActiveMode={activeSearchMode}
          onModeChange={handleModeChange}
        />
      </div>

      <motion.div
        layout
        transition={smoothTransition}
        className={`relative z-10 flex w-full flex-col items-center ${
          hasSearched ? "pt-16 md:pt-24" : "min-h-screen justify-center"
        }`}
      >
        <motion.h1
          layout
          transition={smoothTransition}
          onClick={hasSearched ? handleResetSearch : undefined}
          className={`text-center font-bold tracking-tight text-5xl sm:text-6xl md:text-7xl ${
            hasSearched
              ? "text-3xl md:text-4xl cursor-pointer"
              : ""
          }`}
        >
          <motion.div
            style={{
              WebkitMaskImage: hasSearched
                ? "linear-gradient(to bottom, white 100%, white 100%)"
                : "linear-gradient(to bottom, white 50%, transparent 100%)",
              maskImage: hasSearched
                ? "linear-gradient(to bottom, white 100%, white 100%)"
                : "linear-gradient(to bottom, white 50%, transparent 100%)",
            }}
            animate={{ opacity: hasSearched ? 1 : 0.8 }}
            transition={maskTransition}
          >
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Archive
            </span>
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Search
            </span>
          </motion.div>
        </motion.h1>

        <AnimatePresence>
          {!hasSearched && (
            <motion.p
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0 }}
              className="mt-4 px-4 text-center text-base sm:text-lg text-gray-400"
            >
              Discover the world's knowledge through advanced search
            </motion.p>
          )}
        </AnimatePresence>

        <motion.form
          layout
          transition={smoothTransition}
          onSubmit={handleSearch}
          className="mt-8 w-full max-w-xl px-4"
        >
          <div className="group relative rounded-full transition-all duration-300 focus-within:shadow-[0_0_25px_0px_theme(colors.cyan.500)] hover:shadow-[0_0_25px_0px_theme(colors.cyan.500)]">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-75 group-focus-within:opacity-75" />
            <div className="relative z-10 flex w-full items-center rounded-full bg-gray-900/80 px-1 py-0.5 sm:px-2 sm:py-1 backdrop-blur-sm">
              <label htmlFor="search" className="pl-3">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
              </label>
              <input
                id="search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={currentPlaceholder}
                className="w-full bg-transparent px-2 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-gray-200 placeholder-gray-500 focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="m-1 shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-1.5 sm:px-6 sm:py-2.5 
                                text-sm sm:text-base font-semibold text-white transition-all duration-200 
                                hover:from-cyan-400 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-500/30"
              >
                Search
              </motion.button>
            </div>
          </div>
        </motion.form>

        <AnimatePresence>
          {!hasSearched && (
            <motion.p
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="mt-4 text-center text-xs text-gray-500"
            >
              Search results provided by Archive.org data
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {hasSearched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="custom-scrollbar relative z-10 mx-auto mt-12 w-full max-w-6xl overflow-y-auto px-4 pb-24 max-h-[60vh]"
          >
            {results.length > 0 ? (
              <div className="space-y-6">
                <p className="text-sm text-gray-400">
                  Found {results.length} relevant results for &quot;{query}&quot;
                </p>
                {results.map((result, index) => {
                  return (
                    <motion.div
                      key={result.document.url + "-" + index}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="rounded-lg border border-gray-800 bg-gray-900/50 p-4 backdrop-blur-md 
                                  transition-all duration-300 
                                  hover:border-cyan-500/80 hover:bg-gray-800/50 
                                  hover:shadow-[0_0_20px_0px_theme(colors.cyan.500,0.3)]"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 pt-1">
                          <Globe className="h-5 w-5 text-cyan-500" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <a
                            href={result.document.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center text-lg font-semibold text-cyan-400 hover:text-cyan-300 hover:underline break-words"
                          >
                            {result.document.title}
                            <LinkIcon className="ml-2 h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                          </a>
                          <p className="mt-2 text-sm text-gray-300 break-words">
                            {result.document.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 text-center text-gray-400 backdrop-blur-md">
                <h3 className="text-lg font-semibold text-white">
                  No results found
                </h3>
                <p className="mt-2 text-sm">
                  Try a different search query. We couldn't find anything for
                  &quot;{query}&quot;.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}