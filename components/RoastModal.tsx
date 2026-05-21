import React, { useState, useEffect } from 'react';
import { X, Flame, Loader2 } from 'lucide-react';
import { generateRoast } from '../services/geminiService';

interface RoastModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  userCity?: string;
}

const RoastModal: React.FC<RoastModalProps> = ({ isOpen, onClose, userName = "Stranger", userCity = "Nowhere" }) => {
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
        handleGenerateRoast();
    }
  }, [isOpen]);

  const handleGenerateRoast = async () => {
    setLoading(true);
    setRoast("");
    // Small artificial delay for effect if instant
    await new Promise(resolve => setTimeout(resolve, 500));
    const result = await generateRoast(userName, userCity);
    setRoast(result);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
       {/* Backdrop */}
       <div className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer" onClick={onClose}></div>
       
       {/* Content */}
       <div className="relative bg-white border-4 border-black w-full max-w-lg p-8 shadow-[12px_12px_0px_0px_#EF5B25] animate-in fade-in zoom-in-95 duration-200">
          <button onClick={onClose} className="absolute top-4 right-4 text-black hover:text-[#EF5B25] transition-colors p-1">
            <X size={24} />
          </button>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#EF5B25] border-4 border-black rounded-full mb-6 shadow-[4px_4px_0px_0px_#000]">
                <Flame size={40} className="text-white fill-white" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black uppercase italic mb-2 leading-none">Roasted</h2>
            <p className="text-gray-500 font-bold mb-8 text-sm uppercase tracking-widest">Be careful what you wish for</p>
            
            {loading ? (
                <div className="flex flex-col items-center justify-center py-8 space-y-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
                    <Loader2 className="animate-spin text-[#EF5B25]" size={48} />
                    <p className="font-black text-black animate-pulse tracking-widest uppercase text-xs">Generating insults...</p>
                </div>
            ) : (
                <div className="bg-black text-white p-8 border-4 border-black shadow-[8px_8px_0px_0px_#ccc] transform -rotate-1 transition-transform hover:rotate-0">
                    <p className="text-xl md:text-2xl font-black uppercase leading-tight tracking-tight">"{roast}"</p>
                </div>
            )}

            <button 
                onClick={onClose}
                className="mt-8 bg-transparent hover:bg-black text-black hover:text-white border-2 border-black px-8 py-3 font-black uppercase tracking-widest transition-all text-sm"
            >
                I've Heard Enough
            </button>
          </div>
       </div>
    </div>
  );
};

export default RoastModal;