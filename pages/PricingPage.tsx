import React from 'react';
import { motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';

const tiers = [
  {
    name: "The Social Experiment",
    target: "B2C Users",
    price: "Free",
    description: "For fashion lovers who want to visualize looks.",
    features: ["1 Avatar Profile", "5 Try-Ons per day", "Standard Resolution"],
    cta: "Start Styling",
    accent: "border-white/20",
    glow: "hover:shadow-white/5",
    buttonColor: "bg-white/10 hover:bg-white text-white hover:text-black"
  },
  {
    name: "Growth API",
    target: "Shopify Store Owners",
    price: "$0.10",
    period: "per session",
    description: "Plug-and-play solution to reduce returns.",
    features: ["Unlimited API Calls", "Fit Heatmap Access", "Analytics Dashboard (Return Prediction)"],
    cta: "Get API Key",
    accent: "border-neonBlue",
    glow: "shadow-[0_0_30px_rgba(0,240,255,0.15)]",
    buttonColor: "bg-neonBlue text-black hover:bg-cyan-300"
  },
  {
    name: "Enterprise Integration",
    target: "Major Brands",
    price: "Custom",
    description: "Full-scale virtual dressing room implementation.",
    features: ["White-Glove 3D Asset Creation", "Custom Environment Lighting", "Dedicated GPU Server"],
    cta: "Contact Sales",
    accent: "border-neonMagenta",
    glow: "hover:shadow-[0_0_30px_rgba(255,0,60,0.15)]",
    buttonColor: "bg-neonMagenta text-white hover:bg-rose-500"
  }
];

export default function PricingPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="pt-12 pb-24 px-6 max-w-7xl mx-auto"
    >
      <div className="text-center mb-16">
        <h1 className="font-serif text-5xl md:text-6xl mb-6">Transparent Pricing</h1>
        <p className="text-gray-400 text-lg">Whether you're browsing or building.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {tiers.map((tier, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-slate-900/50 backdrop-blur-md border rounded-2xl p-8 flex flex-col ${tier.accent} ${tier.glow} transition-shadow duration-300 relative overflow-hidden`}
          >
            {tier.name === "Growth API" && (
                <div className="absolute top-0 right-0 bg-neonBlue text-black text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
            )}
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-6">{tier.target}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-serif font-bold">{tier.price}</span>
                {tier.period && <span className="text-gray-400 text-sm">{tier.period}</span>}
              </div>
              <p className="text-gray-400 mt-4 text-sm leading-relaxed">{tier.description}</p>
            </div>

            <div className="flex-grow mb-8">
              <ul className="space-y-4">
                {tier.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-sm text-gray-200">
                    <Check className="w-5 h-5 text-gray-500 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            <button className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${tier.buttonColor}`}>
              {tier.cta}
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}