import Image from 'next/image';
import React from 'react';

interface ToolCardProps {
  src: string;
  alt: string;
  name: string;
}

export default function ToolCard({ src, alt, name }: ToolCardProps) {
  return (
    <div className="flex flex-col items-center p-4 rounded-lg 
                    bg-white/20
                    backdrop-blur-md 
                    transition-all duration-300 
                    hover:bg-white/30"> 
      
      <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: 'contain' }}
          className="" 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <p className="text-sm font-semibold text-gray-100 text-center"> 
        {name}
      </p>
    </div>
  );
}