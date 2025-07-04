import React from "react";
import { Description } from "./Description";
import { motion } from "motion/react";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { Footer } from "./Footer";
import { FavoriteSongs } from "./FavoriteSongs";
import { Photo } from "./Phtoto";

interface ContentProps {
  theme: string;
}

const Content = ({ theme }: ContentProps) => {
  return (
    <main className="min-h-screen py-16 md:py-32 px-6 sm:px-0 justify-start items-center max-w-xl mx-auto flex w-full flex-col gap-3">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{
          duration: 0.8,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
      >
        <Description theme={theme} />
        <Education theme={theme} />
        <Experience theme={theme}/>
        <FavoriteSongs theme={theme} />
        <Photo theme={theme} />
        <Footer theme={theme} />
      </motion.div>
    </main>
  );
};

export { Content };
