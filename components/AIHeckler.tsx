
import React, { useState } from 'react';
import { Sparkles, MessageSquare, Loader2 } from 'lucide-react';
import { generateTopicJoke } from '../services/geminiService';

const AIHeckler: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [joke, setJoke] = useState<{ setup: string; punchline: string } | null>(null);

  const handleRoast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    setJoke(null);

    const result = await generateTopicJoke(topic);
    setJoke(result);
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white border-4 border-black shadow-[15px_15px_0px_0px_#000] p-8 md:p-12 relative overflow-hidden">
        {/* Decor */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#EF5B25] rounded-full opacity-20 blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white mb-6 border-2 border-black shadow-[4px_4px_0px_0px_#EF5B25]">
                <Sparkles size={28} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-black mb-4 uppercase italic tracking-tighter">AI Writer's Room</h2>
            <p className="text-gray-500 mb-10 max-w-lg mx-auto font-bold text-lg leading-relaxed">
              Give me a topic, and I'll write a joke about it instantly. Warning: Results may vary from hilarious to painfully awkward.
            </p>

            <form onSubmit={handleRoast} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-12">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Airline food"
                className="flex-1 bg-gray-50 border-2 border-black text-black px-6 py-4 focus:border-[#EF5B25] outline-none transition-all font-bold placeholder-gray-400 uppercase tracking-wide shadow-[4px_4px_0px_0px_#ccc]"
              />
              <button
                type="submit"
                disabled={isLoading || !topic.trim()}
                className="bg-[#EF5B25] text-black font-black px-8 py-4 hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 min-w-[140px] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] uppercase tracking-widest"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <>Roast It <MessageSquare size={18}/></>}
              </button>
            </form>

            {joke && (
                <div className="bg-black text-white border-4 border-black p-8 md:p-10 text-left animate-in fade-in slide-in-from-bottom-4 duration-300 shadow-[8px_8px_0px_0px_#EF5B25] rotate-1">
                    <p className="text-white/90 text-xl md:text-2xl font-bold mb-6 leading-relaxed font-mono">
                        "{joke.setup}"
                    </p>
                    <p className="text-[#EF5B25] text-3xl md:text-4xl font-black uppercase italic">
                        "{joke.punchline}"
                    </p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AIHeckler;
