import { Mic } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_50%)]"></div>

      <div className="relative z-10">
        <header className="px-8 py-6 border-b border-blue-500/20">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">SwarAI</h1>
            </div>
            <nav className="flex gap-6 text-sm">
              <a href="#" className="text-blue-200 hover:text-white transition-colors">Home</a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">About</a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">Documentation</a>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-8 py-20">
          <div className="text-center space-y-8">
            <div className="inline-block">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/50 mb-6">
                <Mic className="w-12 h-12 text-white" />
              </div>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Your Audio Architecture
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Expert Assistant
              </span>
            </h2>

            <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
              Get instant answers about Windows Audio Architecture, WASAPI, Audio Processing Objects (APOs),
              and Digital Signal Processing concepts from our intelligent chatbot.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-8">
              <div className="px-6 py-3 rounded-lg bg-blue-500/10 border border-blue-500/30 backdrop-blur-sm">
                <p className="text-blue-300 font-medium">WASAPI</p>
              </div>
              <div className="px-6 py-3 rounded-lg bg-blue-500/10 border border-blue-500/30 backdrop-blur-sm">
                <p className="text-blue-300 font-medium">APOs</p>
              </div>
              <div className="px-6 py-3 rounded-lg bg-blue-500/10 border border-blue-500/30 backdrop-blur-sm">
                <p className="text-blue-300 font-medium">DSP</p>
              </div>
              <div className="px-6 py-3 rounded-lg bg-blue-500/10 border border-blue-500/30 backdrop-blur-sm">
                <p className="text-blue-300 font-medium">Audio Streaming</p>
              </div>
            </div>
          </div>

          <div className="mt-32 grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-slate-800/50 border border-blue-500/20 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Expert Knowledge</h3>
              <p className="text-blue-200">Deep understanding of Windows audio architecture and APIs</p>
            </div>

            <div className="p-6 rounded-xl bg-slate-800/50 border border-blue-500/20 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Instant Answers</h3>
              <p className="text-blue-200">Get quick, accurate responses to your technical questions</p>
            </div>

            <div className="p-6 rounded-xl bg-slate-800/50 border border-blue-500/20 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Always Available</h3>
              <p className="text-blue-200">24/7 assistance for your audio development needs</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
