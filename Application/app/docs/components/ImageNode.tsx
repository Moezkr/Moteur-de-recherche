"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type ImageNodeProps = {
  src: string;
  name: string;
  setZoomedImage: (src: string | null) => void;
  className?: string;
};

export default function ImageNode({
  src,
  name,
  setZoomedImage,
  className = "",
}: ImageNodeProps) {
  return (
    <motion.div
     
      onClick={() => setZoomedImage(src)}
     
      className={`relative w-48 h-32 rounded-lg border border-gray-700 bg-gray-900/50 
                  overflow-hidden cursor-pointer group ${className}`}
    >
      <Image
        src={src}
        alt={name}
        fill
        style={{ objectFit: "cover" }} 
        className="transition-transform duration-300 group-hover:scale-105"
      />
    
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
   
      <div className="absolute bottom-2 left-2 right-2 p-2 bg-black/50 rounded-md">
        <p className="text-white font-semibold text-center text-sm">{name}</p>
      </div>
    </motion.div>
  );
}