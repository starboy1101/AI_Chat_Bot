import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface FloatingChatButtonProps {
  onClick: () => void;
}

const FloatingChatButton = ({ onClick }: FloatingChatButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.button
        onClick={onClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/50 flex items-center justify-center group"
      >
        <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full border-2 border-blue-300 opacity-30"
        ></motion.div>

        <MessageCircle className="w-7 h-7 text-white relative z-10" />
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10,
          scale: isHovered ? 1 : 0.8
        }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-20 right-0 whitespace-nowrap pointer-events-none"
      >
        <div className="bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg border border-blue-500/30">
          <p className="text-sm font-medium">Ask Audio Bot</p>
        </div>
        <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-slate-800 border-r border-b border-blue-500/30 transform rotate-45"></div>
      </motion.div>
    </div>
  );
};

export default FloatingChatButton;
