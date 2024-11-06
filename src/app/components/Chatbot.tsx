'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, User, Bot, Paperclip, Smile, Moon, Sun } from 'lucide-react'

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

type QuickReply = {
  text: string;
  action: () => void;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([])
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const minimizeChat = () => setIsMinimized(true)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      const newMessage: Message = { id: Date.now(), text: input, sender: 'user', timestamp: new Date() }
      setMessages(prev => [...prev, newMessage])
      setInput('')
      handleBotResponse(input)
    }
  }

  const handleBotResponse = (userInput: string) => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const botResponse = generateBotResponse(userInput)
      setMessages(prev => [...prev, { id: Date.now(), text: botResponse.message, sender: 'bot', timestamp: new Date() }])
      setQuickReplies(botResponse.quickReplies)
    }, 1500)
  }

  const generateBotResponse = (userInput: string): { message: string; quickReplies: QuickReply[] } => {
    const lowerInput = userInput.toLowerCase()
    if (lowerInput.includes('orçamento') || lowerInput.includes('preço')) {
      return {
        message: "Para fornecer um orçamento preciso, precisamos de mais informações sobre o seu veículo e o serviço desejado. Que tal agendar uma avaliação gratuita?",
        quickReplies: [
          { text: "Agendar Avaliação", action: () => handleQuickReply("Gostaria de agendar uma avaliação gratuita.") },
          { text: "Mais Informações", action: () => handleQuickReply("Preciso de mais informações sobre os serviços.") }
        ]
      }
    } else if (lowerInput.includes('horário') || lowerInput.includes('funcionamento')) {
      return {
        message: "Nosso horário de funcionamento é de segunda a sexta, das 8h às 18h, e aos sábados das 9h às 14h. Aos domingos, estamos fechados. Em qual horário você prefere ser atendido?",
        quickReplies: [
          { text: "Manhã", action: () => handleQuickReply("Prefiro atendimento pela manhã.") },
          { text: "Tarde", action: () => handleQuickReply("Prefiro atendimento à tarde.") }
        ]
      }
    } else if (lowerInput.includes('serviço') || lowerInput.includes('reparo')) {
      return {
        message: "A FIXMYCAR oferece uma ampla gama de serviços, incluindo manutenção preventiva, reparos mecânicos, elétricos, e muito mais. Qual serviço específico você está procurando?",
        quickReplies: [
          { text: "Manutenção", action: () => handleQuickReply("Estou interessado em serviços de manutenção.") },
          { text: "Reparo", action: () => handleQuickReply("Preciso de um reparo específico.") }
        ]
      }
    } else {
      return {
        message: "Obrigado por entrar em contato com a FIXMYCAR! Como posso ajudar você hoje? Se preferir, posso conectá-lo a um de nossos especialistas para um atendimento mais personalizado.",
        quickReplies: [
          { text: "Falar com Especialista", action: () => handleQuickReply("Gostaria de falar com um especialista.") },
          { text: "Ver Serviços", action: () => handleQuickReply("Quero ver a lista de serviços disponíveis.") }
        ]
      }
    }
  }

  const handleQuickReply = (replyText: string) => {
    setMessages(prev => [...prev, { id: Date.now(), text: replyText, sender: 'user', timestamp: new Date() }])
    handleBotResponse(replyText)
  }

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`rounded-lg shadow-lg w-96 overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
          >
            <div className={`p-4 flex justify-between items-center ${isDarkMode ? 'bg-gray-800' : 'bg-blue-600'}`}>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Bot size={24} className="text-white" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">FIXMYCAR Assistant</h3>
                  <p className="text-xs text-gray-300">Online</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-full p-1"
                  aria-label={isDarkMode ? "Ativar modo claro" : "Ativar modo escuro"}
                >
                  {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  onClick={minimizeChat}
                  className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-full p-1"
                  aria-label="Minimizar chat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 14h16M4 14l4-4M4 14l4 4" />
                  </svg>
                </button>
                <button
                  onClick={toggleChat}
                  className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-full p-1"
                  aria-label="Fechar chat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className={`h-96 overflow-y-auto p-4 space-y-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`} style={{ scrollBehavior: 'smooth' }}>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-end space-x-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.sender === 'user' ? 'bg-blue-600' : 'bg-gray-600'}`}>
                      {msg.sender === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                    </div>
                    <div className={`max-w-[70%] rounded-lg p-3 ${
                      msg.sender === 'user'
                        ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-900'
                        : isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'
                    }`}>
                      <p>{msg.text}</p>
                      <span className="text-xs text-gray-400">{formatTimestamp(msg.timestamp)}</span>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex">
                  <div className="flex items-end space-x-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-600">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className={`max-w-[70%] rounded-lg p-3 bg-gray-200 text-gray-900`}>
                      <p>...digitando</p>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className={`p-4 flex items-center border-t border-gray-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                className={`flex-grow p-2 rounded-l-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                required
              />
              <button type="submit" className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition duration-200">
                <Send size={20} />
              </button>
            </form>
            {quickReplies.length > 0 && (
              <div className="flex space-x-2 p-4">
                {quickReplies.map((reply, index) => (
                  <button key={index} onClick={reply.action} className="flex-grow bg-gray-300 text-gray-900 rounded-md p-2 hover:bg-gray-400 transition duration-200">
                    {reply.text}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={toggleChat}
        className={`flex items-center justify-center w-12 h-12 rounded-full ${isOpen ? 'bg-blue-600' : 'bg-gray-600'} shadow-lg transition-all duration-300`}
        aria-label="Abrir chat"
      >
        {isOpen ? <X className="text-white" /> : <MessageSquare className="text-white" />}
      </button>
    </div>
  )
}
