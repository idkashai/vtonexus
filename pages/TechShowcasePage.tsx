
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Layers, Code, Sun, X, ArrowRight, MousePointer2, ScanLine, Maximize, GitBranch, Wind, MoveVertical, Ruler, Share2, Eye, Camera, Video, Database, Wifi, Box, Check } from 'lucide-react';

// --- Types ---
type FeatureId = 
  | 'heatmap' 
  | 'digitization' 
  | 'rigging' 
  | 'tailor' 
  | 'physics' 
  | 'xray' 
  | 'lighting' 
  | 'multiuser' 
  | 'sizing' 
  | 'fabric';

interface FeatureDef {
  id: FeatureId;
  title: string;
  techShort: string;
  description: string;
  howItWorksTitle: string;
  howItWorks: string[];
  outcomeTitle: string;
  outcome: string[];
  icon: any;
  component: React.FC<any>;
}

// ==========================================
// SIMULATION COMPONENTS
// ==========================================

// 1. Fit Heatmap
const SimHeatmap = () => {
  const [tightness, setTightness] = useState(15); 
  const L_rest = 10;
  const currentLen = L_rest + (tightness / 10);
  const strain = ((currentLen - L_rest) / L_rest) * 100;

  const getMeshColor = (index: number) => {
    const row = Math.floor(index / 9);
    const col = index % 9;
    const isChest = row > 2 && row < 5 && col > 2 && col < 6;
    const isShoulder = row < 2 && (col < 2 || col > 6);
    
    let localStrain = strain;
    if (isChest || isShoulder) localStrain *= 1.8; 
    
    if (localStrain > 20) return "bg-red-500/60 shadow-[0_0_8px_#ef4444]";
    if (localStrain > 10) return "bg-yellow-400/60";
    if (localStrain < 0) return "bg-blue-500/60 shadow-[0_0_8px_#3b82f6]";
    return "bg-green-400/20";
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="relative flex-grow rounded-xl overflow-hidden border border-white/20 group bg-slate-900 min-h-0">
        <img 
            src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80" 
            alt="Child Model" 
            className="absolute inset-0 w-full h-full object-cover object-top opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center pt-8">
             <div className="grid grid-cols-9 gap-1.5 p-4 w-64 h-80">
              {[...Array(81)].map((_, i) => (
                <motion.div 
                  key={i} 
                  className={`rounded-full transition-colors duration-200 ${getMeshColor(i)} backdrop-blur-[2px]`}
                  animate={{ scale: strain > 15 ? [1, 1.2, 1] : 1 }}
                  transition={{ repeat: strain > 15 ? Infinity : 0, duration: 1.5 }}
                />
              ))}
            </div>
        </div>
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur border border-white/10 p-2 rounded text-xs font-mono">
           <div className={strain > 15 ? "text-red-400" : "text-green-400"}>
             STRAIN: {strain.toFixed(1)}%
           </div>
           <div className="text-gray-400 text-[10px]">L_rest: {L_rest.toFixed(1)}mm</div>
        </div>
      </div>
      <div className="bg-slate-900 p-3 rounded-lg font-mono text-sm border border-white/5 shrink-0">
        <div className="flex justify-between mb-2 text-xs text-gray-400 uppercase">
            <span>Loose (Blue)</span>
            <span>Perfect (Green)</span>
            <span>Tight (Red)</span>
        </div>
        <input 
          type="range" min="-10" max="30" value={tightness} 
          onChange={(e) => setTightness(Number(e.target.value))}
          className="w-full h-2 bg-gradient-to-r from-blue-500 via-green-400 to-red-500 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};

// 2. Wardrobe Digitization (Side-by-Side Input/Output)
const SimDigitization = () => {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (status === 'scanning') {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setStatus('complete');
            return 100;
          }
          return p + 2;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [status]);

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex-grow flex gap-4 min-h-0">
        {/* LEFT: Input Scan */}
        <div className="w-1/2 relative rounded-xl overflow-hidden border border-white/10 bg-slate-900 group">
             <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 text-[10px] text-white rounded z-30 font-mono border border-white/10">
                INPUT SOURCE
             </div>
             
             <img 
                src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80" 
                alt="Child Fashion" 
                className="w-full h-full object-cover object-top filter contrast-110" 
             />
             
             {/* SAM Mask */}
             {status === 'scanning' && (
                <motion.div 
                    className="absolute inset-0 bg-neonMagenta/30 mix-blend-color-dodge z-10"
                    initial={{ clipPath: "circle(0% at 50% 50%)" }}
                    animate={{ clipPath: "circle(100% at 50% 50%)" }}
                    transition={{ duration: 1.5 }}
                />
             )}
             
             {/* Scan Line */}
             {status === 'scanning' && (
               <motion.div 
                 className="absolute left-0 right-0 h-1 bg-neonBlue shadow-[0_0_20px_#00f0ff] z-20"
                 style={{ top: `${progress}%` }}
               />
             )}

             {/* Progress Text */}
             {status === 'scanning' && (
                 <div className="absolute bottom-4 left-0 right-0 text-center z-30">
                     <span className="bg-black/60 text-neonBlue text-[10px] font-mono px-2 py-1 rounded border border-neonBlue/30">
                         SCANNING... {progress}%
                     </span>
                 </div>
             )}
        </div>

        {/* RIGHT: 3D Output */}
        <div className="w-1/2 relative rounded-xl overflow-hidden border border-white/10 bg-black flex items-center justify-center">
             <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 text-[10px] text-neonBlue rounded z-30 font-mono border border-neonBlue/30">
                3D OUTPUT
             </div>
             
             {status === 'complete' ? (
                 <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, rotateY: 360 }}
                        transition={{ rotateY: { duration: 8, repeat: Infinity, ease: "linear" } }}
                        className="w-32 h-48 relative"
                    >
                         {/* Simulated 3D Asset */}
                         <img 
                            src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80" 
                            className="w-full h-full object-cover rounded-lg shadow-[0_0_30px_rgba(0,240,255,0.3)] border border-neonBlue/50"
                            alt="Generated Asset"
                         />
                         {/* Wireframe Overlay on Output */}
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-30 mix-blend-overlay"></div>
                    </motion.div>
                    <div className="absolute bottom-4 text-xs font-mono text-green-400 bg-black/50 px-2 py-1 rounded">
                        MESH GENERATED (12k POLYS)
                    </div>
                 </div>
             ) : (
                 <div className="text-center p-4">
                     <Box className={`w-12 h-12 mx-auto mb-2 ${status === 'scanning' ? 'text-neonBlue animate-pulse' : 'text-gray-700'}`} />
                     <div className="text-[10px] text-gray-500 font-mono">
                         {status === 'scanning' ? 'GENERATING GEOMETRY...' : 'WAITING FOR SCAN'}
                     </div>
                 </div>
             )}
        </div>
      </div>

      <button 
        onClick={() => { setProgress(0); setStatus('scanning'); }}
        disabled={status === 'scanning'}
        className="w-full py-3 bg-neonBlue text-black font-bold rounded-lg hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 shrink-0"
      >
        <ScanLine size={18} />
        {status === 'scanning' ? "Processing Alpha Channel..." : "Digitize Wardrobe"}
      </button>
    </div>
  );
};

