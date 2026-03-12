import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";

const VideoSection = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="py-16 sm:py-24 bg-[hsl(220,35%,8%)]">
      <div className="container px-4 sm:px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
            See DePeer in <span className="text-accent">Action</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm sm:text-base">
            Watch how businesses tokenise and investors earn returns on Africa's first SME token marketplace.
          </p>
        </motion.div>

        <motion.div
          className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="aspect-video bg-[hsl(220,35%,12%)] relative">
            {playing ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
                title="DePeer Introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                onClick={() => setPlaying(true)}
                className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-4 group cursor-pointer"
              >
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-primary/20" />
                
                {/* Play button */}
                <div className="relative z-10 w-20 h-20 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform duration-300">
                  <Play size={32} className="text-white ml-1" fill="white" />
                </div>
                <span className="relative z-10 text-white/70 text-sm font-medium">
                  Watch the 2-minute overview
                </span>

                {/* Decorative dots */}
                <div className="absolute top-6 left-6 grid grid-cols-3 gap-1.5 opacity-20">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
                  ))}
                </div>
                <div className="absolute bottom-6 right-6 grid grid-cols-3 gap-1.5 opacity-20">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
                  ))}
                </div>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
