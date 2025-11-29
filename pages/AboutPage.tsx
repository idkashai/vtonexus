import React from 'react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-12 pb-24 px-6 max-w-4xl mx-auto"
    >
      <div className="mb-20 text-center">
        <h1 className="font-serif text-5xl md:text-7xl mb-6">The "Clay Sculptor" Analogy</h1>
        <div className="h-1 w-24 bg-neonBlue mx-auto rounded-full"></div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-neonMagenta/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-serif mb-8 text-gray-100">
            How does the AI know what your back looks like?
          </h2>
          
          <div className="prose prose-invert prose-lg text-gray-300">
            <p className="leading-relaxed">
              Think of our AI as a master sculptor. Even from a blurry video, it uses a database of 1M+ human scans (SMPL-X) to infer missing data, 'sculpting' a perfect digital twin even if the camera misses a spot.
            </p>
            <p className="mt-6 leading-relaxed">
              Unlike traditional photogrammetry which requires perfect lighting and 100 cameras, our model understands human anatomy. It knows where your shoulder blades should be, even if you're wearing a baggy t-shirt during the scan.
            </p>
          </div>
        </div>

        {/* Visual representation of point cloud */}
        <div className="mt-12 h-64 bg-black/50 rounded-xl border border-white/5 flex items-center justify-center relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/mesh/800/400')] bg-cover opacity-20 grayscale"></div>
           <div className="text-neonBlue font-mono text-sm z-10 bg-black/80 px-4 py-2 rounded backdrop-blur">
             Inferring Mesh Topology...
           </div>
        </div>
      </div>
    </motion.div>
  );
}