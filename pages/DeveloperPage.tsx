import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Copy, Server, Globe, Cpu, Layout, Shield, Lock, ChevronRight, Check } from 'lucide-react';

// --- Sub-components ---

const TerminalHero = () => {
  const [text, setText] = useState('');
  const fullText = "npm install @vto-nexus/sdk";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-block px-3 py-1 mb-6 border border-[#00ff41]/30 bg-[#00ff41]/10 text-[#00ff41] text-xs font-mono rounded-sm">
            DEV_PREVIEW_v2.4.0
          </div>
          <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight">
            Add Virtual Try-On <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff41] to-emerald-600">
              To Your Stack.
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-xl leading-relaxed">
            A framework-agnostic SDK that handles physics, rendering, and user sessions. 
            You focus on selling; we handle the geometry.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-[#00ff41] text-black font-bold font-mono rounded hover:bg-emerald-400 transition-colors">
              Read Docs
            </button>
            <button className="px-8 py-3 border border-white/20 text-white font-mono rounded hover:bg-white/5 transition-colors">
              Get API Keys
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-1 bg-[#00ff41]/20 blur-xl rounded-lg"></div>
          <div className="relative bg-[#0a0a0a] border border-[#00ff41]/30 rounded-lg overflow-hidden shadow-2xl font-mono text-sm">
            <div className="bg-[#1a1a1a] p-3 flex gap-2 border-b border-[#00ff41]/10">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <div className="p-6 h-64 text-gray-300">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#00ff41]">➜</span>
                <span className="text-blue-400">~</span>
                <span>{text}</span>
                <span className="w-2 h-4 bg-[#00ff41] animate-pulse"></span>
              </div>
              {text === fullText && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  <div className="text-gray-500">added 1 package, and audited 24 packages in 2s</div>
                  <div className="text-gray-500">11 packages are looking for funding</div>
                  <div className="text-[#00ff41] mt-2">➜ ~ <span className="animate-pulse">_</span></div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ArchitectureDiagram = () => {
  return (
    <section className="py-24 bg-black border-y border-white/10 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif mb-4">The Logic Flow</h2>
          <p className="text-gray-400">Zero-latency streaming via WebRTC/Canvas</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 items-center">
          {/* Step 1 */}
          <div className="bg-[#111] p-6 rounded-xl border border-white/10 text-center relative group hover:border-[#00ff41] transition-colors">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:text-[#00ff41]">
              <Globe size={24} />
            </div>
            <h3 className="font-bold text-white mb-2">1. Brand Store</h3>
            <p className="text-xs text-gray-500 font-mono">SDK.init()</p>
            {/* Arrow */}
            <div className="hidden md:block absolute top-1/2 -right-6 w-8 h-[2px] bg-white/20"></div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#111] p-6 rounded-xl border border-white/10 text-center relative group hover:border-[#00ff41] transition-colors">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:text-[#00ff41]">
              <Server size={24} />
            </div>
            <h3 className="font-bold text-white mb-2">2. Nexus API</h3>
            <p className="text-xs text-gray-500 font-mono">Auth & Assets</p>
            {/* Arrow */}
            <div className="hidden md:block absolute top-1/2 -right-6 w-8 h-[2px] bg-white/20"></div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#111] p-6 rounded-xl border border-white/10 text-center relative group hover:border-[#00ff41] transition-colors">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:text-[#00ff41]">
              <Cpu size={24} />
            </div>
            <h3 className="font-bold text-white mb-2">3. Physics Engine</h3>
            <p className="text-xs text-gray-500 font-mono">Simulate(Cloth)</p>
            {/* Arrow */}
            <div className="hidden md:block absolute top-1/2 -right-6 w-8 h-[2px] bg-white/20"></div>
          </div>

          {/* Step 4 */}
          <div className="bg-[#111] p-6 rounded-xl border border-white/10 text-center relative group hover:border-[#00ff41] transition-colors">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:text-[#00ff41]">
              <Layout size={24} />
            </div>
            <h3 className="font-bold text-white mb-2">4. Embed Viewer</h3>
            <p className="text-xs text-gray-500 font-mono">Canvas Stream</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const InteractiveSandbox = () => {
  const [env, setEnv] = useState<'studio_daylight' | 'neon_club'>('studio_daylight');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeSnippet = `import { VirtualRoom } from '@vto-nexus/react';

export default function ProductPage() {
  return (
    <VirtualRoom 
      apiKey="pk_live_xyz" 
      product="denim_jacket_v2" 
      environment="${env}"
      physics="high_fidelity"
    />
  )
}`;

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif mb-4">Try the "Magic"</h2>
        <p className="text-gray-400">Change parameters below and watch the integration update instantly.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-0 border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
        {/* Left: Code Editor */}
        <div className="bg-[#0f0f0f] p-6 border-r border-white/10 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-mono text-gray-500">ProductPage.tsx</span>
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
            >
              {copied ? <Check size={14} className="text-[#00ff41]" /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          
          <pre className="font-mono text-sm leading-relaxed text-gray-300 overflow-x-auto flex-grow">
            <code>
              <span className="text-purple-400">import</span> <span className="text-white">{`{ VirtualRoom }`}</span> <span className="text-purple-400">from</span> <span className="text-green-400">'@vto-nexus/react'</span>;<br/><br/>
              <span className="text-purple-400">export default function</span> <span className="text-blue-400">ProductPage</span>() {'{'}<br/>
              &nbsp;&nbsp;<span className="text-purple-400">return</span> (<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">&lt;VirtualRoom</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sky-300">apiKey</span>=<span className="text-green-400">"pk_live_xyz"</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sky-300">product</span>=<span className="text-green-400">"denim_jacket_v2"</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sky-300">environment</span>=<span className="text-green-400">"{env}"</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sky-300">physics</span>=<span className="text-green-400">"high_fidelity"</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-300">/&gt;</span><br/>
              &nbsp;&nbsp;)<br/>
              {'}'}
            </code>
          </pre>

          <div className="mt-6 pt-6 border-t border-white/10">
            <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">Environment Config</label>
            <select 
              value={env} 
              onChange={(e) => setEnv(e.target.value as any)}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded p-2 text-sm text-white focus:border-[#00ff41] focus:outline-none"
            >
              <option value="studio_daylight">studio_daylight</option>
              <option value="neon_club">neon_club</option>
            </select>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="relative bg-black min-h-[400px] flex items-center justify-center overflow-hidden">
           {/* Background simulates environment */}
           <motion.div 
             className="absolute inset-0 transition-colors duration-500"
             animate={{ 
               backgroundColor: env === 'neon_club' ? '#0f0518' : '#e5e5e5',
             }}
           >
              {env === 'neon_club' && (
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 to-cyan-900/40"></div>
              )}
           </motion.div>

           {/* Cloth Object Simulation */}
           <motion.div 
             key={env}
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5 }}
             className="relative z-10 w-64 h-80 rounded-xl overflow-hidden shadow-2xl"
           >
              <img
                src={env === 'neon_club'
                  ? "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=600&q=80"
                  : "https://images.unsplash.com/photo-1503944168849-c1246463e59f?auto=format&fit=crop&w=600&q=80"
                }
                className="w-full h-full object-cover"
                alt="Preview"
              />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded text-xs font-mono text-[#00ff41] border border-[#00ff41]/30">
                LIVE_PREVIEW
              </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

const ApiReference = () => {
  const endpoints = [
    { method: 'POST', url: '/v1/garments/upload', desc: 'Upload OBJ/GLB assets. Returns asset_id.' },
    { method: 'GET', url: '/v1/users/measurements', desc: 'Retrieve encrypted measurements for sizing logic.' },
    { method: 'WEBHOOK', url: 'return_risk_high', desc: 'Alert sent when user selects size mismatch.' },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-serif mb-12 border-l-4 border-[#00ff41] pl-6">API Reference</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {endpoints.map((ep, i) => (
          <div key={i} className="bg-[#111] p-6 rounded-lg border border-white/10 hover:border-[#00ff41] group transition-all cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-[#00ff41]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <span className={`font-mono text-sm font-bold px-2 py-1 rounded ${
                  ep.method === 'POST' ? 'bg-blue-900 text-blue-300' : 
                  ep.method === 'GET' ? 'bg-green-900 text-green-300' : 'bg-purple-900 text-purple-300'
                }`}>
                  {ep.method}
                </span>
                <ChevronRight className="text-gray-600 group-hover:text-[#00ff41]" size={16} />
              </div>
              <code className="block text-gray-200 font-mono text-sm mb-2 group-hover:text-[#00ff41] transition-colors">
                {ep.url}
              </code>
              <p className="text-sm text-gray-500 leading-relaxed">
                {ep.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const SecuritySection = () => {
  return (
    <section className="py-24 bg-white/5 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="w-16 h-16 bg-[#00ff41]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#00ff41]">
          <Shield size={32} />
        </div>
        <h2 className="text-3xl font-serif mb-6">Enterprise-Grade Security</h2>
        <div className="grid md:grid-cols-3 gap-8 text-left mt-12">
          <div className="flex gap-4">
            <Lock className="text-gray-500 shrink-0" />
            <div>
              <h4 className="font-bold text-white">SOC2 Compliant</h4>
              <p className="text-sm text-gray-400 mt-1">Audited security controls and infrastructure.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Globe className="text-gray-500 shrink-0" />
            <div>
              <h4 className="font-bold text-white">GDPR Ready</h4>
              <p className="text-sm text-gray-400 mt-1">User scans are tokenized. We never store raw video.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Server className="text-gray-500 shrink-0" />
            <div>
              <h4 className="font-bold text-white">Zero-Knowledge</h4>
              <p className="text-sm text-gray-400 mt-1">Biometric data is processed in ephemeral RAM only.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function DeveloperPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#050505] min-h-screen text-gray-200 selection:bg-[#00ff41] selection:text-black"
    >
      <TerminalHero />
      <ArchitectureDiagram />
      <InteractiveSandbox />
      <ApiReference />
      <SecuritySection />
      
      <div className="py-24 text-center border-t border-white/10">
        <h3 className="text-2xl font-serif mb-8">Ready to build?</h3>
        <button className="px-8 py-4 bg-[#00ff41] text-black font-bold font-mono rounded hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(0,255,65,0.3)]">
          Get Your API Keys
        </button>
      </div>
    </motion.div>
  );
}
