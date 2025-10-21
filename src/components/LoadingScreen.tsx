import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Square, X, Terminal } from "lucide-react";

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

export function LoadingScreen({
                                  onLoadComplete,
                              }: LoadingScreenProps) {
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
        const messageIndex = Math.floor(
            (progress / 100) * loadingMessages.length,
        );
        if (
            messageIndex < loadingMessages.length &&
            !messages.includes(loadingMessages[messageIndex])
        ) {
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
        } else if (
            currentMessage &&
            typingIndex === currentMessage.length &&
            !messages.includes(currentMessage)
        ) {
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
                    className="min-h-screen bg-black flex items-center justify-center p-8 font-mono"
                >
                    <div className="w-full max-w-4xl">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8 border-b border-green-900 pb-4"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <Terminal className="w-6 h-6 text-green-500" />
                                <h1 className="text-3xl text-green-500 glow-text">KitBerg.gg</h1>
                            </div>
                            <div className="text-sm text-gray-500">
                                <span className="text-green-600">/** </span>
                                <span>System Initialization</span>
                                <span className="text-green-600"> **/</span>
                            </div>
                        </motion.div>

                        {/* Code editor window */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="bg-gray-950 border border-green-900 shadow-lg"
                        >
                            {/* Window title bar */}
                            <div className="bg-gray-900 border-b border-green-900 px-4 py-2 flex items-center justify-between">
                                <span className="text-xs text-gray-500">loading.js</span>
                                <div className="flex items-center gap-1">
                                    <button className="w-6 h-6 hover:bg-gray-700 flex items-center justify-center group rounded">
                                        <Minus className="w-3 h-3 text-gray-400 group-hover:text-white" />
                                    </button>
                                    <button className="w-6 h-6 hover:bg-gray-700 flex items-center justify-center group rounded">
                                        <Square className="w-3 h-3 text-gray-400 group-hover:text-white" />
                                    </button>
                                    <button className="w-6 h-6 hover:bg-red-600 flex items-center justify-center group rounded">
                                        <X className="w-3 h-3 text-gray-400 group-hover:text-white" />
                                    </button>
                                </div>
                            </div>

                            {/* Code content */}
                            <div className="p-6 min-h-[600px] flex flex-col">
                                <div className="flex gap-4 flex-1">
                                    {/* Line numbers */}
                                    <div className="text-gray-700 select-none text-right space-y-1 text-sm">
                                        {[...Array(Math.max(20, messages.length + 10))].map((_, i) => (
                                            <div key={i}>{i + 1}</div>
                                        ))}
                                    </div>

                                    {/* Code content */}
                                    <div className="flex-1 space-y-1 text-sm">
                                        {/* Function declaration */}
                                        <div className="text-purple-400">
                                            <span className="text-blue-400">function</span>{" "}
                                            <span className="text-yellow-400">loadSystem</span>
                                            <span className="text-gray-400">{"() {"}</span>
                                        </div>

                                        {/* Comment */}
                                        <div className="text-gray-600 ml-4">
                                            // Initializing KitBerg.gg
                                        </div>

                                        <div className="ml-4 space-y-1">
                                            {/* Progress variable */}
                                            <div>
                                                <span className="text-blue-400">let</span>{" "}
                                                <span className="text-blue-300">progress</span>{" "}
                                                <span className="text-gray-500">=</span>{" "}
                                                <span className="text-orange-400">{progress}</span>
                                                <span className="text-gray-600">;</span>{" "}
                                                <span className="text-gray-600">
                          // {progress}%
                        </span>
                                            </div>

                                            {/* Empty line */}
                                            <div className="h-2" />

                                            {/* Console messages */}
                                            {messages.map((msg, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="text-gray-400"
                                                >
                                                    <span className="text-blue-300">console</span>
                                                    <span className="text-gray-500">.</span>
                                                    <span className="text-yellow-400">log</span>
                                                    <span className="text-gray-400">(</span>
                                                    <span className="text-green-400">"{msg}"</span>
                                                    <span className="text-gray-400">);</span>
                                                </motion.div>
                                            ))}

                                            {/* Current typing message */}
                                            {currentMessage && typingIndex < currentMessage.length && (
                                                <div className="text-gray-400">
                                                    <span className="text-blue-300">console</span>
                                                    <span className="text-gray-500">.</span>
                                                    <span className="text-yellow-400">log</span>
                                                    <span className="text-gray-400">(</span>
                                                    <span className="text-green-400">
                            "{currentMessage.substring(0, typingIndex)}
                          </span>
                                                    <motion.span
                                                        animate={{ opacity: [1, 0, 1] }}
                                                        transition={{
                                                            duration: 0.5,
                                                            repeat: Infinity,
                                                        }}
                                                        className="bg-green-400 text-black px-0.5"
                                                    >
                                                        _
                                                    </motion.span>
                                                    <span className="text-green-400">"</span>
                                                    <span className="text-gray-400">);</span>
                                                </div>
                                            )}

                                            {/* Loading bar visualization */}
                                            {progress > 20 && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="mt-4"
                                                >
                                                    <div className="text-gray-600">
                                                        // Progress bar
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-blue-400">const</span>{" "}
                                                        <span className="text-blue-300">bar</span>{" "}
                                                        <span className="text-gray-500">=</span>{" "}
                                                        <span className="text-gray-400">[</span>
                                                        <div className="flex-1 flex bg-gray-900 border border-gray-700 h-4 mx-1">
                                                            {[...Array(50)].map((_, i) => {
                                                                const filled = (i / 50) * 100 < progress;
                                                                return (
                                                                    <div
                                                                        key={i}
                                                                        className={`flex-1 h-full ${
                                                                            filled ? "bg-green-500" : "bg-gray-800"
                                                                        }`}
                                                                    />
                                                                );
                                                            })}
                                                        </div>
                                                        <span className="text-gray-400">];</span>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* Success message */}
                                            {progress === 100 && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="mt-4 space-y-1"
                                                >
                                                    <div className="text-gray-600">
                                                        // System ready
                                                    </div>
                                                    <div>
                                                        <span className="text-purple-400">return</span>{" "}
                                                        <span className="text-green-400">"Success"</span>
                                                        <span className="text-gray-600">;</span>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>

                                        {/* Closing brace */}
                                        <div className="text-gray-400 mt-2">{"}"}</div>

                                        {/* Empty line */}
                                        <div className="h-2" />

                                        {/* Execute */}
                                        <div className="text-gray-600">
                                            <span className="text-gray-500">//</span> Execute
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-yellow-400">loadSystem</span>
                                            <span className="text-gray-400">();</span>
                                            {progress < 100 && (
                                                <motion.span
                                                    animate={{ opacity: [0, 1, 0] }}
                                                    transition={{
                                                        duration: 1,
                                                        repeat: Infinity,
                                                    }}
                                                    className="text-cyan-400 ml-2"
                                                >
                                                    ...
                                                </motion.span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Status bar */}
                            <div className="bg-gray-900 border-t border-green-900 px-4 py-2 flex items-center justify-between text-xs">
                                <div className="flex items-center gap-4">
                  <span className={progress === 100 ? "text-green-500" : "text-yellow-500"}>
                    ● {progress === 100 ? "Ready" : "Loading"}
                  </span>
                                    <span className="text-gray-600">JavaScript</span>
                                </div>
                                <div className="text-gray-600">
                                    Progress: {progress}%
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <style>{`
            .glow-text {
              text-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
            }
          `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
