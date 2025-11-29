
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Smartphone, Cpu, Box, Check, ChevronRight, Sliders, Sun, Layers, Wifi, Upload, Play, Maximize2, X, ScanLine, FileVideo, User, Share2, Heart, MessageCircle, Grid, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Sub-components ---

const ScanModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState<'upload' | 'processing' | 'complete'>('upload');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setStep('upload');
      setProgress(0);
    }
  }, [isOpen]);

  const handleUpload = () => {
    setStep('processing');
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStep('complete');
      }
    }, 50);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden relative shadow-2xl"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10">
            <X size={24} />
          </button>

          <div className="p-8">
            <h2 className="text-2xl font-serif font-bold mb-2">
              {step === 'upload' && "Upload 360° Scan"}
              {step === 'processing' && "Constructing Digital Twin"}
              {step === 'complete' && "Avatar Ready"}
            </h2>
            <p className="text-sm text-gray-400 mb-8">
              {step === 'upload' && "Record a 15s video spinning in a circle. Ensure good lighting."}
              {step === 'processing' && "Our AI is extracting depth maps and skeletal rigging..."}
              {step === 'complete' && "Your high-fidelity 3D model is rigged and ready for fitting."}
            </p>

            {/* Content Area */}
            <div className="bg-black/40 rounded-xl border border-white/5 aspect-[4/3] flex items-center justify-center relative overflow-hidden mb-8 group">
              
              {step === 'upload' && (
                <div 
                  onClick={handleUpload}
                  className="text-center cursor-pointer hover:scale-105 transition-transform"
                >
                  <div className="w-20 h-20 rounded-full bg-white/5 border border-dashed border-white/30 flex items-center justify-center mx-auto mb-4 group-hover:border-neonBlue group-hover:text-neonBlue transition-colors">
                    <Upload size={32} />
                  </div>
                  <span className="text-sm font-bold text-gray-300">Drop Video or Click to Browse</span>
                  <p className="text-xs text-gray-500 mt-2">Supports .mp4, .mov (Max 50MB)</p>
                </div>
              )}

              {step === 'processing' && (
                <div className="w-full h-full relative">
                  <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover opacity-50" />
                  <div className="absolute inset-0 bg-neonBlue/10 flex items-center justify-center">
                     <div className="w-64">
                        <div className="flex justify-between text-xs font-mono text-neonBlue mb-2">
                          <span>SAM_SEGMENTATION</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-neonBlue"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                     </div>
                  </div>
                  <motion.div 
                     className="absolute inset-0 border-2 border-neonBlue/30"
                     animate={{ clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'] }}
                     transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              )}

              {step === 'complete' && (
                <div className="w-full h-full relative">
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 z-0"></div>
                   <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover relative z-10" />
                   <div className="absolute bottom-4 left-4 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/50 backdrop-blur z-20 flex items-center gap-2">
                     <Check size={12} /> RIGGED & TEXTURED
                   </div>
                </div>
              )}
            </div>

            {/* Actions */}
            {step === 'upload' && (
               <button onClick={handleUpload} className="w-full py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors">
                 Select File from Device
               </button>
            )}
            
            {step === 'processing' && (
               <button disabled className="w-full py-4 bg-black/50 text-gray-500 font-bold rounded-xl cursor-wait">
                 Processing...
               </button>
            )}

            {step === 'complete' && (
               <div className="flex gap-4">
                 <button onClick={onClose} className="flex-1 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20">
                   Discard
                 </button>
                 <Link to="/technology" onClick={onClose} className="flex-1 py-4 bg-neonBlue text-black font-bold rounded-xl hover:bg-cyan-300 text-center flex items-center justify-center">
                   Save & Try Clothes
                 </Link>
               </div>
            )}

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};


const Hero = ({ onOpenScan }: { onOpenScan: () => void }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background WebGL Placeholder */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900 to-black">
        <div className="absolute inset-0 opacity-30 bg-[url('https://picsum.photos/seed/tech/1920/1080')] bg-cover bg-center grayscale mix-blend-overlay"></div>
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-cyber-grid bg-[length:50px_50px] opacity-20 perspective-grid"></div>
        
        {/* Central visual glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neonBlue/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="inline-block px-4 py-1.5 rounded-full border border-neonBlue/30 bg-neonBlue/10 text-neonBlue text-sm font-bold tracking-wider mb-8"
        >
           VTO-NEXUS BETA v2.0 LIVE
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight mix-blend-difference text-white"
        >
          The End of Guesswork.<br />The Future of Fit.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          Turn a 15-second mobile video into a photorealistic, fully-rigged 3D digital twin. Try on clothes with soft-body physics before you buy.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button 
            onClick={onOpenScan}
            className="px-8 py-4 bg-neonBlue text-black font-bold rounded-full hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2"
          >
            <ScanLine size={20} /> Create Your Avatar
          </button>
          <button className="px-8 py-4 border border-white/30 text-white rounded-full hover:bg-white/10 hover:border-white transition-all">
            View API Docs
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const TrustTicker = () => {
  const logos = ["Zara", "H&M", "Shopify", "Magento", "Unreal Engine", "Blender"];
  
  return (
    <div className="w-full bg-black border-y border-white/5 overflow-hidden py-8">
      <div className="flex gap-16 items-center animate-scroll whitespace-nowrap min-w-full justify-center">
        {[...logos, ...logos, ...logos].map((logo, i) => (
          <span key={i} className="text-2xl font-serif text-gray-600 font-bold uppercase tracking-widest opacity-50 select-none">
            {logo}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="flex items-center justify-center md:justify-start">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", bounce: 0.4, duration: 1.5 }}
            className="text-6xl md:text-9xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-neonMagenta to-purple-600"
          >
            $100<br/>Billion
          </motion.div>
        </div>
        <div>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">The Problem</h2>
          <motion.p 
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl leading-relaxed text-gray-200"
          >
            That’s how much the fashion industry loses annually to returns. <span className="text-white font-bold border-b-2 border-neonMagenta">40% of online purchases</span> are sent back because 'Size M' is a myth. We don't guess sizes. We reconstruct bodies.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      icon: <Smartphone className="w-8 h-8 text-neonBlue" />,
      title: "1. Scan",
      desc: "User places phone on a tripod and spins 360°. No LiDAR required—just a standard camera captures the geometry."
    },
    {
      icon: <Cpu className="w-8 h-8 text-neonMagenta" />,
      title: "2. Process",
      desc: "Our Deep Learning pipeline extracts depth, skeletal rigging, and skin texture in <60 seconds on the cloud."
    },
    {
      icon: <Box className="w-8 h-8 text-white" />,
      title: "3. Experience",
      desc: "A persistent 3D avatar that can squat, sit, and move to test fabric tension in real-time."
    }
  ];

  return (
    <section className="py-24 bg-white/5 relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif mb-16 text-center">From Video to Virtual in 3 Steps</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-black/40 backdrop-blur-md p-8 border border-white/10 rounded-2xl hover:border-neonBlue/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <div className="text-6xl font-serif font-bold text-white">{idx + 1}</div>
              </div>
              <div className="mb-6 bg-white/5 w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform relative z-10">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 font-serif relative z-10">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed relative z-10">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const VideoShowcase = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif">See the Magic</h2>
        <p className="text-gray-400 mt-2">Watch the full Scan-to-Avatar experience.</p>
      </div>
      <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-video group max-w-5xl mx-auto shadow-2xl">
        <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center group-hover:bg-black/30 transition-colors">
          <div className="w-24 h-24 bg-neonBlue/10 backdrop-blur-lg rounded-full flex items-center justify-center border border-neonBlue text-neonBlue group-hover:scale-110 transition-transform cursor-pointer shadow-[0_0_30px_rgba(0,240,255,0.3)]">
            <Play fill="currentColor" className="ml-2 w-10 h-10" />
          </div>
        </div>
        
        {/* Poster Image simulating the video content */}
        <img 
          src="https://images.unsplash.com/photo-1503944168849-c1246463e59f?q=80&w=1600&auto=format&fit=crop"
          alt="App Demo"
          className="w-full h-full object-cover opacity-80"
        />

        {/* UI Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-black via-black/80 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-white rounded-lg overflow-hidden border border-white/20">
                  <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=100&q=80" className="w-full h-full object-cover"/>
               </div>
               <div>
                  <h3 className="text-xl font-bold text-white">VTO-Nexus Experience</h3>
                  <p className="text-gray-400 text-sm">Real-time cloth simulation demo</p>
               </div>
            </div>
            <Maximize2 className="text-gray-400 hover:text-white cursor-pointer" />
          </div>
          {/* Fake Progress Bar */}
          <div className="w-full h-1 bg-gray-700 mt-6 rounded-full overflow-hidden">
             <div className="w-1/3 h-full bg-neonBlue"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BentoGrid = () => {
  const Card = ({ title, children, className, icon: Icon, bgImage, overlayColor }: any) => (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`bg-slate-900 border border-white/10 p-6 rounded-3xl relative overflow-hidden group ${className}`}
    >
      {/* Background Image with Overlay */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <img src={bgImage} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" alt="bg" />
          <div className={`absolute inset-0 opacity-60 mix-blend-overlay ${overlayColor || 'bg-black'}`}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>
      )}

      <div className="relative z-10 h-full flex flex-col justify-end">
        <div className="mb-4 bg-white/10 w-12 h-12 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/10">
           {Icon && <Icon className="w-6 h-6 text-neonBlue" />}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{children}</p>
      </div>
    </motion.div>
  );

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-serif mb-4">Core Technology</h2>
        <p className="text-gray-400">The engineering modules that make VTO-Nexus possible.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[600px]">
        {/* Card 1: USP - Large */}
        <Card 
          title="Fit Heatmaps" 
          className="md:col-span-2 md:row-span-1" 
          icon={Layers}
          bgImage="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80"
          overlayColor="bg-gradient-to-r from-blue-900 to-red-900"
        >
          Visual Tension Mapping. Red zones show tightness, Blue shows loose fabric. Know it fits before it ships.
        </Card>
        
        {/* Card 2: Physics */}
        <Card 
          title="The 'Squat Test'" 
          className="md:col-span-1 md:row-span-1" 
          icon={Sliders}
          bgImage="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=800&q=80"
        >
          Static mannequins lie. Our avatars are rigged for movement. See if the jeans ride up when you sit.
        </Card>

        {/* Card 3: Environment */}
        <Card 
           title="HDR Lighting Studio" 
           className="md:col-span-1 md:row-span-1" 
           icon={Sun}
          bgImage="https://images.unsplash.com/photo-1503944168849-c1246463e59f?auto=format&fit=crop&w=800&q=80"
        >
          Test outfits in 'Daylight', 'Office Fluorescent', or 'Club Neon' to see true fabric reflectivity.
        </Card>

        {/* Card 4: Convenience */}
        <Card 
            title="Wardrobe Digitization" 
            className="md:col-span-1 md:row-span-1" 
            icon={Upload}
          bgImage="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80"
        >
          Upload a photo of your own pants. Our AI removes the background and drapes them on your avatar.
        </Card>

        {/* Card 5: Performance */}
        <Card title="Low-Bandwidth Mode" className="md:col-span-1 md:row-span-1" icon={Wifi}>
          Works on 4G. We stream mathematical mesh data (2MB), not heavy video (50MB).
        </Card>
      </div>
    </section>
  );
};

const ComparisonSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [viewMode, setViewMode] = useState<'visual' | 'wireframe'>('visual');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const position = ((e.clientX - left) / width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, position)));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const position = ((e.touches[0].clientX - left) / width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, position)));
  };

  return (
    <section className="py-24 bg-black border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-6">The Difference is Dimensional</h2>
            <div className="bg-white/10 p-1 rounded-full border border-white/10 flex">
                <button 
                    onClick={() => setViewMode('visual')}
                    className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${viewMode === 'visual' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                >
                    Visual Fidelity
                </button>
                <button 
                    onClick={() => setViewMode('wireframe')}
                    className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${viewMode === 'wireframe' ? 'bg-neonBlue text-black' : 'text-gray-400 hover:text-white'}`}
                >
                    Technical Mesh
                </button>
            </div>
        </div>
        
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-2xl cursor-ew-resize border border-white/20 select-none shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          {/* Right Image (VTO-Nexus) - Underneath */}
          <div className="absolute inset-0 bg-slate-900">
             {viewMode === 'visual' ? (
                 <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1600&auto=format&fit=crop" alt="VTO-Nexus 3D Physics" className="w-full h-full object-cover opacity-90 brightness-110 contrast-110" />
             ) : (
                 <div className="w-full h-full bg-[#050505] relative">
                     <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1600&auto=format&fit=crop" alt="Wireframe" className="w-full h-full object-cover opacity-20 grayscale" />
                     {/* Mesh Overlay */}
                     <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.4)_1px,transparent_1px)] bg-[size:30px_30px] mix-blend-screen"></div>
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-30 mix-blend-overlay"></div>
                 </div>
             )}
             <div className="absolute bottom-6 right-6 bg-black/70 backdrop-blur text-neonBlue px-6 py-3 rounded-xl font-bold border border-neonBlue/50 shadow-lg">
                 {viewMode === 'visual' ? 'VTO-Nexus 3D Physics' : 'Poly-Mesh Geometry'}
             </div>
          </div>

          {/* Left Image (Competitors) - Clipped */}
          <div 
            className="absolute inset-0 bg-gray-200"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1600&auto=format&fit=crop" alt="Standard 2D Overlay" className="w-full h-full object-cover grayscale contrast-50 brightness-125 blur-[1px]" />
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur text-black px-6 py-3 rounded-xl font-bold shadow-lg">Standard 2D Overlay</div>
          </div>

          {/* Slider Line */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-neonBlue cursor-ew-resize shadow-[0_0_25px_rgba(0,240,255,0.8)] z-20"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neonBlue rounded-full p-3 shadow-lg border-2 border-white">
              <Sliders className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>
        <p className="text-center text-gray-400 mt-6 text-sm">Drag slider to compare fidelity</p>
      </div>
    </section>
  );
};

const ViralitySection = () => {
    return (
        <section className="py-24 bg-white/5 border-t border-white/5">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-4xl md:text-5xl font-serif mb-6">The Viral Loop</h2>
                    <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                        We don't just dress your users; we turn them into content creators. VTO-Nexus generates shareable, watermarked 15s "Fit Check" videos compatible with TikTok and Instagram Reels.
                    </p>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-neonMagenta/10 p-3 rounded-xl text-neonMagenta border border-neonMagenta/20">
                                <Share2 size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">One-Click Sharing</h3>
                                <p className="text-gray-400 text-sm">Direct integration with native sharing sheets on iOS and Android.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-neonBlue/10 p-3 rounded-xl text-neonBlue border border-neonBlue/20">
                                <Heart size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">Social Proof</h3>
                                <p className="text-gray-400 text-sm">Users trust their friends more than brands. Turn customers into models.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative mx-auto border-gray-800 bg-gray-900 border-[8px] rounded-[2.5rem] h-[500px] w-[280px] shadow-2xl flex flex-col overflow-hidden">
                    <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[12px] top-[72px] rounded-l-lg"></div>
                    <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[12px] top-[124px] rounded-l-lg"></div>
                    <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[12px] top-[142px] rounded-r-lg"></div>
                    <div className="rounded-[2rem] overflow-hidden w-full h-full bg-slate-800 relative group">
                        {/* Fake Mobile UI */}
                        <img src="https://images.unsplash.com/photo-1503944168849-c1246463e59f?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover opacity-80" alt="Viral Content" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
                        
                        {/* Overlay UI */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between text-white text-xs font-bold drop-shadow-md">
                            <span>12:00</span>
                            <div className="flex gap-1">
                                <Wifi size={12} />
                                <div className="w-4 h-3 bg-white rounded-sm"></div>
                            </div>
                        </div>

                        <div className="absolute right-4 bottom-24 flex flex-col gap-4 items-center">
                            <div className="flex flex-col items-center gap-1">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                                    <Heart fill="white" className="text-white w-5 h-5" />
                                </div>
                                <span className="text-white text-xs font-bold drop-shadow">24.5k</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                                    <MessageCircle fill="white" className="text-white w-5 h-5" />
                                </div>
                                <span className="text-white text-xs font-bold drop-shadow">842</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <div className="w-10 h-10 bg-neonBlue rounded-full flex items-center justify-center shadow-[0_0_15px_#00f0ff] animate-pulse">
                                    <Share2 fill="black" className="text-black w-5 h-5" />
                                </div>
                                <span className="text-neonBlue text-xs font-bold drop-shadow">Share</span>
                            </div>
                        </div>

                        <div className="absolute bottom-6 left-4 max-w-[70%]">
                            <div className="bg-black/40 backdrop-blur px-2 py-1 rounded text-xs text-white mb-2 inline-block">@fashion_killa</div>
                            <p className="text-sm text-white leading-tight drop-shadow-md">
                                Trying on the new Cyber Collection! 🤖✨ The physics are insane. #VTONexus #FitCheck
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const UseCases = () => {
  const [activeTab, setActiveTab] = useState<'shoppers' | 'brands'>('shoppers');

  return (
    <section className="py-24 max-w-6xl mx-auto px-6">
      {/* Toggle */}
      <div className="flex justify-center mb-16">
        <div className="bg-white/5 p-1 rounded-full border border-white/10 flex">
          <button 
            onClick={() => setActiveTab('shoppers')}
            className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${activeTab === 'shoppers' ? 'bg-neonBlue text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            For Shoppers (B2C)
          </button>
          <button 
            onClick={() => setActiveTab('brands')}
            className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${activeTab === 'brands' ? 'bg-neonMagenta text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            For Brands (B2B)
          </button>
        </div>
      </div>

      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'shoppers' ? (
            <motion.div 
              key="shoppers"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h3 className="text-4xl md:text-5xl font-serif mb-6 text-neonBlue">Steal the Look.</h3>
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  See a dress on Zara? Screenshot it. Upload it. Wear it instantly on your digital twin. 
                  <br/><br/>
                  Our <span className="text-white font-bold">"Wardrobe Digitization"</span> engine allows you to build a closet of 100+ items and mix-and-match in 3D before spending a dollar.
                </p>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-gray-400">
                        <Check className="text-neonBlue" /> <span>Upload screenshots from Instagram/TikTok</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                        <Check className="text-neonBlue" /> <span>Share "Fit Check" videos to social media</span>
                    </div>
                </div>
              </div>
              <div className="bg-slate-800 rounded-2xl aspect-[9/16] md:aspect-square overflow-hidden relative border border-white/10 group">
                <img src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Shopper Demo" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                
                {/* Simulated App UI */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <div className="bg-black/60 p-2 rounded-full border border-white/20"><Share2 size={16} /></div>
                    <div className="bg-black/60 p-2 rounded-full border border-white/20"><User size={16} /></div>
                </div>
                
                <div className="absolute bottom-6 left-6">
                  <div className="flex items-center gap-2 text-sm font-mono text-neonBlue bg-black/50 px-3 py-1 rounded-full border border-neonBlue/30">
                    <span className="w-2 h-2 bg-neonBlue rounded-full animate-pulse"></span>
                    Processing Cloth Physics...
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
             <motion.div 
              key="brands"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className="order-2 md:order-1 bg-slate-900 rounded-2xl p-8 border border-white/10 font-mono text-sm shadow-2xl overflow-hidden relative">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <code className="text-blue-300 block mb-2">&lt;!-- VTO Integration --&gt;</code>
                <code className="text-purple-400 block mb-2">import</code> <code className="text-white">{"{ VirtualTryOn }"}</code> <code className="text-purple-400">from</code> <code className="text-green-300">'@vto-nexus/react'</code><code className="text-white">;</code>
                <br/>
                <code className="text-blue-300 block mb-2">function ProductPage() {"{"}</code>
                <div className="pl-4">
                    <code className="text-purple-400">return (</code><br/>
                    <div className="pl-4">
                        <code className="text-gray-500">&lt;div&gt;</code><br/>
                        <code className="text-yellow-300">&lt;VirtualTryOn</code><br/>
                        <code className="pl-4 text-sky-300">userId</code>=<code className="text-green-300">"123"</code><br/>
                        <code className="pl-4 text-sky-300">garmentId</code>=<code className="text-green-300">"denim_v2"</code><br/>
                        <code className="text-yellow-300">/&gt;</code><br/>
                        <code className="text-gray-500">&lt;/div&gt;</code>
                    </div>
                    <code className="text-purple-400">);</code>
                </div>
                <code className="text-blue-300 block">{"}"}</code>
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-4xl md:text-5xl font-serif mb-6 text-neonMagenta">The Universal Dressing Room.</h3>
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  Integrate our 'Try-On' button into your Shopify store with just 2 lines of code.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <div className="text-2xl font-bold text-white mb-1">30%</div>
                        <div className="text-xs text-gray-400 uppercase">Return Rate Reduction</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                         <div className="text-2xl font-bold text-white mb-1">2.5x</div>
                        <div className="text-xs text-gray-400 uppercase">Conversion Uplift</div>
                    </div>
                </div>
                <button className="flex items-center gap-2 text-neonMagenta border-b border-neonMagenta hover:text-white hover:border-white transition-colors pb-1">
                  Read API Documentation <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default function HomePage() {
  const [scanModalOpen, setScanModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-deepSlate"
    >
      <Hero onOpenScan={() => setScanModalOpen(true)} />
      <TrustTicker />
      <ProblemSection />
      <HowItWorks />
      <VideoShowcase />
      <BentoGrid />
      <ComparisonSlider />
      <ViralitySection />
      <UseCases />

      <ScanModal isOpen={scanModalOpen} onClose={() => setScanModalOpen(false)} />
    </motion.div>
  );
}
