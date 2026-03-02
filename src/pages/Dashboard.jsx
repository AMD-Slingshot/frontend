import { useNavigate } from "react-router-dom";
import { Paintbrush, Mic2, Code, FileText, Zap, Users, ShieldCheck } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const tools = [
    {
      title: "Poster Generator",
      desc: "Create event posters & marketing schemes in seconds.",
      icon: <Paintbrush className="w-8 h-8" />,
      path: "/poster",
      color: "bg-purple-600",
      shadow: "shadow-purple-500/20",
      active: true,
    },
    {
      title: "Audio Assistant",
      desc: "Generate event announcements or podcast snippets.",
      icon: <Mic2 className="w-8 h-8" />,
      path: "/audio",
      color: "bg-blue-600",
      shadow: "shadow-blue-500/20",
      active: true,
    },
    {
      title: "AI Copywriter",
      desc: "Draft captions, business pitches, and invitations.",
      icon: <FileText className="w-8 h-8" />,
      path: "/text",
      color: "bg-gray-400",
      active: false,
    },
    {
      title: "App Builder",
      desc: "Low-code utilities for campus clubs.",
      icon: <Code className="w-8 h-8" />,
      path: "/code",
      color: "bg-gray-400",
      active: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex">
      {/* Sidebar - Visual Polish */}
      <aside className="w-64 border-r border-slate-800 p-6 hidden md:flex flex-col">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-linear-to-tr from-purple-500 to-blue-500 rounded-lg shadow-lg"></div>
          <span className="text-xl font-bold tracking-tight text-white">Campus AI</span>
        </div>
        <nav className="space-y-4 flex-1">
          <div className="flex items-center gap-3 text-purple-400 bg-purple-400/10 p-2 rounded-lg cursor-pointer">
            <Zap size={20} /> <span className="font-medium">Studio</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400 hover:text-white p-2 transition-colors cursor-pointer">
            <Users size={20} /> <span>Collaboration</span>
          </div>
        </nav>
        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 text-xs text-green-400 mb-2">
            <ShieldCheck size={14} /> Responsible AI Active
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">Bias filters & attribution tools enabled.</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-white mb-2">Welcome, Creator</h1>
          <p className="text-slate-400 max-w-2xl">
            Lowering the barrier to campus innovation. Draft, design, and publish your ideas—all in one place.
          </p>
        </header>

        {/* Multimodal Tool Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl">
          {tools.map((tool, idx) => (
            <button
              key={idx}
              disabled={!tool.active}
              onClick={() => navigate(tool.path)}
              className={`group relative text-left p-8 rounded-2xl border transition-all duration-300 ${
                tool.active 
                ? `bg-slate-800/40 border-slate-700 hover:border-slate-500 hover:-translate-y-1 ${tool.shadow} shadow-xl` 
                : "bg-slate-900/50 border-slate-800 opacity-60 cursor-not-allowed"
              }`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${tool.color} text-white`}>
                {tool.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                {tool.title}
                {!tool.active && <span className="text-[10px] uppercase tracking-widest bg-slate-700 px-2 py-0.5 rounded">Soon</span>}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {tool.desc}
              </p>
              {tool.active && (
                <div className="mt-6 flex items-center text-xs font-bold text-purple-400 uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                  Launch Studio →
                </div>
              )}
            </button>
          ))}
        </div>
        
        {/* Collaboration Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-800 flex justify-between items-center text-slate-500 text-sm">
          <p>© 2026 Campus AI • Multimodal Creativity Suite</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Guidelines</span>
          </div>
        </footer>
      </main>
    </div>
  );
}