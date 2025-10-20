import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Square, X } from "lucide-react";

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const loadingMessages = [
  "Initializing system...",
  "Loading assets...",
  "Connecting to server...",
  "Syncing player data...",
  "Loading champion roster...",
  "Preparing user interface...",
  "Validating game files...",
  "Establishing connection...",
  "Loading complete!",
];

export function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showScreen, setShowScreen] = useState(true);
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowScreen(false);
            setTimeout(onLoadComplete, 500);
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  // Add messages based on progress
  useEffect(() => {
    const messageIndex = Math.floor((progress / 100) * loadingMessages.length);
    if (messageIndex < loadingMessages.length && !messages.includes(loadingMessages[messageIndex])) {
      setCurrentMessage(loadingMessages[messageIndex]);
      setTypingIndex(0);
    }
  }, [progress, messages]);

  // Typing effect
  useEffect(() => {
    if (currentMessage && typingIndex < currentMessage.length) {
      const timeout = setTimeout(() => {
        setTypingIndex(typingIndex + 1);
      }, 20);
      return () => clearTimeout(timeout);
    } else if (currentMessage && typingIndex === currentMessage.length && !messages.includes(currentMessage)) {
      setMessages((prev) => [...prev, currentMessage]);
    }
  }, [currentMessage, typingIndex, messages]);

  return (
    <AnimatePresence>
      {showScreen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-gray-900 flex items-center justify-center p-8 font-mono"
        >
          {/* Windows Console Window */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl bg-black border border-gray-700 shadow-2xl"
          >
            {/* Windows Title Bar */}
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-b border-gray-700 px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-700 flex items-center justify-center text-[8px] text-gray-400">
                  C:\
                </div>
                <span className="text-xs text-gray-300">IsBerg.gg - Command Prompt</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="w-6 h-6 hover:bg-gray-700 flex items-center justify-center group">
                  <Minus className="w-3 h-3 text-gray-400 group-hover:text-white" />
                </button>
                <button className="w-6 h-6 hover:bg-gray-700 flex items-center justify-center group">
                  <Square className="w-3 h-3 text-gray-400 group-hover:text-white" />
                </button>
                <button className="w-6 h-6 hover:bg-red-600 flex items-center justify-center group">
                  <X className="w-3 h-3 text-gray-400 group-hover:text-white" />
                </button>
              </div>
            </div>

            {/* Console Content */}
            <div className="bg-black p-6 min-h-[600px] flex flex-col">
              {/* Initial prompt */}
              <div className="text-gray-300 text-sm mb-4">
                <div>Microsoft Windows [Version 10.0.19045.3693]</div>
                <div>(c) IsBerg Corporation. All rights reserved.</div>
                <div className="mt-2" />
                <div className="text-cyan-400">C:\Users\IsBerg&gt; start IsBerg.gg</div>
                <div className="mt-2" />
              </div>

              {/* Console messages */}
              <div className="flex-1 space-y-1 text-sm">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-300"
                  >
                    {msg}
                    {index === messages.length - 1 && progress < 100 && (
                      <motion.span
                        className="text-cyan-400"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                        }}
                      >
                        ...
                      </motion.span>
                    )}
                  </motion.div>
                ))}
                
                {/* Current typing message */}
                {currentMessage && typingIndex < currentMessage.length && (
                  <div className="text-gray-300">
                    {currentMessage.substring(0, typingIndex)}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="bg-gray-300 text-black px-1"
                    >
                      _
                    </motion.span>
                  </div>
                )}

                {/* Loading bar visualization */}
                {progress > 20 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4"
                  >
                    <div className="text-gray-400 text-xs mb-1">Progress:</div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <span>[</span>
                      <div className="flex-1 flex bg-gray-900 border border-gray-700">
                        {[...Array(50)].map((_, i) => {
                          const filled = (i / 50) * 100 < progress;
                          return (
                            <div
                              key={i}
                              className={`flex-1 h-4 ${
                                filled ? "bg-green-500" : "bg-gray-800"
                              }`}
                            />
                          );
                        })}
                      </div>
                      <span>]</span>
                      <span className="text-green-400 tabular-nums w-12">{progress}%</span>
                    </div>
                  </motion.div>
                )}

                {/* File loading simulation */}
                {progress > 40 && progress < 90 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-xs text-gray-500 space-y-0.5"
                  >
                    <div>Loading file: C:\Program Files\IsBerg\assets\champions.dat</div>
                    <div>Loading file: C:\Program Files\IsBerg\data\player_stats.json</div>
                    <div>Loading file: C:\Program Files\IsBerg\ui\components.dll</div>
                  </motion.div>
                )}

                {/* Success message */}
                {progress === 100 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 text-green-400"
                  >
                    <div>System ready.</div>
                    <div>Launching interface...</div>
                    <div className="mt-2 flex items-center gap-1">
                      <span className="text-cyan-400">C:\Users\IsBerg&gt;</span>
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="bg-gray-300 text-black px-1"
                      >
                        _
                      </motion.span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}