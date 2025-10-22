import { motion } from "motion/react";
import { Terminal, ArrowLeft, Mail, FileText, Download, Linkedin, Github } from "lucide-react";

interface RecruitersPageProps {
  onBack: () => void;
}

export function RecruitersPage({ onBack }: RecruitersPageProps) {
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
              <h1 className="text-3xl text-green-500 glow-text">Recruiters</h1>
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
            <span>Professional information and contact details</span>
            <span className="text-green-600"> **/</span>
          </div>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-950 border border-green-900 p-6"
          >
            <div className="flex items-center gap-2 mb-4 text-purple-400">
              <Mail className="w-5 h-5" />
              <h2 className="text-xl">Contact</h2>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <span className="text-gray-500">const</span>{" "}
                <span className="text-blue-300">contact</span>{" "}
                <span className="text-gray-500">= {"{"}</span>
                <div className="ml-6 space-y-1">
                  <div>
                    <span className="text-blue-300">email</span>
                    <span className="text-gray-500">:</span>{" "}
                    <span className="text-green-400">"kitberg17@gmail.com"</span>
                    <span className="text-gray-600">,</span>
                  </div>
                  <div>
                    <span className="text-blue-300">location</span>
                    <span className="text-gray-500">:</span>{" "}
                    <span className="text-green-400">"Northapton, UK"</span>
                    <span className="text-gray-600">,</span>
                  </div>
                  <div>
                    <span className="text-blue-300">availability</span>
                    <span className="text-gray-500">:</span>{" "}
                    <span className="text-green-400">"Open to opportunities"</span>
                  </div>
                </div>
                <span className="text-gray-500">{"}"};</span>
              </div>

              <div className="pt-4 border-t border-green-900">
                <div className="text-gray-600 mb-3">// Quick actions</div>
                <div className="space-y-2">
                  <button className="w-full bg-green-900/20 hover:bg-green-900/40 border border-green-700 px-4 py-2 text-left transition-colors flex items-center gap-2">

                    <Mail className="w-4 h-4" />
                    <a href="mailto:kitberg17@gmail.com">Send Email</a>
                  </button>
                  <button className="w-full bg-green-900/20 hover:bg-green-900/40 border border-green-700 px-4 py-2 text-left transition-colors flex items-center gap-2">
                      <Download className="w-4 h-4" />
                    <a href="src/Documents/" download="KaitlanCV2025.pdf">Download Resume (PDF)</a>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-950 border border-green-900 p-6"
          >
            <div className="flex items-center gap-2 mb-4 text-purple-400">
              <FileText className="w-5 h-5" />
              <h2 className="text-xl">Links</h2>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <span className="text-gray-500">const</span>{" "}
                <span className="text-blue-300">socialLinks</span>{" "}
                <span className="text-gray-500">= {"{"}</span>
                <div className="ml-6 space-y-1">
                  <div>
                    <span className="text-blue-300">linkedin</span>
                    <span className="text-gray-500">:</span>{" "}
                    <span className="text-green-400">"linkedin.com/in/kaitlan-berg"</span>
                    <span className="text-gray-600">,</span>
                  </div>
                  <div>
                    <span className="text-blue-300">github</span>
                    <span className="text-gray-500">:</span>{" "}
                    <span className="text-green-400">"github.com/falskNorth"</span>
                    <span className="text-gray-600">,</span>
                  </div>
                  <div>
                    <span className="text-blue-300">portfolio</span>
                    <span className="text-gray-500">:</span>{" "}
                    <span className="text-green-400">"CHANGE THIS TO MAIN URL"</span>
                  </div>
                </div>
                <span className="text-gray-500">{"}"};</span>
              </div>

              <div className="pt-4 border-t border-green-900 space-y-2">
                <a
                  href="https://www.linkedin.com/in/kaitlan-berg-14517b203/"
                  target="_blank"
                  className="w-full bg-blue-900/20 hover:bg-blue-900/40 border border-blue-700 px-4 py-2 text-left transition-colors flex items-center gap-2 text-blue-400"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>View LinkedIn Profile</span>
                </a>
                <a
                  href="https://github.com/falskNorth"
                  target="_blank"
                  className="w-full bg-purple-900/20 hover:bg-purple-900/40 border border-purple-700 px-4 py-2 text-left transition-colors flex items-center gap-2 text-purple-400"
                >
                  <Github className="w-4 h-4" />
                  <span>View GitHub Profile</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Professional Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-950 border border-green-900 p-6 lg:col-span-2"
          >
            <div className="flex items-center gap-2 mb-4 text-purple-400">
              <FileText className="w-5 h-5" />
              <h2 className="text-xl">Professional Summary</h2>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <span className="text-gray-600">// Executive summary for recruiters</span>
              </div>

              <div className="text-gray-400 space-y-3">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras congue turpis metus,
                    vitae faucibus urna dictum id. Suspendisse in turpis ex. Mauris feugiat nisl eget
                    condimentum posuere. Ut tempus vitae eros quis vestibulum. Etiam et euismod ligula.
                </p>

                <p>
                  <span className="text-green-400">Key Achievements:</span>
                </p>
                <ul className="ml-6 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">→</span>
                    <span>Maecenas aliquam, lorem id luctus euismod</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">→</span>
                    <span>Nam quis facilisis ex, in tincidunt elit. Nullam tincidunt elementum velit feugiat sollicitudin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">→</span>
                    <span>Mauris euismod sapien vitae diam gravida, ac sollicitudin nisi convallis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">→</span>
                    <span>Quisque pellentesque elit sit amet nunc tincidunt</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-green-900">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-900 border border-green-800 p-3">
                    <div className="text-2xl text-green-400">1+</div>
                    <div className="text-xs text-gray-500">Years Experience</div>
                  </div>
                  <div className="bg-gray-900 border border-green-800 p-3">
                    <div className="text-2xl text-green-400">20+</div>
                    <div className="text-xs text-gray-500">Projects Completed</div>
                  </div>
                  <div className="bg-gray-900 border border-green-800 p-3">
                    <div className="text-2xl text-green-400">10+</div>
                    <div className="text-xs text-gray-500">Computer Languages</div>
                  </div>
                  <div className="bg-gray-900 border border-green-800 p-3">
                    <div className="text-2xl text-green-400">100%</div>
                    <div className="text-xs text-gray-500">Commitment</div>
                  </div>
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