// 3. Sit & Reach
const SimRigging = () => {
  const [pose, setPose] = useState<'stand' | 'squat'>('stand');
  const squatOffset = pose === 'squat' ? 40 : 0;
  
  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="relative flex-grow bg-slate-900 rounded-xl overflow-hidden border border-white/10 min-h-0 flex items-center justify-center">
         <img 
            src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80" 
            alt="Reference" 
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30 grayscale"
         />
         <div className="relative z-10 w-full h-full max-w-xs max-h-xs">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 300 400">
               <motion.circle cx="150" cy={100 + squatOffset} r="20" stroke="white" strokeWidth="2" fill="transparent" animate={{ cy: 100 + squatOffset }} />
               <motion.line x1="150" y1={120 + squatOffset} x2="150" y2={200 + squatOffset} stroke="white" strokeWidth="4" animate={{ y1: 120 + squatOffset, y2: 200 + squatOffset }} />
               <motion.line x1="120" y1={200 + squatOffset} x2="180" y2={200 + squatOffset} stroke="white" strokeWidth="4" animate={{ y1: 200 + squatOffset, y2: 200 + squatOffset }} />
               <motion.path 
                  d={pose === 'stand' ? "M 120 200 L 120 350" : "M 120 240 L 90 300 L 120 350"}
                  stroke="#00f0ff" strokeWidth="6" fill="transparent" strokeLinecap="round"
                  animate={{ d: pose === 'stand' ? "M 120 200 L 120 350" : "M 120 240 L 90 300 L 120 350" }}
               />
               <motion.path 
                  d={pose === 'stand' ? "M 180 200 L 180 350" : "M 180 240 L 210 300 L 180 350"}
                  stroke="#00f0ff" strokeWidth="6" fill="transparent" strokeLinecap="round"
                  animate={{ d: pose === 'stand' ? "M 180 200 L 180 350" : "M 180 240 L 210 300 L 180 350" }}
               />
            </svg>
            <motion.div 
               className="absolute w-24 h-24 bg-neonMagenta/30 border border-neonMagenta rounded backdrop-blur-sm flex items-center justify-center"
               style={{ left: '50%', top: '50%', x: '-50%', y: '-50%' }}
               animate={{ 
                  y: pose === 'squat' ? 20 : 0,
                  width: pose === 'squat' ? 120 : 100,
                  height: pose === 'squat' ? 80 : 100,
                  backgroundColor: pose === 'squat' ? 'rgba(255, 0, 60, 0.6)' : 'rgba(255, 0, 60, 0.2)'
               }}
            >
                <div className="text-[10px] text-white font-mono font-bold">
                    {pose === 'squat' ? 'HIGH TENSION' : 'RELAXED'}
                </div>
            </motion.div>
         </div>
      </div>
      <div className="flex gap-4 shrink-0">
        <button onClick={() => setPose('stand')} className={`flex-1 py-3 rounded border transition-all ${pose === 'stand' ? 'bg-white text-black' : 'border-gray-700 text-gray-400'}`}>Stand (Rest)</button>
        <button onClick={() => setPose('squat')} className={`flex-1 py-3 rounded border transition-all ${pose === 'squat' ? 'bg-neonBlue text-black' : 'border-gray-700 text-gray-400'}`}>Squat (Stress)</button>
      </div>
    </div>
  );
};

