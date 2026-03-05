
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { getOfficeGuideResponse } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface AIChatProps {
  onScrollToSection?: (id: string) => void;
}

const AIChat: React.FC<AIChatProps> = ({ onScrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Guten Tag. Ich bin OfficeGuide AI. Wie kann ich Ihnen bei Ihren Fragen zu unseren Paketen helfen?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getOfficeGuideResponse(userMsg, messages);
    setMessages(prev => [...prev, { role: 'model', text: response || 'Keine Antwort erhalten.' }]);
    setIsLoading(false);
  };

  // Einfache Funktion zum Rendern von Markdown-Links [Text](URL)
  const renderMessageContent = (text: string) => {
    const parts = text.split(/(\[.*?\]\(.*?\))/g);
    return parts.map((part, index) => {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        const linkText = match[1];
        const url = match[2];
        
        // INTERNE NAVIGATION: Wenn Calendly-Link, dann scrolle zu #termin
        if (url.includes('calendly.com') && onScrollToSection) {
          return (
            <button
              key={index}
              onClick={() => {
                setIsOpen(false);
                onScrollToSection('termin');
              }}
              className="underline font-bold text-[#0ea5e9] hover:text-white transition-colors bg-transparent border-none p-0 inline-block align-baseline"
            >
              {linkText}
            </button>
          );
        }

        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-bold text-[#0ea5e9] hover:text-white transition-colors"
          >
            {linkText}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[550px] bg-[#0a0a0a] border border-white/10 rounded-[28px] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 bg-[#111] flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0ea5e9]/20 flex items-center justify-center border border-[#0ea5e9]/30">
                  <Bot className="w-5 h-5 text-[#0ea5e9]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-white">OfficeGuide AI</h4>
                  <p className="text-[10px] text-[#0ea5e9] uppercase tracking-[0.2em] font-bold">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-[#0a0a0a] to-[#080808]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                    ? 'bg-[#ef4444] text-white rounded-tr-none' 
                    : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                  }`}>
                    {renderMessageContent(msg.text)}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-1.5 bg-[#0ea5e9] rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-[#0ea5e9] rounded-full animate-bounce delay-150" />
                      <div className="w-1.5 h-1.5 bg-[#0ea5e9] rounded-full animate-bounce delay-300" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-[#111] border-t border-white/10 shrink-0">
              <div className="relative flex items-center gap-2 bg-black border border-white/10 rounded-2xl p-1 focus-within:border-[#0ea5e9] transition-all duration-300">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Frage stellen..."
                  className="flex-1 bg-transparent border-none py-3 px-4 text-sm text-white focus:outline-none placeholder:text-gray-600"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="p-3 text-[#0ea5e9] hover:bg-[#0ea5e9]/10 rounded-xl transition-all disabled:opacity-30"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-[#0ea5e9] text-white shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all group relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquare className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#ef4444] rounded-full border-2 border-[#080808] animate-pulse" />
      </button>
    </div>
  );
};

export default AIChat;
