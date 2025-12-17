"use client";

import { motion } from "framer-motion";

type Bubble = {
  id: number;
  top: string;
  left: string;
  size: number;
  color: string;
  animate: {
    x: number[];
    y: number[];
  };
  transition: {
    duration: number;
    repeat: number;
    repeatType: "mirror" | "loop" | "reverse";
    ease: string;
    delay?: number;
  };
};

export default function Background() {
  const bubbles: Bubble[] = [
    {
      id: 1,
      top: "10vh",
      left: "10vw",
      size: 250,
      color: "bg-cyan-500",
      animate: {
        x: [0, 150, -100, 0],
        y: [0, -100, 120, 0],
      },
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
    {
      id: 2,
      top: "50vh",
      left: "70vw",
      size: 350,
      color: "bg-blue-700",
      animate: {
        x: [0, -180, 80, 0],
        y: [0, 100, -150, 0],
      },
      transition: {
        duration: 10,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay: 5,
      },
    },
    {
      id: 3,
      top: "70vh",
      left: "20vw",
      size: 200,
      color: "bg-purple-600",
      animate: {
        x: [0, 80, -80, 0],
        y: [0, 100, -100, 0],
      },
      transition: {
        duration: 7,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay: 2,
      },
    },
    {
      id: 4,
      top: "30vh",
      left: "50vw",
      size: 300,
      color: "bg-indigo-600",
      animate: {
        x: [0, -100, 100, 0],
        y: [0, -100, 100, 0],
      },
      transition: {
        duration: 9,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay: 7,
      },
    },
  ];

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className={`absolute ${bubble.color} rounded-full opacity-50 blur-[90px]`}
          style={{
            top: bubble.top,
            left: bubble.left,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
          }}
          animate={bubble.animate}
          transition={bubble.transition as any}
        />
      ))}
    </div>
  );
}