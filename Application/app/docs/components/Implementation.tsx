"use client";


import { useState, useEffect } from "react";
import { createPortal } from "react-dom"; 
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ToolCard from "./ToolCard";
import ImageNode from "./ImageNode";
import { CornerDownRight, CornerDownLeft, X } from "lucide-react";

export default function ImplementationDoc() {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const [isClient, setIsClient] = useState(false);

 
  useEffect(() => {
    setIsClient(true);
  }, []);

  const row1Tools = [
    { src: "/logos/nextjs.png", alt: "Next.js Logo", name: "Next.js" },
    { src: "/logos/aceternity-ui.png", alt: "Aceternity UI Logo", name: "Aceternity UI" },
    { src: "/logos/shadcn.png", alt: "Shadcn UI Logo", name: "Shadcn UI" },
    { src: "/logos/python_logo.png", alt: "Python Logo", name: "Python" },
  ];
  
  const row2Tools = [
    { src: "/logos/Cloudflare_Logo.png", alt: "Cloudflare Logo", name: "Cloudflare" },
    { src: "/logos/Hostinger_Logo.png", alt: "Hostinger Logo", name: "Hostinger" },
    { src: "/logos/Logo_OVH.png", alt: "OVHcloud Logo", name: "OVHcloud" },
  ];

  return (
    <div>
    
      <h2 className="text-3xl font-bold text-cyan-400 mb-8 text-center">
        Key Technologies & Tools Used
      </h2>

      <div className="flex flex-col items-center gap-6">
        <h4 className="text-xl font-semibold text-blue-300 text-center">
          Developement technologies
        </h4>
        <div className="flex flex-wrap justify-center gap-6">
          {row1Tools.map((tool) => (
            <ToolCard 
              key={tool.name} 
              src={tool.src} 
              alt={tool.alt} 
              name={tool.name}
            />
          ))}
        </div>
        <h4 className="text-xl font-semibold text-blue-300 text-center mt-6">
          Cloud platforms
        </h4>
        <div className="flex flex-wrap justify-center gap-6">
          {row2Tools.map((tool) => (
            <ToolCard 
              key={tool.name} 
              src={tool.src} 
              alt={tool.alt} 
              name={tool.name}
            />
          ))}
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-700/50">
        <h3 className="text-2xl font-bold text-blue-400 mb-6 text-center">
          Platform Use Case
        </h3>
        <div className="flex flex-col lg:flex-row justify-center gap-6">
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 lg:flex-1 text-center">
            <strong className="text-white text-lg block mb-2">OVHcloud</strong>
            <p className="text-gray-300 text-sm">
              Used for a high-performance VPS-2 server to host the application backend and search logic.
            </p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 lg:flex-1 text-center">
            <strong className="text-white text-lg block mb-2">Hostinger</strong>
            <p className="text-gray-300 text-sm">
              Used for the domain name for our platform.
            </p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 lg:flex-1 text-center">
            <strong className="text-white text-lg block mb-2">Cloudflare</strong>
            <p className="text-gray-300 text-sm">
              Used as a CDN to cache and distribute the application globally, ensuring fast, low-latency access for all users.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-700/50">
        <h3 className="text-2xl font-bold text-blue-400 mb-8 text-center">
          Deployment Overview
        </h3>
        
        <div className="grid grid-cols-2 gap-x-16 gap-y-4 max-w-lg mx-auto">
          <div className="col-span-2 flex justify-center">
            <ImageNode 
              src="/platforms/cloudflare-platform.png" 
              name="CDN (Cloudflare)" 
              setZoomedImage={setZoomedImage} 
            />
          </div>
          <div className="col-span-1 flex justify-end">
            <CornerDownRight size={48} className="text-cyan-500" />
          </div>
          <div className="col-span-1 flex justify-start">
            <CornerDownLeft size={48} className="text-cyan-500" />
          </div>
          <div className="col-span-1 flex justify-end">
            <ImageNode 
              src="/platforms/hostinger-platform.png" 
              name="Domain (Hostinger)" 
              setZoomedImage={setZoomedImage} 
            />
          </div>
          <div className="col-span-1 flex justify-start">
            <ImageNode 
              src="/platforms/ovh-platform.png" 
              name="VPS (OVH)" 
              setZoomedImage={setZoomedImage} 
            />
          </div>
        </div>
      </div>

     
      {isClient && zoomedImage && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setZoomedImage(null)}
          >
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { delay: 0.2 } }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute top-4 right-4 z-50 p-2 bg-white/20 rounded-full text-white hover:bg-white/40"
              onClick={() => setZoomedImage(null)}
            >
              <X size={24} />
            </motion.button>
            
            <motion.div
              layoutId={`image-${zoomedImage}`}
              className="relative w-[80vw] h-[80vh] shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            >
              <Image
                src={zoomedImage}
                alt="Zoomed platform screenshot"
                fill
                style={{ objectFit: "contain" }} 
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.getElementById('modal-root')! 
      )}
    </div>
  );
}