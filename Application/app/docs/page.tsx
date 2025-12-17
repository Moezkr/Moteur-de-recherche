"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import IntroductionDoc from "./components/Introduction";
import ImplementationDoc from "./components/Implementation";
import VectorielDoc from "./components/vectoriel";
import BooleanDoc from "./components/Boolean";


type DocPage = "Introduction" | "Implementation" | "Boolean" | "Vectoriel"  ;

export default function DocsPage() {
 
  const [activePage, setActivePage] = useState<DocPage>("Introduction");

 
  const navItemTransition = { type: "spring", stiffness: 400, damping: 30 } as const;

  return (
    <div className="relative z-10 flex min-h-screen w-full flex-col items-center px-4 pt-24 text-white">
      <div className="w-full max-w-7xl pb-20">
        
        <header className="mb-8 flex flex-col items-center gap-4 sm:relative sm:py-4 sm:justify-center">
          <h1 className="text-5xl font-bold text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Search
            </span>
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Docs
            </span>
          </h1>
          <Link 
            href="/" 
            className="rounded-md px-4 py-2 font-semibold text-cyan-400 
                       transition-all hover:bg-cyan-900/50
                       sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2"
          >
            &larr; Back to Search
          </Link>
        </header>
        
        <main className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-md">
          
          <div className="mb-6 flex justify-center">
            <NavigationMenu>
         
              <NavigationMenuList className="flex-wrap justify-center">
                
                <NavigationMenuItem>
                  <motion.div
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "cursor-pointer transition-all duration-300",
                 
                      "h-9 px-3 text-xs sm:h-10 sm:px-4 sm:py-2 sm:text-sm",
                      activePage === "Introduction" 
                        ? "bg-cyan-800/50 text-cyan-200 shadow-[0_0_15px_2px_rgba(6,182,212,0.5)]" 
                        : "bg-transparent text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                    )}
                    onClick={() => setActivePage("Introduction")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={navItemTransition}
                  >
                    Introduction
                  </motion.div>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <motion.div
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "cursor-pointer transition-all duration-300",
                   
                      "h-9 px-3 text-xs sm:h-10 sm:px-4 sm:py-2 sm:text-sm",
                      activePage === "Implementation" 
                        ? "bg-cyan-800/50 text-cyan-200 shadow-[0_0_15px_2px_rgba(6,182,212,0.5)]" 
                        : "bg-transparent text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                    )}
                    onClick={() => setActivePage("Implementation")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={navItemTransition}
                  >
                    Implementation
                  </motion.div>
                </NavigationMenuItem>


                <NavigationMenuItem>
                  <motion.div
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "cursor-pointer transition-all duration-300",
                    
                      "h-9 px-3 text-xs sm:h-10 sm:px-4 sm:py-2 sm:text-sm",
                      activePage === "Boolean" 
                        ? "bg-cyan-800/50 text-cyan-200 shadow-[0_0_15px_2px_rgba(6,182,212,0.5)]" 
                        : "bg-transparent text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                    )}
                    onClick={() => setActivePage("Boolean")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={navItemTransition}
                  >
                    Boolean Search
                  </motion.div>
                </NavigationMenuItem>
                




                <NavigationMenuItem>
                  <motion.div
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "cursor-pointer transition-all duration-300",
                  
                      "h-9 px-3 text-xs sm:h-10 sm:px-4 sm:py-2 sm:text-sm",
                      activePage === "Vectoriel" 
                        ? "bg-cyan-800/50 text-cyan-200 shadow-[0_0_15px_2px_rgba(6,182,212,0.5)]" 
                        : "bg-transparent text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                    )}
                    onClick={() => setActivePage("Vectoriel")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={navItemTransition}
                  >
                    Vectoriel
                  </motion.div>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          </div>

         
          <motion.div 
            layout
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="rounded-md bg-gray-900/50 p-6 min-h-[400px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activePage === "Introduction" && <IntroductionDoc />}
                {activePage === "Implementation" && <ImplementationDoc />} 
                {activePage === "Vectoriel" && <VectorielDoc />}
                {activePage === "Boolean" && <BooleanDoc />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </main>
      </div>
    </div>
  );
}