// 4. Virtual Tailor (Restored Inputs)
const SimTailor = () => {
  const [mode, setMode] = useState<'photo' | 'video'>('photo');
  const [recording, setRecording] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<{chest: number, waist: number, inseam: number} | null>(null);

  // Inputs for Photo Mode
  const [ft, setFt] = useState(4);
  const [inch, setInch] = useState(6);
  const [weight, setWeight] = useState(85);

  const startPhotoScan = () => {
     setScanning(true);
     setResult(null);
     setTimeout(() => {
         setScanning(false);
         setResult({ chest: 24.2, waist: 21.5, inseam: 19.8 });
     }, 2000);
  };

  const startVideo = () => {
      setRecording(true);
      setResult(null);
      setTimeout(() => {
          setRecording(false);
          setResult({ chest: 26.5, waist: 22.0, inseam: 20.5 });
      }, 3000); 
  };

  return (
    <div className="flex flex-col h-full space-y-4">
       <div className="flex bg-black/40 p-1 rounded-lg border border-white/10 shrink-0">
          <button onClick={() => { setMode('photo'); setResult(null); }} className={`flex-1 py-2 text-xs font-bold rounded flex items-center justify-center gap-2 ${mode === 'photo' ? 'bg-neonBlue text-black' : 'text-gray-400'}`}><Camera size={14}/> Photo</button>
          <button onClick={() => { setMode('video'); setResult(null); }} className={`flex-1 py-2 text-xs font-bold rounded flex items-center justify-center gap-2 ${mode === 'video' ? 'bg-neonMagenta text-white' : 'text-gray-400'}`}><Video size={14}/> Video</button>
       </div>

       <div className="relative flex-grow bg-black rounded-lg overflow-hidden min-h-0 group border border-white/20">
          <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover opacity-80" alt="Tailor Subject" />
          
          {mode === 'video' ? (
              // VIDEO MODE OVERLAYS
              <>
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 px-2 py-1 rounded z-20">
                    <div className={`w-2 h-2 rounded-full ${recording ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></div>
                    <span className="text-[10px] font-bold text-white tracking-widest">{recording ? 'REC' : 'STBY'}</span>
                </div>
                {recording && (
                   <div className="absolute inset-0 z-10">
                      {[...Array(8)].map((_, i) => (
                         <motion.div 
                            key={i}
                            className="absolute w-2 h-2 bg-green-500 rounded-full shadow-[0_0_5px_#4ade80]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0], x: Math.random()*40 - 20, y: Math.random()*40 - 20 }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                            style={{ top: `${30 + (i%3)*20}%`, left: `${30 + (i%2)*40}%` }}
                         />
                      ))}
                   </div>
                )}
              </>
          ) : (
              // PHOTO MODE OVERLAYS
              <>
                {scanning && (
                    <motion.div 
                        className="absolute left-0 right-0 h-0.5 bg-neonBlue shadow-[0_0_10px_#00f0ff] z-10"
                        animate={{ top: ['10%', '90%', '10%'] }}
                        transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                    />
                )}
              </>
          )}
          
          {/* Results Overlay */}
          {!recording && !scanning && result && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-30">
                  <div className="grid grid-cols-1 gap-4 text-center p-6 border border-white/10 rounded-xl bg-slate-900">
                      <div className="text-neonBlue text-lg font-bold">SCAN COMPLETE</div>
                      <div className="flex gap-4 text-white font-mono text-sm justify-center">
                          <div className="bg-white/10 p-2 rounded"><div className="text-[10px] text-gray-400">CHEST</div>{result.chest}"</div>
                          <div className="bg-white/10 p-2 rounded"><div className="text-[10px] text-gray-400">WAIST</div>{result.waist}"</div>
                          <div className="bg-white/10 p-2 rounded"><div className="text-[10px] text-gray-400">INSEAM</div>{result.inseam}"</div>
                      </div>
                      <button onClick={() => setResult(null)} className="text-xs text-gray-400 hover:text-white underline">Scan Again</button>
                  </div>
              </div>
          )}
       </div>

       {mode === 'video' ? (
           <button onClick={startVideo} disabled={recording} className="w-full py-3 bg-neonMagenta text-white rounded font-bold hover:bg-rose-500 transition-colors shrink-0">
               {recording ? "Scanning 360° Topology..." : "Start 360° Video Scan"}
           </button>
       ) : (
           // Photo Mode Inputs
           <div className="space-y-3 bg-black/20 p-3 rounded border border-white/5 shrink-0">
               <div className="flex gap-4">
                   <div className="flex-1">
                       <label className="text-[10px] text-gray-400 block mb-1">HEIGHT</label>
                       <div className="flex gap-2">
                           <div className="relative flex-1">
                               <input type="number" value={ft} onChange={e => setFt(Number(e.target.value))} className="w-full bg-slate-800 border border-white/10 rounded p-1.5 text-xs text-white" />
                               <span className="absolute right-2 top-1.5 text-xs text-gray-500">ft</span>
                           </div>
                           <div className="relative flex-1">
                               <input type="number" value={inch} onChange={e => setInch(Number(e.target.value))} className="w-full bg-slate-800 border border-white/10 rounded p-1.5 text-xs text-white" />
                               <span className="absolute right-2 top-1.5 text-xs text-gray-500">in</span>
                           </div>
                       </div>
                   </div>
                   <div className="flex-1">
                       <label className="text-[10px] text-gray-400 block mb-1">WEIGHT</label>
                       <div className="relative">
                           <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} className="w-full bg-slate-800 border border-white/10 rounded p-1.5 text-xs text-white" />
                           <span className="absolute right-2 top-1.5 text-xs text-gray-500">lbs</span>
                       </div>
                   </div>
               </div>
               <button onClick={startPhotoScan} disabled={scanning} className="w-full py-2 bg-neonBlue text-black font-bold rounded hover:bg-cyan-300 transition-colors text-xs">
                   {scanning ? "Processing..." : "Start Photo Analysis"}
               </button>
           </div>
       )}
    </div>
  );
};

// 5. Soft-Body Physics
const SimPhysics = () => {
  return (
    <div className="flex flex-col h-full space-y-4">
        <div className="relative flex-grow bg-slate-900 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center cursor-move min-h-0">
            <img 
                src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=800&q=80" 
                alt="Physics Subject"
                className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none"
            />
            {/* Soft Body Zone Indicator */}
            <div className="absolute border-2 border-dashed border-neonBlue/30 w-48 h-48 rounded-full pointer-events-none">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-neonBlue bg-black/60 px-2 rounded whitespace-nowrap">
                    SOFT BODY ZONE (Stiffness: 0.2)
                </div>
            </div>

            {/* Interactive Nodes */}
            <div className="grid grid-cols-5 gap-6 relative z-10 p-8 w-64 h-64">
                {[...Array(25)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-6 h-6 rounded-full bg-white/10 border border-white/30 backdrop-blur-md"
                        whileHover={{ scale: 1.3, backgroundColor: "rgba(0, 240, 255, 0.6)", borderColor: "#00f0ff" }}
                        drag
                        dragConstraints={{ left: -10, right: 10, top: -10, bottom: 10 }}
                        dragElastic={0.2}
                        whileDrag={{ scale: 1.1 }}
                    />
                ))}
            </div>
            
            <div className="absolute bottom-4 bg-black/60 px-4 py-1 rounded-full text-xs text-white backdrop-blur z-20 pointer-events-none">
                <MousePointer2 className="inline w-3 h-3 mr-2" />
                Drag nodes to test elasticity
            </div>
        </div>
    </div>
  );
};

// 6. X-Ray Fit
const SimXRay = () => {
  const [opacity, setOpacity] = useState(50);
  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="relative flex-grow bg-black rounded-xl overflow-hidden border border-white/20">
        {/* Body (Underlayer) */}
        <img 
          src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Body Scan"
        />
        
        {/* Clothes (Overlay) */}
        <div className="absolute inset-0 transition-opacity duration-100" style={{ opacity: opacity / 100 }}>
             <img 
                src="https://images.unsplash.com/photo-1503944168849-c1246463e59f?auto=format&fit=crop&w=800&q=80"
                className="w-full h-full object-cover"
                alt="Clothing"
             />
        </div>

        {/* X-Ray Scanner Bar */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-neonBlue/50 shadow-[0_0_15px_#00f0ff] z-20 pointer-events-none"></div>
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur px-3 py-1 rounded border border-white/10 text-xs font-mono text-neonBlue">
           LAYER OPACITY: {opacity}%
        </div>
      </div>

      <div className="bg-slate-900 p-3 rounded-lg border border-white/5 shrink-0">
          <input 
            type="range" min="0" max="100" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neonBlue"
          />
          <div className="flex justify-between mt-2 text-[10px] text-gray-500 uppercase tracking-wider">
              <span>Body (Nude)</span>
              <span>Clothed</span>
          </div>
      </div>
    </div>
  );
};

// 7. HDR Lighting (SimLighting)
const SimLighting = () => {
    const [env, setEnv] = useState('studio');
    
    const envs = {
        studio: { color: 'bg-neutral-200', text: 'Studio White', overlay: 'bg-transparent' },
        sunset: { color: 'bg-orange-200', text: 'Golden Hour', overlay: 'bg-orange-500/20 mix-blend-overlay' },
        neon: { color: 'bg-slate-900', text: 'Cyberpunk', overlay: 'bg-blue-500/20 mix-blend-color-dodge' },
    };
  
    return (
      <div className="flex flex-col h-full space-y-4">
          <div className={`relative flex-grow rounded-xl overflow-hidden border border-white/20 transition-colors duration-500 ${env === 'neon' ? 'bg-slate-900' : 'bg-gray-200'}`}>
              <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover mix-blend-multiply opacity-80" alt="Lighting Subject" />
              <div className={`absolute inset-0 ${envs[env as keyof typeof envs].overlay}`}></div>
              
              {/* Lighting Sources Visualization */}
              {env === 'studio' && <Sun className="absolute top-4 left-4 text-white w-8 h-8 drop-shadow-lg" />}
              {env === 'sunset' && <Sun className="absolute bottom-10 left-4 text-orange-500 w-12 h-12 drop-shadow-lg" />}
              {env === 'neon' && (
                  <>
                      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-purple-500/30 to-transparent"></div>
                      <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-500/30 to-transparent"></div>
                  </>
              )}
          </div>
          <div className="flex gap-2 shrink-0">
              {Object.entries(envs).map(([k, v]) => (
                  <button 
                      key={k}
                      onClick={() => setEnv(k)}
                      className={`flex-1 py-2 text-xs font-bold rounded border ${env === k ? 'border-neonBlue text-neonBlue bg-neonBlue/10' : 'border-white/10 text-gray-400 bg-white/5'}`}
                  >
                      {v.text}
                  </button>
              ))}
          </div>
      </div>
    )
  }

// --- Features Data ---
const features: FeatureDef[] = [
    {
      id: 'heatmap',
      title: 'Fit Heatmaps',
      techShort: 'Soft-Body Finite Element Analysis',
      description: "Visualizes pressure points where fabric is too tight (red) or too loose (blue). Uses strain tensor calculation on the 3D mesh.",
      howItWorksTitle: "Strain Tensor Logic",
      howItWorks: ["Avatar moves to 'T-Pose'", "Cloth mesh draped with gravity", "Distance calculated between cloth vertex and skin vertex"],
      outcomeTitle: "Why it matters",
      outcome: ["Reduces returns by 40%", "Identifies poor pattern making"],
      icon: Layers,
      component: SimHeatmap
    },
    {
      id: 'digitization',
      title: 'Wardrobe Digitization',
      techShort: 'NeRF + Gaussian Splatting',
      description: "Reconstructs 3D assets from 2D photos using Neural Radiance Fields. Supports transparent textures like lace.",
      howItWorksTitle: "Pipeline",
      howItWorks: ["Multi-view image capture", "Sparse point cloud generation", "Texture projection baking"],
      outcomeTitle: "Capabilities",
      outcome: ["15-second processing time", "GLB/USDZ export ready"],
      icon: Database,
      component: SimDigitization
    },
    {
      id: 'rigging',
      title: 'Kinetic Rigging',
      techShort: 'Inverse Kinematics (IK)',
      description: "Tests garment flexibility during movement. Our 'Squat Test' reveals if pants will slide down or restrict movement.",
      howItWorksTitle: "Motion Logic",
      howItWorks: ["Bone-weight binding", "Collision detection enabled", "Cloth simulation steps: 60/sec"],
      outcomeTitle: "Use Case",
      outcome: ["Yoga pants testing", "Suit jacket arm lift range"],
      icon: Activity,
      component: SimRigging
    },
     {
      id: 'tailor',
      title: 'Virtual Tailor',
      techShort: 'Computer Vision Measurement',
      description: "Extracts precise body measurements (chest, waist, inseam) from a single photo or video scan with <0.5cm error margin.",
      howItWorksTitle: "Measurement Tech",
      howItWorks: ["Pose estimation (OpenPose)", "Pixel-to-metric calibration", "Convex hull circumference"],
      outcomeTitle: "Accuracy",
      outcome: ["98.5% match to manual tape", "Instant size recommendation"],
      icon: Ruler,
      component: SimTailor
    },
    {
      id: 'physics',
      title: 'Soft-Body Physics',
      techShort: 'Verlet Integration',
      description: "Simulates fabric drape, weight, and elasticity. Silk behaves like silk, denim like denim.",
      howItWorksTitle: "Material Props",
      howItWorks: ["Shear resistance", "Bending stiffness", "Mass per square meter (GSM)"],
      outcomeTitle: "Visual Fidelity",
      outcome: ["Real-time 60fps web rendering", "Accurate wrinkle formation"],
      icon: Wind,
      component: SimPhysics
    },
    {
      id: 'xray',
      title: 'X-Ray Fit',
      techShort: 'Layer Composition',
      description: "See through the clothes to understand how the garment sits on the skin. Checks for air gaps and compression.",
      howItWorksTitle: "Rendering",
      howItWorks: ["Alpha blending", "Depth-test disabled for overlay", "Silhouette edge detection"],
      outcomeTitle: "Utility",
      outcome: ["Check bra fit under shirts", "Analyze layering bulk"],
      icon: Eye,
      component: SimXRay
    },
    {
        id: 'lighting',
        title: 'HDR Environments',
        techShort: 'Image Based Lighting (IBL)',
        description: "Test how fabrics interact with different lighting conditions, from studio strobes to natural sunlight.",
        howItWorksTitle: "Rendering",
        howItWorks: ["Spherical harmonics", "PBR materials (Roughness/Metalness)", "Tone mapping"],
        outcomeTitle: "Reality Check",
        outcome: ["True color verification", "Sheerness testing"],
        icon: Sun,
        component: SimLighting
    }
  ];

// --- Main Page Component ---
export default function TechShowcasePage() {
    const [activeFeature, setActiveFeature] = useState<FeatureDef>(features[0]);
  
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen pt-24 pb-12 px-6 max-w-7xl mx-auto"
      >
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-6xl mb-4">Engineering Showcase</h1>
          <p className="text-gray-400 max-w-2xl">
            Interact with the individual modules that power our VTO engine. Real-time WebGL simulations running directly in your browser.
          </p>
        </div>
  
        <div className="grid lg:grid-cols-12 gap-8 h-auto lg:h-[800px]">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3 flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar max-h-[400px] lg:max-h-full">
              {features.map((f) => (
                  <button
                      key={f.id}
                      onClick={() => setActiveFeature(f)}
                      className={`text-left p-4 rounded-xl border transition-all duration-300 group ${
                          activeFeature.id === f.id 
                          ? 'bg-neonBlue/10 border-neonBlue text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]' 
                          : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}
                  >
                      <div className="flex items-center gap-3 mb-1">
                          <f.icon className={`w-5 h-5 ${activeFeature.id === f.id ? 'text-neonBlue' : 'text-gray-500 group-hover:text-white'}`} />
                          <span className="font-bold text-sm">{f.title}</span>
                      </div>
                      <div className="text-[10px] uppercase tracking-wider opacity-60 pl-8">{f.techShort}</div>
                  </button>
              ))}
          </div>
  
          {/* Main Content Area */}
          <div className="lg:col-span-9 grid lg:grid-cols-2 gap-8 bg-slate-900/50 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl relative overflow-hidden">
               {/* Background Decoration */}
               <div className="absolute top-0 right-0 w-96 h-96 bg-neonBlue/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
  
               {/* Left Column: Description & Specs */}
               <div className="flex flex-col justify-center order-2 lg:order-1">
                  <AnimatePresence mode="wait">
                      <motion.div
                          key={activeFeature.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                      >
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neonBlue mb-6">
                              <Code size={12} />
                              MODULE: {activeFeature.id.toUpperCase()}
                          </div>
                          
                          <h2 className="text-3xl md:text-4xl font-serif mb-4">{activeFeature.title}</h2>
                          <p className="text-gray-300 leading-relaxed mb-8">{activeFeature.description}</p>
  
                          <div className="grid grid-cols-2 gap-6 mb-8">
                              <div>
                                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                      <MoveVertical size={12} /> {activeFeature.howItWorksTitle}
                                  </h3>
                                  <ul className="space-y-2">
                                      {activeFeature.howItWorks.map((item, i) => (
                                          <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                                              <div className="w-1 h-1 rounded-full bg-neonBlue mt-1.5 shrink-0"></div>
                                              {item}
                                          </li>
                                      ))}
                                  </ul>
                              </div>
                              <div>
                                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                      <Check size={12} /> {activeFeature.outcomeTitle}
                                  </h3>
                                  <ul className="space-y-2">
                                      {activeFeature.outcome.map((item, i) => (
                                          <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                                              <div className="w-1 h-1 rounded-full bg-neonMagenta mt-1.5 shrink-0"></div>
                                              {item}
                                          </li>
                                      ))}
                                  </ul>
                              </div>
                          </div>
  
                          <button className="flex items-center gap-2 text-neonBlue border-b border-neonBlue hover:text-white hover:border-white transition-colors pb-1 w-max text-sm font-bold">
                              View API Documentation <ArrowRight size={14} />
                          </button>
                      </motion.div>
                  </AnimatePresence>
               </div>
  
               {/* Right Column: Interactive Simulation */}
               <div className="order-1 lg:order-2 h-[400px] lg:h-auto bg-black/40 rounded-2xl border border-white/10 p-4 relative flex flex-col">
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="flex-grow relative overflow-hidden rounded-xl mt-6">
                       <AnimatePresence mode="wait">
                           <motion.div 
                              key={activeFeature.id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 1.05 }}
                              transition={{ duration: 0.4 }}
                              className="w-full h-full"
                           >
                               <activeFeature.component />
                           </motion.div>
                       </AnimatePresence>
                  </div>
               </div>
          </div>
        </div>
      </motion.div>
    );
  }
