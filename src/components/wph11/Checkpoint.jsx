import { useState } from "react";
import {CheckCircle, Lock, AlertCircle } from 'lucide-react';

// --- CHECKPOINT COMPONENT ---
// This acts as the "Gatekeeper" between sections
export const Checkpoint = ({ darkMode, quiz, onUnlock, titleFinished, navigate, nextSectionTitle, isLast }) => {
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, error, success

  const handleCheck = () => {
    if (selected === null) return;

    if (selected === quiz.correctIndex) {
      setStatus('success');
      setTimeout(() => {
        onUnlock(); // Trigger the unlock after a brief success animation
      }, 800);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 1500); // Reset error state
    }
  };

  const componentName = localStorage.getItem('component');


  if (isLast) return (
    <div className={`p-8 rounded-2xl text-center border-2 border-dashed ${darkMode ? 'border-green-500/30 bg-green-500/10' : 'border-green-200 bg-green-100'}`}>
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white mb-4 shadow-lg shadow-green-500/30">
        <CheckCircle size={32} />
      </div>
      <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Lesson Complete!</h3>
      <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>You've mastered {titleFinished}.</p>
      <button className="border solid px-2 py-1 rounded-2xl mt-3 animate-pulse cursor-pointer" onClick={() => {navigate(`/learn/${componentName}`)}}>Return</button>
    </div>
  );

  return (
    <div className={`relative overflow-hidden p-6 sm:p-8 rounded-2xl border-2 transition-all duration-300 ${status === 'error'
      ? 'border-red-500/50 bg-red-500/5'
      : status === 'success'
        ? 'border-green-500 bg-green-500/10'
        : darkMode ? 'border-indigo-500/30 bg-slate-900' : 'border-indigo-100 bg-white shadow-xl shadow-indigo-100/50'
      }`}>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${darkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
          <Lock size={20} />
        </div>
        <div>
          <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>Checkpoint</h3>
          <p className={`text-xs uppercase tracking-wider ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>Unlock: {nextSectionTitle}</p>
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <p className={`text-lg font-medium mb-4 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
          {quiz.question}
        </p>

        <div className="grid gap-3">
          {quiz.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${selected === idx
                ? darkMode
                  ? 'border-indigo-500 bg-indigo-500/20 text-white'
                  : 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-600/20'
                : darkMode
                  ? 'border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-400'
                  : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-600'
                }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${selected === idx
                  ? 'border-indigo-500 bg-indigo-500'
                  : 'border-slate-400'
                  }`}>
                  {selected === idx && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <span>{opt}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className={`text-sm flex items-center gap-2 ${status === 'error' ? 'text-red-500 opacity-100' : 'opacity-0'} transition-opacity`}>
          <AlertCircle size={16} />
          <span>Not quite! Try again.</span>
        </div>

        <button
          onClick={handleCheck}
          disabled={selected === null || status === 'success'}
          className={`px-8 py-3 rounded-xl font-bold transition-all transform active:scale-95 ${status === 'success'
            ? 'bg-green-500 text-white'
            : selected === null
              ? darkMode ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30'
            }`}
        >
          {status === 'success' ? 'Unlocked!' : 'Continue'}
        </button>
      </div>

      {/* Success Overlay (Flash) */}
      {status === 'success' && (
        <div className="absolute inset-0 flex items-center justify-center bg-green-500/10 backdrop-blur-sm z-10 animate-in fade-in duration-300">
          <div className="bg-white text-green-600 p-4 rounded-full shadow-2xl transform scale-125">
            <CheckCircle size={48} />
          </div>
        </div>
      )}

    </div>
  );
};