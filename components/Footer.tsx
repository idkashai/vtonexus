import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40 backdrop-blur-sm pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Ready to Digitise Your Wardrobe?
            </h2>
            <p className="text-gray-400 max-w-md">
              Join the waitlist to be among the first to experience true virtual fit.
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <div className="relative max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-lg py-4 px-6 text-white placeholder:text-gray-500 focus:outline-none focus:border-neonBlue transition-colors"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-neonBlue text-black px-4 rounded font-bold hover:bg-cyan-300 transition-colors flex items-center">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 border-t border-white/5 pt-8">
          <div className="flex gap-6 mb-4 md:mb-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy (GDPR Compliant)</a>
            <a href="#" className="hover:text-white transition-colors">API Status</a>
            <a href="#/login" className="hover:text-white transition-colors">Login</a>
          </div>
          <p>&copy; {new Date().getFullYear()} VTO-Nexus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}