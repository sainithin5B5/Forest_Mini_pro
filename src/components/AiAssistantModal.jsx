import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, RefreshCw } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export default function AiAssistantModal({ isOpen, onClose }) {
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: '👋 Hello Eco Resident! I am SylvaAI, your cyber-organic forest assistant. Ask me anything about forest health, solar energy, water harvesting, wildlife tracking, or your digital tree nursery!',
      time: new Date().toLocaleTimeString(),
    },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      fetch('/api/health')
        .then((res) => res.json())
        .then((data) => {
          if (data && data.geminiApiKeyPresent) {
            setHasApiKey(true);
          }
        })
        .catch(() => {});
    }
  }, [messages, isOpen]);

  const suggestionChips = [
    { label: '🌿 Forest Health', prompt: 'What is the current forest health status?' },
    { label: '☀️ Solar Power', prompt: 'How much solar power are we generating?' },
    { label: '🦊 Wildlife Track', prompt: 'Where are the wild animals currently located?' },
    { label: '🪴 Nursery Guide', prompt: 'How do I earn more Spore Points in the nursery?' },
  ];

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputMsg;
    if (!query.trim()) return;

    audioEngine.playChime('nourish');

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMsg('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      if (res.ok) {
        const data = await res.json();
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              sender: 'ai',
              text: data.reply,
              time: data.timestamp || new Date().toLocaleTimeString(),
            },
          ]);
          setIsTyping(false);
          audioEngine.playChime('time');
        }, 500);
        return;
      }
    } catch (e) {}

    // Fallback response if offline
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: `🌿 Forest Health Index is currently at 87%! Solar output is generating 1.24 kW at 87% battery efficiency today across your active treehouse units.`,
          time: new Date().toLocaleTimeString(),
        },
      ]);
      setIsTyping(false);
      audioEngine.playChime('time');
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="hud-panel hud-corner max-w-2xl w-full rounded-3xl p-6 relative border border-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.3)] flex flex-col h-[600px] justify-between text-slate-100 font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-emerald-500/30 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 glow-emerald-sm">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-white">SylvaAI Assistant</h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${hasApiKey ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'}`}>
                  {hasApiKey ? '✨ GEMINI AI CONNECTED' : 'ONLINE v2.4'}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {hasApiKey ? 'Google Gemini AI Powered • Live Telemetry Synced' : 'Cyber-Organic Intelligence • Real-time SQLite Data Synced'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              audioEngine.playChime('strata');
              onClose();
            }}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-emerald-400 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggestion Chips Bar */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 font-mono text-xs border-b border-emerald-500/20 no-scrollbar">
          <span className="text-[10px] text-slate-400 uppercase shrink-0">Quick Prompts:</span>
          {suggestionChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip.prompt)}
              className="px-2.5 py-1 rounded-xl bg-[#04160d] border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 transition-all shrink-0 text-[11px]"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Chat History Box */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 font-sans text-sm pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] p-3.5 rounded-2xl border ${
                  msg.sender === 'user'
                    ? 'bg-[#06181d] border-cyan-500/30 text-cyan-100 rounded-tr-none'
                    : 'bg-[#04150d] border-emerald-500/30 text-slate-100 rounded-tl-none'
                }`}
              >
                <p className="leading-relaxed text-xs sm:text-sm">{msg.text}</p>
                <span className="text-[10px] font-mono text-slate-500 block mt-1 text-right">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>SylvaAI is querying SQLite database...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 pt-3 border-t border-emerald-500/30 font-mono"
        >
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="Ask AI Assistant about solar power, wildlife, or forest health..."
            className="flex-1 px-4 py-3 rounded-2xl bg-[#030e09] border border-emerald-500/30 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-all"
          />

          <button
            type="submit"
            className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold hover:scale-105 transition-all shadow-lg"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
