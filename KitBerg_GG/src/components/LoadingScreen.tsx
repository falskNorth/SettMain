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
                                <h1 className="text-3xl text-green-500 glow-text">IsBerg.gg</h1>
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
                            <div className="p-6 min-h-[400px] flex flex-col">
                                <div className="flex gap-4 flex-1">
                                    {/* Line numbers */}
                                    <div className="text-gray-700 select-none text-right space-y-1 text-sm">
                                        {[...Array(Math.max(15, messages.length + 5))].map((_, i) => (
                                            <div key={i}>{i + 1}</div>
                                        ))}
                                    </div>

                                    {/* Code content */}
                                    <div className="flex-1 space-y-1 text-sm">
                                        {/* Function declaration */}
                                        <div className="text-purple-400">
                                            <span className="text-blue-400">async function</span>{" "}
                                            <span className="text-yellow-400">loadSystem</span>
                                            <span className="text-gray-400">{"() {"}</span>
                                        </div>

                                        <div className="ml-4 space-y-1">
                                            {/* Comment */}
                                            <div className="text-gray-600">
                                                // Initialize IsBerg.gg system
                                            </div>

                                            {/* Progress variable
                                            <div>
                                                <span className="text-blue-400">let</span>{" "}
                                                <span className="text-blue-300">progress</span>{" "}
                                                <span className="text-gray-500">=</span>{" "}
                                                <span className="text-orange-400">0</span>
                                                <span className="text-gray-600">;</span>
                                            </div> */}

                                            {/* Empty line */}
                                            <div className="h-2" />

                                            {/* Try block */}
                                            <div>
                                                <span className="text-purple-400">try</span>
                                                <span className="text-gray-400"> {"{"}</span>
                                            </div>

                                            <div className="ml-4 space-y-1">
                                                {/* Loading steps */}
                                                <div className="text-gray-600">
                                                    // Load core systems
                                                </div>

                                                <div>
                                                    <span className="text-blue-400">const</span>{" "}
                                                    <span className="text-blue-300">modules</span>{" "}
                                                    <span className="text-gray-500">=</span>{" "}
                                                    <span className="text-gray-400">[</span>
                                                </div>

                                                <div className="ml-4 space-y-0.5">
                                                    <div className="text-green-400">'assets',</div>
                                                    <div className="text-green-400">'server',</div>
                                                    <div className="text-green-400">'data',</div>
                                                    <div className="text-green-400">'ui'</div>
                                                </div>

                                                <div className="text-gray-400">];</div>

                                                {/* Empty line */}
                                                <div className="h-2" />

                                                {/* For loop */}
                                                <div>
                                                    <span className="text-purple-400">for</span>
                                                    <span className="text-gray-400"> (</span>
                                                    <span className="text-blue-400">const</span>
                                                    <span className="text-blue-300"> module </span>
                                                    <span className="text-purple-400">of</span>
                                                    <span className="text-blue-300"> modules</span>
                                                    <span className="text-gray-400">) {"{"}</span>
                                                </div>

                                                <div className="ml-4 space-y-1">
                                                    <div>
                                                        <span className="text-blue-400">await</span>
                                                        <span className="text-gray-400"> </span>
                                                        <span className="text-yellow-400">load</span>
                                                        <span className="text-gray-400">(</span>
                                                        <span className="text-blue-300">module</span>
                                                        <span className="text-gray-400">);</span>
                                                    </div>

                                                    {/* <div>
                                                        <span className="text-blue-300">progress</span>
                                                        <span className="text-gray-500"> += </span>
                                                        <span className="text-orange-400">25</span>
                                                        <span className="text-gray-600">;</span>
                                                    </div> */}
                                                </div>

                                                <div className="text-gray-400">{"}"}</div>

                                                {/* Empty line */}
                                                <div className="h-2" />

                                                {/* Validation */}
                                                <div className="text-gray-600">
                                                    // Validate and finalize
                                                </div>

                                                <div>
                                                    <span className="text-blue-400">await</span>
                                                    <span className="text-gray-400"> </span>
                                                    <span className="text-yellow-400">validate</span>
                                                    <span className="text-gray-400">();</span>
                                                </div>

                                                {/* <div>
                                                    <span className="text-blue-300">progress</span>
                                                    <span className="text-gray-500"> = </span>
                                                    <span className="text-orange-400">100</span>
                                                    <span className="text-gray-600">;</span>
                                                </div> */}

                                                {/* Empty line */}
                                                <div className="h-2" />

                                                {/* Return statement
                                                {progress === 100 && (
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                    >
                                                        <span className="text-purple-400">return</span>
                                                        <span className="text-gray-400"> {"{ "}</span>
                                                        <span className="text-blue-300">status</span>
                                                        <span className="text-gray-400">: </span>
                                                        <span className="text-green-400">'success'</span>
                                                        <span className="text-gray-400"> {"}"};</span>
                                                    </motion.div>
                                                )}*/}
                                            </div>

                                            {/* Catch block */}
                                            <div>
                                                <span className="text-gray-400">{"}"}</span>
                                                <span className="text-purple-400"> catch</span>
                                                <span className="text-gray-400"> (</span>
                                                <span className="text-blue-300">error</span>
                                                <span className="text-gray-400">) {"{"}</span>
                                            </div>

                                            <div className="ml-4">
                                                <span className="text-blue-300">console</span>
                                                <span className="text-gray-500">.</span>
                                                <span className="text-yellow-400">error</span>
                                                <span className="text-gray-400">(</span>
                                                <span className="text-blue-300">error</span>
                                                <span className="text-gray-400">);</span>
                                            </div>

                                            <div className="text-gray-400">{"}"}</div>
                                        </div>

                                        {/* Closing brace */}
                                        <div className="text-gray-400">{"}"}</div>

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

                            {/* Terminal Output Section */}
                            <div className="bg-black border-t-2 border-green-900">
                                {/* Terminal Header */}
                                <div className="bg-gray-900 border-b border-green-800 px-4 py-1.5 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Terminal className="w-3 h-3 text-green-500" />
                                        <span className="text-xs text-gray-500">Terminal Output</span>
                                    </div>
                                    <div className="text-xs text-gray-600">bash</div>
                                </div>

                                {/* Terminal Content */}
                                <div className="p-4 min-h-[180px] max-h-[180px] overflow-y-auto font-mono text-sm space-y-2">
                                    {/* Terminal prompt */}
                                    <div className="text-green-500">
                                        <span className="text-green-400">user@isberg</span>
                                        <span className="text-gray-500">:</span>
                                        <span className="text-blue-400">~</span>
                                        <span className="text-gray-500">$</span>
                                        <span className="text-gray-400 ml-2">node loading.js</span>
                                    </div>

                                    {/* Loading messages output */}
                                    {messages.map((msg, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-gray-400"
                                        >
                                            {msg}
                                        </motion.div>
                                    ))}

                                    {/* Current typing message */}
                                    {currentMessage && typingIndex < currentMessage.length && (
                                        <div className="text-gray-400 flex">
                                            {currentMessage.substring(0, typingIndex)}
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
                                        </div>
                                    )}

                                    {/* Loading bar visualization */}
                                    {progress > 20 && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="space-y-1 pt-2"
                                        >
                                            <div className="text-green-500">
                                                Progress: {progress}%
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-green-500">[</span>
                                                <div className="flex bg-gray-900 border border-gray-700 h-4 flex-1">
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
                                                <span className="text-green-500">]</span>
                                                <span className="text-green-500 text-xs min-w-[3rem]">
                          {progress}%
                        </span>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Success message */}
                                    {progress === 100 && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="pt-2"
                                        >
                                            <div className="text-green-500 flex items-center gap-2">
                                                <span className="glow-text">✓ success</span>
                                            </div>
                                            <div className="text-gray-500 mt-1 flex">
                                                <span className="text-green-400">user@isberg</span>
                                                <span className="text-gray-500">:</span>
                                                <span className="text-blue-400">~</span>
                                                <span className="text-gray-500">$</span>
                                                <motion.span
                                                    animate={{ opacity: [1, 0, 1] }}
                                                    transition={{
                                                        duration: 0.8,
                                                        repeat: Infinity,
                                                    }}
                                                    className="bg-green-400 text-black px-1 ml-1"
                                                >
                                                    _
                                                </motion.span>
                                            </div>
                                        </motion.div>
                                    )}
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