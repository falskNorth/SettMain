import { motion } from "motion/react";
import { Terminal, ArrowLeft, User, Code, Award, Heart } from "lucide-react";

interface AboutPageProps {
  onBack: () => void;
}

export function AboutPage({ onBack }: AboutPageProps) {
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
              <h1 className="text-3xl text-green-500 glow-text">About Kit</h1>
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
            <span>Personal information and background</span>
            <span className="text-green-600"> **/</span>
          </div>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-950 border border-green-900 p-6"
          >
            <div className="flex items-center gap-2 mb-4 text-purple-400">
              <User className="w-5 h-5" />
              <h2 className="text-xl">Profile</h2>
            </div>
            
            <div className="space-y-4 text-sm">
              <div>
                <span className="text-gray-500">const</span>{" "}
                <span className="text-blue-300">name</span>{" "}
                <span className="text-gray-500">=</span>{" "}
                <span className="text-green-400">"Kit IsBerg"</span>
                <span className="text-gray-600">;</span>
              </div>
              
              <div>
                <span className="text-gray-500">const</span>{" "}
                <span className="text-blue-300">role</span>{" "}
                <span className="text-gray-500">=</span>{" "}
                <span className="text-green-400">"Full Stack Developer"</span>
                <span className="text-gray-600">;</span>
              </div>
              
              <div>
                <span className="text-gray-500">const</span>{" "}
                <span className="text-blue-300">location</span>{" "}
                <span className="text-gray-500">=</span>{" "}
                <span className="text-green-400">"San Francisco, CA"</span>
                <span className="text-gray-600">;</span>
              </div>

              <div className="pt-4 border-t border-green-900">
                <div className="text-gray-600 mb-2">// About me</div>
                <p className="text-gray-400">
                  Passionate developer with expertise in modern web technologies. 
                  I love building innovative solutions and pushing the boundaries 
                  of what's possible with code.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-950 border border-green-900 p-6"
          >
            <div className="flex items-center gap-2 mb-4 text-purple-400">
              <Code className="w-5 h-5" />
              <h2 className="text-xl">Skills</h2>
            </div>
            
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500">const</span>{" "}
                <span className="text-blue-300">frontend</span>{" "}
                <span className="text-gray-500">= [</span>
                <div className="ml-6 text-green-400">
                  <div>"React", "TypeScript", "Next.js",</div>
                  <div>"Tailwind CSS", "Motion"</div>
                </div>
                <span className="text-gray-500">];</span>
              </div>

              <div>
                <span className="text-gray-500">const</span>{" "}
                <span className="text-blue-300">backend</span>{" "}
                <span className="text-gray-500">= [</span>
                <div className="ml-6 text-green-400">
                  <div>"Node.js", "Python", "PostgreSQL",</div>
                  <div>"MongoDB", "REST APIs"</div>
                </div>
                <span className="text-gray-500">];</span>
              </div>

              <div>
                <span className="text-gray-500">const</span>{" "}
                <span className="text-blue-300">tools</span>{" "}
                <span className="text-gray-500">= [</span>
                <div className="ml-6 text-green-400">
                  <div>"Git", "Docker", "AWS",</div>
                  <div>"Figma", "VS Code"</div>
                </div>
                <span className="text-gray-500">];</span>
              </div>
            </div>
          </motion.div>

          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-950 border border-green-900 p-6"
          >
            <div className="flex items-center gap-2 mb-4 text-purple-400">
              <Award className="w-5 h-5" />
              <h2 className="text-xl">Experience</h2>
            </div>
            
            <div className="space-y-4 text-sm">
              <div>
                <div className="text-yellow-400 mb-1">Senior Developer</div>
                <div className="text-gray-500">Tech Company Inc. | 2021 - Present</div>
                <div className="text-gray-600 mt-2">
                  // Led development of core platform features
                </div>
              </div>

              <div className="border-t border-green-900 pt-4">
                <div className="text-yellow-400 mb-1">Full Stack Developer</div>
                <div className="text-gray-500">StartUp XYZ | 2019 - 2021</div>
                <div className="text-gray-600 mt-2">
                  // Built scalable web applications
                </div>
              </div>

              <div className="border-t border-green-900 pt-4">
                <div className="text-yellow-400 mb-1">Junior Developer</div>
                <div className="text-gray-500">Digital Agency | 2017 - 2019</div>
                <div className="text-gray-600 mt-2">
                  // Developed client websites and applications
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interests Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-950 border border-green-900 p-6"
          >
            <div className="flex items-center gap-2 mb-4 text-purple-400">
              <Heart className="w-5 h-5" />
              <h2 className="text-xl">Interests</h2>
            </div>
            
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-600">// What drives me</span>
              </div>
              
              <div className="space-y-2 text-gray-400">
                <div className="flex items-start gap-2">
                  <span className="text-green-500">→</span>
                  <span>Open source contributions</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">→</span>
                  <span>Game development & design</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">→</span>
                  <span>AI & machine learning</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">→</span>
                  <span>Competitive gaming (LoL, Valorant)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">→</span>
                  <span>Teaching & mentoring</span>
                </div>
              </div>

              <div className="pt-4 border-t border-green-900">
                <div className="text-yellow-400">
                  <span className="text-purple-400">console</span>.log(
                  <span className="text-green-400">"Always learning, always building!"</span>
                  );
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .glow-text {
          text-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
        }
      `}</style>
    </div>
  );
}
