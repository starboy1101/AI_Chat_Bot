import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import HomePage from './components/HomePage'
import FloatingChatButton from './components/FloatingChatButton';
import ChatWindow from './components/ChatWindow';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="relative">
      <HomePage />

      {!isChatOpen && (
        <FloatingChatButton onClick={() => setIsChatOpen(true)} />
      )}

      <AnimatePresence>
        {isChatOpen && <ChatWindow onClose={() => setIsChatOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
