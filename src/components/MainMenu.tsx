import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, Terminal } from "lucide-react";

interface MainMenuProps {
  onNavigate: (page: string) => void;
}

const menuItems = [
  {
    id: "about",
    label: "About Kit",
    command: "load_about()",
    description: "// Personal journey, skills, and background",
  },
  {
    id: "recruiters",
    label: "Recruiters",
    command: "load_recruiters()",
    description: "// Professional information and contact",
  },
  {
    id: "clips",
    label: "Clips",
    command: "load_clips()",
    description: "// heart-pounding moments of skill, strategy, and sheer luck",
  },
  {
    id: "projects",
    label: "Projects",
    command: "load_projects()",
    description: "// Complete and in progress work",
  },
];

export function MainMenu({ onNavigate }: MainMenuProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [selectedLine, setSelectedLine] = useState(0);

  const handleSelect = (id: string, index: number) => {
    setSelectedLine(index);
    setTimeout(() => {
      onNavigate(id);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-8 flex items-center justify-center">
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
            <span>Main Menu - Select an option to continue</span>
            <span className="text-green-600"> **/</span>
          </div>
        </motion.div>

        {/* Code block */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-950 border border-green-900 shadow-lg"
        >
          {/* Window title bar */}
          <div className="bg-gray-900 border-b border-green-900 px-4 py-2 flex items-center justify-between">
            <span className="text-xs text-gray-500">main_menu.js</span>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-700" />
              <div className="w-3 h-3 rounded-full bg-gray-700" />
              <div className="w-3 h-3 rounded-full bg-gray-700" />
            </div>
          </div>

          {/* Code content */}
          <div className="p-6 text-sm space-y-1">
            {/* Line numbers and code */}
            <div className="flex gap-4">
              <div className="text-gray-700 select-none text-right space-y-1">
                {[...Array(15)].map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              <div className="flex-1 space-y-1">
                {/* Function declaration */}
                <div className="text-purple-400">
                  <span className="text-blue-400">function</span> <span className="text-yellow-400">initializeMenu</span>
                  <span className="text-gray-400">() {"{"}</span>
                </div>
                
                {/* Comment */}
                <div className="text-gray-600 ml-4">
                  // Available navigation options
                </div>

                {/* Menu items */}
                {menuItems.map((item, index) => {
                  const isHovered = hoveredItem === item.id;
                  const lineNumber = index + 3;
                  
                  return (
                    <motion.button
                      key={item.id}
                      onHoverStart={() => setHoveredItem(item.id)}
                      onHoverEnd={() => setHoveredItem(null)}
                      onClick={() => handleSelect(item.id, lineNumber)}
                      className="w-full text-left group relative"
                    >
                      <div className="ml-4 relative">
                        {/* Hover background */}
                        <motion.div
                          className="absolute inset-0 -mx-2 bg-green-900/20"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isHovered ? 1 : 0 }}
                          transition={{ duration: 0.2 }}
                        />

                        {/* Executing indicator */}
                        {selectedLine === lineNumber && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.8, repeat: 2 }}
                            className="absolute -left-6 top-0 text-yellow-400"
                          >
                            →
                          </motion.div>
                        )}

                        <div className="relative z-10">
                          {/* Code line */}
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">const</span>
                            <span className="text-blue-300">{item.id}</span>
                            <span className="text-gray-500">=</span>
                            <span className="text-green-400 group-hover:text-green-300">
                              "{item.label}"
                            </span>
                            <span className="text-gray-600">;</span>
                            <ChevronRight 
                              className={`w-4 h-4 transition-all ${
                                isHovered 
                                  ? "text-green-400 opacity-100 translate-x-1" 
                                  : "text-gray-700 opacity-0"
                              }`}
                            />
                          </div>
                          
                          {/* Description comment */}
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ 
                              height: isHovered ? "auto" : 0,
                              opacity: isHovered ? 1 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden text-gray-600 text-xs"
                          >
                            {item.description}
                          </motion.div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}

                {/* Empty line */}
                <div className="h-4" />

                {/* Return statement */}
                <div className="ml-4">
                  <span className="text-purple-400">return</span>
                  <span className="text-gray-400"> menu;</span>
                </div>

                {/* Closing brace */}
                <div className="text-gray-400">{"}"}</div>

                {/* Empty line */}
                <div className="h-2" />

                {/* Execute */}
                <div className="text-gray-600">
                  <span className="text-gray-500">//</span> Execute
                </div>
                <div>
                  <span className="text-yellow-400">initializeMenu</span>
                  <span className="text-gray-400">();</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status bar */}
          <div className="bg-gray-900 border-t border-green-900 px-4 py-2 flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <span className="text-green-500">● Ready</span>
              <span className="text-gray-600">JavaScript</span>
            </div>
            <div className="text-gray-600">
              Ln {selectedLine || 1}, Col 1
            </div>
          </div>
        </motion.div>

        {/* Footer instruction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <motion.p
            className="text-gray-700 text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            → Click to execute function
          </motion.p>
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
