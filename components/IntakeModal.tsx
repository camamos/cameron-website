
import React, { useState, useEffect } from 'react';
import { UserIntakeData } from '../types';
import { X, Check } from 'lucide-react';

interface IntakeModalProps {
  isOpen: boolean;
  onSubmit: (data: UserIntakeData) => void;
  onClose: () => void;
}

const IntakeModal: React.FC<IntakeModalProps> = ({ isOpen, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<UserIntakeData>({
    firstName: '',
    email: '',
    phone: '',
    city: ''
  });
  const [consentChecked, setConsentChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentChecked) return;
    onSubmit(formData);
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content - Optimized for Mobile compactness */}
      <div className={`relative bg-white w-full max-w-xl rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>
        
        {/* Close button */}
        <button 
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-black transition-colors p-1.5 z-[110] bg-white rounded-full"
            aria-label="Close modal"
        >
            <X size={20} className="md:w-6 md:h-6" />
        </button>

        <div className="p-5 md:p-10">
          <div className="text-center mb-4 md:mb-8">
            <h2 className="text-2xl md:text-5xl font-black text-black mb-1 tracking-tight leading-none uppercase">
              Join The <span className="text-[#EF5B25]">Family</span>
            </h2>
            <p className="text-gray-500 text-[10px] md:text-sm font-bold uppercase tracking-widest mt-1">
              Presale Codes • Free Merch • Exclusive Content
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-[9px] md:text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full bg-gray-50 text-black border border-gray-100 rounded-lg md:rounded-xl px-3 py-2 md:py-3 text-sm focus:ring-2 focus:ring-[#EF5B25] focus:border-transparent outline-none transition-all placeholder-gray-300 font-bold"
                    placeholder="Kevin"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-[9px] md:text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    className="w-full bg-gray-50 text-black border border-gray-100 rounded-lg md:rounded-xl px-3 py-2 md:py-3 text-sm focus:ring-2 focus:ring-[#EF5B25] focus:border-transparent outline-none transition-all placeholder-gray-300 font-bold"
                    placeholder="New York"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[9px] md:text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-gray-50 text-black border border-gray-100 rounded-lg md:rounded-xl px-3 py-2 md:py-3 text-sm focus:ring-2 focus:ring-[#EF5B25] focus:border-transparent outline-none transition-all placeholder-gray-300 font-bold"
                    placeholder="kevin@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-[9px] md:text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full bg-gray-50 text-black border border-gray-100 rounded-lg md:rounded-xl px-3 py-2 md:py-3 text-sm focus:ring-2 focus:ring-[#EF5B25] focus:border-transparent outline-none transition-all placeholder-gray-300 font-bold"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
            </div>

            <div className="flex items-start gap-2 pt-1">
              <div 
                onClick={() => setConsentChecked(!consentChecked)}
                className={`mt-0.5 flex-shrink-0 w-4 h-4 md:w-5 md:h-5 border-2 rounded flex items-center justify-center cursor-pointer transition-all ${consentChecked ? 'bg-[#EF5B25] border-[#EF5B25]' : 'bg-gray-50 border-gray-200'}`}
              >
                {consentChecked && <Check size={12} className="text-white font-black md:w-[14px] md:h-[14px]" />}
              </div>
              <p className="text-[9px] md:text-[11px] leading-tight text-gray-400 font-bold select-none cursor-pointer" onClick={() => setConsentChecked(!consentChecked)}>
                I consent to receive marketing emails and texts about shows. Msg & data rates may apply.
              </p>
            </div>

            <button
              type="submit"
              disabled={!consentChecked}
              className={`w-full text-white rounded-lg md:rounded-xl font-black text-sm md:text-lg py-3 md:py-4 transition-all mt-1 shadow-lg uppercase tracking-widest ${consentChecked ? 'bg-[#EF5B25] hover:bg-black cursor-pointer' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'}`}
            >
              Enter Site
            </button>
          </form>
          
          <p className="text-center text-[8px] md:text-[10px] text-zinc-300 mt-4 md:mt-6 font-bold tracking-tight uppercase">
            No spam. Just laughs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntakeModal;
