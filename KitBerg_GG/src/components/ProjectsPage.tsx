import { motion } from "motion/react";
import { Terminal, ArrowLeft, ExternalLink, Github } from "lucide-react";


interface ProjectsPageProps {
  onBack: () => void;
}

const projects = [
  {
    id: 1,
    name: "AI Edmunds (+ Enoch)",
    tech: ["C#", "Java","Unity Engine", ],
    description: "AI_Edmund A collection of my AI's all conveniently called Edmund (+Enoch)",
    // stars: 0,
    status: "Production",
    link: "https://github.com/falskNorth/AI_Edmund",
     demo: "https://github.com/falskNorth/AI_Edmund",
  },
  {
    id: 2,
    name: "GitPages to host the web version of my player vs AI Tetris remake (Edmund III)",
    tech: ["HTML", "CSS", "Unity Engine",],
    description: "A repo for the website that'll host my Tetris remake that you can play vs my AI called",
    // stars: 0,
    status: "Complete",
    link: "https://github.com/falskNorth/EdmundTetris",
    demo:"https://falsknorth.github.io/EdmundTetris/",
  },
  {
    id: 3,
    name: "Silly Scripts",
    tech: ["HTML", "Python", ],
    description: "A repo for random small programs I've Made",
    // stars: 0,
    status: "Production",
    link: "https://github.com/falskNorth/SillyScripts",
     demo: "https://github.com/falskNorth/SillyScript",
  },
  {
    id: 4,
    name: "Coterie Denim",
    tech: ["HTML", "CSS",],
    description: "A simple Static Website made for a friend to help her get the edge in her fashion University assignment",
      // stars: 0,
    status: "Complete",
    link: "https://github.com/falskNorth/KatieUni",
    demo: "https://falsknorth.github.io/KatieUni/",
  },
];

export function ProjectsPage({ onBack }: ProjectsPageProps) {
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
              <h1 className="text-3xl text-green-500 glow-text">Projects</h1>
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
            <span>Portfolio and completed work</span>
            <span className="text-green-600"> **/</span>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-gray-950 border border-green-900 p-4">
            <div className="text-2xl text-green-400 mb-1">{projects.length}</div>
            <div className="text-xs text-gray-500">Total Projects</div>
          </div>
          <div className="bg-gray-950 border border-green-900 p-4">
            <div className="text-2xl text-green-400 mb-1">2</div>
            <div className="text-xs text-gray-500">In Production</div>
          </div>
          <div className="bg-gray-950 border border-green-900 p-4">
            <div className="text-2xl text-green-400 mb-1"> (╥﹏╥)</div>
            <div className="text-xs text-gray-500">Program Crashes </div>
          </div>
          <div className="bg-gray-950 border border-green-900 p-4">
            <div className="text-2xl text-green-400 mb-1">∞</div>
            <div className="text-xs text-gray-500">Ideas</div>
          </div>
        </motion.div>

        {/* Projects List */}
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            <span className="text-gray-500">const</span>{" "}
            <span className="text-blue-300">projects</span>{" "}
            <span className="text-gray-500">= [</span>
          </div>

          <div className="ml-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-gray-950 border border-green-900 hover:border-green-700 transition-colors p-5 group"
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg text-green-400 group-hover:text-green-300 transition-colors mb-1">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-3 text-xs">
                      {/*<div className="flex items-center gap-1 text-yellow-400">*/}
                      {/*  <Star className="w-3 h-3" fill="currentColor" />*/}
                      {/*  <span>{project.stars}</span>*/}
                      {/*</div>*/}
                      <div className={`px-2 py-0.5 rounded ${
                        project.status === "Production" 
                          ? "bg-green-900/30 text-green-400" 
                          : "bg-blue-900/30 text-blue-400"
                      }`}>
                        {project.status}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 mb-4">
                  <span className="text-gray-600">// </span>
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-4">
                  <div className="text-xs text-gray-600 mb-1">
                    <span className="text-blue-300">tech</span>
                    <span className="text-gray-500">: [</span>
                  </div>
                  <div className="flex flex-wrap gap-2 ml-4">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-900 border border-gray-700 px-2 py-1 text-gray-400"
                      >
                        "{tech}"
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500">]</div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-green-900">
                  <button className="flex-1 bg-green-900/20 hover:bg-green-900/40 border border-green-700 px-3 py-2 text-xs transition-colors flex items-center justify-center gap-2">
                    <Github className="w-3 h-3" />
                      <a href={project.link} target="_blank">View Code</a>
                  </button>
                  <button className="flex-1 bg-gray-900 hover:bg-gray-800 border border-gray-700 px-3 py-2 text-xs transition-colors flex items-center justify-center gap-2 text-gray-400">
                    <ExternalLink className="w-3 h-3" />
                      <a href={project.demo} target="_blank">Live Demo</a>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-sm text-gray-600">
            <span className="text-gray-500">];</span>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 bg-gray-950 border border-green-900 p-6 text-center"
        >
          <div className="text-sm space-y-2">
            <div className="text-gray-600">
              // Check out my GitHub for more projects
            </div>
            <div className="text-gray-500">
              <span className="text-purple-400">window</span>
              <span className="text-gray-400">.</span>
              <span className="text-yellow-400">open</span>
              <span className="text-gray-400">(</span>
              <span className="text-green-400">"https://github.com/falskNorth"</span>
              <span className="text-gray-400">);</span>
            </div>
            <button className="mt-4 bg-green-900/20 hover:bg-green-900/40 border border-green-700 px-6 py-2 text-sm transition-colors inline-flex items-center gap-2">
              <Github className="w-4 h-4" />
              <a href="https://github.com/falskNorth" target="_blank">Visit GitHub Profile</a>
            </button>
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
