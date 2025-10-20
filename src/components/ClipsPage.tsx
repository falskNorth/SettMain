import { motion } from "motion/react";
import { Terminal, ArrowLeft, Play, ExternalLink } from "lucide-react";

interface ClipsPageProps {
  onBack: () => void;
}

const clips = [
  {
    id: 1,
    title: "Full Stack Development Tutorial",
    duration: "15:30",
    views: "10.5K",
    date: "2024-01-15",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80",
    description: "Building a complete MERN stack application",
  },
  {
    id: 2,
    title: "React Performance Optimization",
    duration: "12:45",
    views: "8.2K",
    date: "2024-01-10",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80",
    description: "Tips and tricks for faster React apps",
  },
  {
    id: 3,
    title: "TypeScript Advanced Patterns",
    duration: "18:20",
    views: "12.1K",
    date: "2024-01-05",
    thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&q=80",
    description: "Deep dive into TypeScript generics",
  },
  {
    id: 4,
    title: "Building Real-time Chat App",
    duration: "25:15",
    views: "15.3K",
    date: "2023-12-28",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80",
    description: "WebSocket implementation with Node.js",
  },
];

export function ClipsPage({ onBack }: ClipsPageProps) {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 border-b border-green-900 pb-4"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Terminal className="w-6 h-6 text-green-500" />
              <h1 className="text-3xl text-green-500 glow-text">Clips</h1>
            </div>
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-500 hover:text-green-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Menu</span>
            </button>
          </div>
          <div className="text-sm text-gray-500">
            <span className="text-green-600">/** </span>
            <span>Video demonstrations and highlights</span>
            <span className="text-green-600"> **/</span>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 grid grid-cols-3 gap-4"
        >
          <div className="bg-gray-950 border border-green-900 p-4">
            <div className="text-2xl text-green-400 mb-1">{clips.length}</div>
            <div className="text-xs text-gray-500">Total Clips</div>
          </div>
          <div className="bg-gray-950 border border-green-900 p-4">
            <div className="text-2xl text-green-400 mb-1">46.1K</div>
            <div className="text-xs text-gray-500">Total Views</div>
          </div>
          <div className="bg-gray-950 border border-green-900 p-4">
            <div className="text-2xl text-green-400 mb-1">1.2K</div>
            <div className="text-xs text-gray-500">Subscribers</div>
          </div>
        </motion.div>

        {/* Clips Grid */}
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            <span className="text-gray-500">const</span>{" "}
            <span className="text-blue-300">clips</span>{" "}
            <span className="text-gray-500">= [</span>
          </div>

          {clips.map((clip, index) => (
            <motion.div
              key={clip.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="ml-6 bg-gray-950 border border-green-900 hover:border-green-700 transition-colors group"
            >
              <div className="flex flex-col md:flex-row gap-4 p-4">
                {/* Thumbnail */}
                <div className="relative w-full md:w-64 aspect-video bg-gray-900 flex-shrink-0 overflow-hidden">
                  <img
                    src={clip.thumbnail}
                    alt={clip.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-green-500/80 group-hover:bg-green-400 rounded-full flex items-center justify-center transition-colors">
                      <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-xs">
                    {clip.duration}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between text-sm">
                  <div>
                    <div className="mb-2">
                      <span className="text-gray-600">{"{"}</span>
                    </div>
                    <div className="ml-4 space-y-1">
                      <div>
                        <span className="text-blue-300">title</span>
                        <span className="text-gray-500">:</span>{" "}
                        <span className="text-green-400">"{clip.title}"</span>
                        <span className="text-gray-600">,</span>
                      </div>
                      <div>
                        <span className="text-blue-300">description</span>
                        <span className="text-gray-500">:</span>{" "}
                        <span className="text-gray-400">"{clip.description}"</span>
                        <span className="text-gray-600">,</span>
                      </div>
                      <div className="flex gap-4">
                        <div>
                          <span className="text-blue-300">views</span>
                          <span className="text-gray-500">:</span>{" "}
                          <span className="text-yellow-400">{clip.views}</span>
                          <span className="text-gray-600">,</span>
                        </div>
                        <div>
                          <span className="text-blue-300">date</span>
                          <span className="text-gray-500">:</span>{" "}
                          <span className="text-gray-400">"{clip.date}"</span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-600">{"}"}</span>
                      {index < clips.length - 1 && <span className="text-gray-600">,</span>}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-2">
                    <button className="bg-green-900/20 hover:bg-green-900/40 border border-green-700 px-3 py-1.5 text-xs transition-colors flex items-center gap-2">
                      <Play className="w-3 h-3" />
                      <span>Watch</span>
                    </button>
                    <button className="bg-gray-900 hover:bg-gray-800 border border-gray-700 px-3 py-1.5 text-xs transition-colors flex items-center gap-2 text-gray-400">
                      <ExternalLink className="w-3 h-3" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <div className="text-sm text-gray-600">
            <span className="text-gray-500">];</span>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-gray-950 border border-green-900 p-4 text-center text-sm"
        >
          <div className="text-gray-600 mb-2">// More content coming soon</div>
          <div className="text-gray-500">
            <span className="text-purple-400">subscribe</span>
            <span className="text-gray-400">(</span>
            <span className="text-green-400">"IsBerg.gg"</span>
            <span className="text-gray-400">);</span>
          </div>
        </motion.div>
      </div>

      <style>{`
        .glow-text {
          text-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
        }
      `}</style>
    </div>
  );
}
