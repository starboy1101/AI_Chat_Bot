import { motion } from "framer-motion";
import { X, Send, Mic, MicOff } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow = ({ onClose }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [options, setOptions] = useState<any[]>([]); // 🆕 store current options

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning!";
    if (hour < 17) return "Good afternoon!";
    return "Good evening!";
  };

  // 🧠 Load chat history or welcome message
  useEffect(() => {
    const savedMessages = sessionStorage.getItem("chatHistory");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      const welcomeMessage: Message = {
        sender: "bot",
        text: `👋 Hello! ${getGreeting()}\n\nI'm SwarAI. How can I assist you today ?`,
      };
      setMessages([welcomeMessage]);
      sessionStorage.setItem("chatHistory", JSON.stringify([welcomeMessage]));
    }

    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition ||
        (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsRecording(false);
      };

      recognitionInstance.onerror = () => setIsRecording(false);
      recognitionInstance.onend = () => setIsRecording(false);
      setRecognition(recognitionInstance);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem("chatHistory", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    const handleUnload = () => {
      sessionStorage.removeItem("chatHistory");
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, options]); // 🆕 scroll when options change

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatWindowRef.current &&
        !chatWindowRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // 📨 Send message or option
  const handleSend = async (customInput?: string) => {
    const messageToSend = customInput || input;
    if (!messageToSend.trim()) return;

    const userMessage: Message = { sender: "user", text: messageToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setOptions([]); // 🆕 clear options once user responds

    try {
      const res = await axios.post("https://Starboy18-chat-bot.hf.space/chat", {
        message: messageToSend,
        user_id: "web_user_1",
      });

      const { reply, options: backendOptions } = res.data;

      const botMessage: Message = { sender: "bot", text: reply };
      setMessages((prev) => [...prev, botMessage]);

      // 🆕 show option buttons if available
      if (backendOptions && backendOptions.length > 0) {
        setOptions(backendOptions);
      } else {
        setOptions([]);
      }
    } catch (error) {
      const errorMessage: Message = {
        sender: "bot",
        text: "⚠️ Sorry, I encountered an error. Please ensure the backend server is running.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    if (!recognition) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);
    }
  };

  return (
    <motion.div
      ref={chatWindowRef}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-[calc(100vw-2rem)] sm:w-96 h-[calc(100vh-2rem)] max-h-[600px] bg-slate-900 rounded-2xl shadow-2xl border border-blue-500/30 flex flex-col z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-xl">🎙️</span>
          </div>
          <div>
            <h3 className="text-white font-semibold">SwarAI</h3>
            <p className="text-blue-100 text-xs">Online</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                message.sender === "user"
                  ? "bg-gradient-to-br from-blue-500 to-cyan-400 text-white rounded-br-md"
                  : "bg-slate-800 text-blue-100 rounded-bl-md border border-blue-500/20"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap break-words">
                {message.text}
              </p>
            </div>
          </motion.div>
        ))}

        {/* 🆕 Option Buttons */}
        {options.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSend(opt.label)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded-lg transition-colors"
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-slate-800 text-blue-100 px-4 py-3 rounded-2xl rounded-bl-md border border-blue-500/20">
              <div className="flex gap-1">
                {[0, 0.2, 0.4].map((delay, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay }}
                    className="w-2 h-2 bg-blue-400 rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-900 border-t border-blue-500/20">
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3 flex items-center justify-center gap-2 text-blue-400 text-sm"
          >
            <div className="flex gap-1">
              {[0, 0.1, 0.2, 0.3].map((delay, i) => (
                <motion.div
                  key={i}
                  animate={{ scaleY: [1, 1.5, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay }}
                  className="w-1 h-4 bg-blue-500 rounded-full"
                />
              ))}
            </div>
            <span>Listening...</span>
          </motion.div>
        )}

        <div className="flex gap-2">
          <button
            onClick={toggleRecording}
            className={`p-3 rounded-xl transition-colors ${
              isRecording
                ? "bg-red-500 hover:bg-red-600"
                : "bg-slate-800 hover:bg-slate-700 border border-blue-500/30"
            }`}
          >
            {isRecording ? (
              <MicOff className="w-5 h-5 text-white" />
            ) : (
              <Mic className="w-5 h-5 text-blue-400" />
            )}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question..."
            className="flex-1 px-4 py-3 bg-slate-800 border border-blue-500/30 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />

          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="p-3 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl hover:from-blue-600 hover:to-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatWindow;
