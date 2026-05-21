
import React, { useState, useEffect } from 'react';
import { UserIntakeData } from '../types';
import { X } from 'lucide-react';

interface IntakeModalProps {
  isOpen: boolean;
  onSubmit: (data: UserIntakeData) => void;
  onClose: () => void; // Optional allowing close without submit for testing
}

const IntakeModal: React.FC<IntakeModalProps> = ({ isOpen, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<UserIntakeData>({
    firstName: '',
    email: '',
    phone: '',
    city: ''
  });
  const [isVisible, setIsVisible] = useState(false);

  // Animate in
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
    onSubmit(formData);
  };

  return (
    <div className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Backdrop - Simple Dark Blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      ></div>

      {/* Modal Content - Subtle & Clean */}
      <div className={`relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>
        
        {/* Close button */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors p-2"
        >
            <X size={20} />
        </button>

        <div className="p-8 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-2 tracking-tight">
              Welcome To The <span className="text-[#EF5B25]">FAMILY</span>
            </h2>
            <p className="text-gray-600 text-sm font-bold">Discounted Presale Codes, Free Merch Drops & Exclusive Content.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="firstName" className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="w-full bg-gray-50 text-black border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#EF5B25] focus:border-transparent outline-none transition-all placeholder-gray-400 font-medium"
                placeholder="Kevin"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="city" className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">City</label>
              <input
                type="text"
                id="city"
                name="city"
                required
                className="w-full bg-gray-50 text-black border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#EF5B25] focus:border-transparent outline-none transition-all placeholder-gray-400 font-medium"
                placeholder="New York"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-gray-50 text-black border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#EF5B25] focus:border-transparent outline-none transition-all placeholder-gray-400 font-medium"
                placeholder="kevin@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="w-full bg-gray-50 text-black border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#EF5B25] focus:border-transparent outline-none transition-all placeholder-gray-400 font-medium"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#EF5B25] text-white rounded-lg font-bold text-lg py-3.5 hover:bg-black transition-all mt-4 shadow-md hover:shadow-lg uppercase tracking-wide"
            >
              Enter The Site
            </button>
          </form>
          
          <p className="text-center text-[11px] text-gray-400 mt-8 font-medium">
            My name is Cam, not spam. We promise not to spam you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntakeModal;
